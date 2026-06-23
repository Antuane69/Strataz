<?php

namespace Tests\Feature;

use App\Models\EditablePage;
use App\Models\User;
use App\Support\EditablePages\BodasPageDefaults;
use App\Support\EditablePages\MediaUploadLimits;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EditableBodasPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_bodas_page_uses_editable_content(): void
    {
        EditablePage::factory()->bodas()->create([
            'content' => array_replace_recursive(
                BodasPageDefaults::content(),
                [
                    'locales' => [
                        'es' => [
                            'page_title' => 'Bodas editables',
                        ],
                    ],
                ],
            ),
        ]);

        $response = $this->get(route('public.bodas'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/bodas')
                ->where('pageContent.locales.es.page_title', 'Bodas editables')
                ->where('locale', 'es'));
    }

    public function test_admin_editor_requires_manage_content_permission(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get(route('admin.bodas.edit'));

        $response->assertForbidden();
    }

    public function test_admin_editor_reports_safe_media_upload_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->actingAs($user)->get(route('admin.bodas.edit'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/bodas/edit')
                ->where('uploadConfig.max_size_mb', MediaUploadLimits::maxFileSizeMegabytes()));
    }

    public function test_admin_can_update_bodas_content(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = BodasPageDefaults::content();
        $content['locales']['es']['page_title'] = 'Bodas desde admin';

        $response = $this->actingAs($user)->put(route('admin.bodas.update'), [
            'title' => 'Bodas CMS',
            'is_published' => true,
            'content' => $content,
        ]);

        $response->assertRedirect(route('admin.bodas.edit'));

        $this->assertDatabaseHas('editable_pages', [
            'slug' => BodasPageDefaults::SLUG,
            'title' => 'Bodas CMS',
            'is_published' => true,
        ]);

        $this->assertSame(
            'Bodas desde admin',
            EditablePage::query()
                ->where('slug', BodasPageDefaults::SLUG)
                ->firstOrFail()
                ->content['locales']['es']['page_title'],
        );
    }

    public function test_admin_can_upload_bodas_media_to_public_images_directory(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = BodasPageDefaults::content();
        $mediaId = 'media-upload-test';
        $targetPath = public_path('imagenes/bodas/ceremonia-prueba.png');

        $content['media'][] = [
            'id' => $mediaId,
            'type' => 'image',
            'src' => 'blob:test-preview',
            'poster' => null,
            'alt' => [
                'es' => 'Ceremonia Prueba',
                'en' => 'Ceremonia Prueba',
            ],
            'label' => [
                'es' => 'Ceremonia Prueba',
                'en' => 'Ceremonia Prueba',
            ],
        ];

        File::delete($targetPath);

        try {
            $response = $this->actingAs($user)->put(route('admin.bodas.update'), [
                'title' => 'Bodas CMS',
                'is_published' => true,
                'content' => $content,
                'media_uploads' => [
                    [
                        'target' => 'media',
                        'media_id' => $mediaId,
                        'name' => 'Ceremonia Prueba',
                        'file' => UploadedFile::fake()->image('ceremonia.png'),
                    ],
                ],
            ]);

            $response->assertRedirect(route('admin.bodas.edit'));

            $media = collect(EditablePage::query()
                ->where('slug', BodasPageDefaults::SLUG)
                ->firstOrFail()
                ->content['media'])
                ->firstWhere('id', $mediaId);

            $this->assertFileExists($targetPath);
            $this->assertSame('/imagenes/bodas/ceremonia-prueba.png', $media['src']);
            $this->assertSame('Ceremonia Prueba', $media['alt']['es']);
            $this->assertSame('Ceremonia Prueba', $media['alt']['en']);
            $this->assertSame('Ceremonia Prueba', $media['label']['es']);
            $this->assertSame('Ceremonia Prueba', $media['label']['en']);
        } finally {
            File::delete($targetPath);
        }
    }

    public function test_admin_cannot_upload_bodas_media_above_safe_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = BodasPageDefaults::content();
        $mediaId = 'large-video-test';

        $content['media'][] = [
            'id' => $mediaId,
            'type' => 'video',
            'src' => 'blob:test-preview',
            'poster' => null,
            'alt' => [
                'es' => 'Video grande',
                'en' => 'Video grande',
            ],
            'label' => [
                'es' => 'Video grande',
                'en' => 'Video grande',
            ],
        ];

        $response = $this->actingAs($user)->put(route('admin.bodas.update'), [
            'title' => 'Bodas CMS',
            'is_published' => true,
            'content' => $content,
            'media_uploads' => [
                [
                    'target' => 'media',
                    'media_id' => $mediaId,
                    'name' => 'Video grande',
                    'file' => UploadedFile::fake()->create(
                        'boda.mp4',
                        MediaUploadLimits::maxFileSizeKilobytes() + 1,
                        'video/mp4',
                    ),
                ],
            ],
        ]);

        $response->assertSessionHasErrors('media_uploads.0.file');
    }
}
