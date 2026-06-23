<?php

namespace Tests\Feature;

use App\Models\EditablePage;
use App\Models\User;
use App\Support\EditablePages\MediaUploadLimits;
use App\Support\EditablePages\RecomendacionesPageDefaults;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EditableRecomendacionesPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_recomendaciones_page_uses_editable_content(): void
    {
        EditablePage::factory()->recomendaciones()->create([
            'content' => array_replace_recursive(
                RecomendacionesPageDefaults::content(),
                [
                    'locales' => [
                        'es' => [
                            'page_title' => 'Recomendaciones editables',
                        ],
                    ],
                ],
            ),
        ]);

        $response = $this->get(route('public.recomendaciones'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/recomendaciones')
                ->where('pageContent.locales.es.page_title', 'Recomendaciones editables')
                ->where('locale', 'es'));
    }

    public function test_admin_editor_requires_manage_content_permission(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get(route('admin.recomendaciones.edit'));

        $response->assertForbidden();
    }

    public function test_admin_editor_reports_safe_media_upload_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->actingAs($user)->get(route('admin.recomendaciones.edit'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/recomendaciones/edit')
                ->where('uploadConfig.max_size_mb', MediaUploadLimits::maxFileSizeMegabytes()));
    }

    public function test_admin_can_update_recomendaciones_content(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = RecomendacionesPageDefaults::content();
        $content['locales']['es']['page_title'] = 'Recomendaciones desde admin';

        $response = $this->actingAs($user)->put(route('admin.recomendaciones.update'), [
            'title' => 'Recomendaciones CMS',
            'is_published' => true,
            'content' => $content,
        ]);

        $response->assertRedirect(route('admin.recomendaciones.edit'));

        $this->assertDatabaseHas('editable_pages', [
            'slug' => RecomendacionesPageDefaults::SLUG,
            'title' => 'Recomendaciones CMS',
            'is_published' => true,
        ]);

        $this->assertSame(
            'Recomendaciones desde admin',
            EditablePage::query()
                ->where('slug', RecomendacionesPageDefaults::SLUG)
                ->firstOrFail()
                ->content['locales']['es']['page_title'],
        );
    }

    public function test_admin_can_upload_recomendacion_image_to_public_images_directory(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = RecomendacionesPageDefaults::content();
        $recommendationId = $content['recommendations'][0]['id'];
        $mediaId = $content['recommendations'][0]['image']['id'];
        $targetPath = public_path('imagenes/recomendaciones/islas-prueba.png');

        $content['recommendations'][0]['image']['src'] = 'blob:test-preview';
        $content['recommendations'][0]['image']['alt'] = [
            'es' => 'Islas Prueba',
            'en' => 'Islas Prueba',
        ];

        File::delete($targetPath);

        try {
            $response = $this->actingAs($user)->put(route('admin.recomendaciones.update'), [
                'title' => 'Recomendaciones CMS',
                'is_published' => true,
                'content' => $content,
                'media_uploads' => [
                    [
                        'recommendation_id' => $recommendationId,
                        'media_id' => $mediaId,
                        'name' => 'Islas Prueba',
                        'file' => UploadedFile::fake()->image('islas.png'),
                    ],
                ],
            ]);

            $response->assertRedirect(route('admin.recomendaciones.edit'));

            $image = EditablePage::query()
                ->where('slug', RecomendacionesPageDefaults::SLUG)
                ->firstOrFail()
                ->content['recommendations'][0]['image'];

            $this->assertFileExists($targetPath);
            $this->assertSame('/imagenes/recomendaciones/islas-prueba.png', $image['src']);
            $this->assertSame('Islas Prueba', $image['alt']['es']);
            $this->assertSame('Islas Prueba', $image['alt']['en']);
        } finally {
            File::delete($targetPath);
        }
    }

    public function test_admin_cannot_upload_recomendacion_image_above_safe_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = RecomendacionesPageDefaults::content();
        $recommendationId = $content['recommendations'][0]['id'];
        $mediaId = $content['recommendations'][0]['image']['id'];

        $content['recommendations'][0]['image']['src'] = 'blob:test-preview';

        $response = $this->actingAs($user)->put(route('admin.recomendaciones.update'), [
            'title' => 'Recomendaciones CMS',
            'is_published' => true,
            'content' => $content,
            'media_uploads' => [
                [
                    'recommendation_id' => $recommendationId,
                    'media_id' => $mediaId,
                    'name' => 'Imagen grande',
                    'file' => UploadedFile::fake()->create(
                        'recomendacion.jpg',
                        MediaUploadLimits::maxFileSizeKilobytes() + 1,
                        'image/jpeg',
                    ),
                ],
            ],
        ]);

        $response->assertSessionHasErrors('media_uploads.0.file');
    }
}
