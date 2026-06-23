<?php

namespace Tests\Feature;

use App\Models\EditablePage;
use App\Models\User;
use App\Support\EditablePages\MediaUploadLimits;
use App\Support\EditablePages\ServiciosPageDefaults;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EditableServiciosPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_servicios_page_uses_editable_content(): void
    {
        EditablePage::factory()->servicios()->create([
            'content' => array_replace_recursive(
                ServiciosPageDefaults::content(),
                [
                    'locales' => [
                        'es' => [
                            'page_title' => 'Servicios editables',
                        ],
                    ],
                ],
            ),
        ]);

        $response = $this->get(route('public.servicios'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/servicios')
                ->where('pageContent.locales.es.page_title', 'Servicios editables')
                ->where('locale', 'es'));
    }

    public function test_admin_editor_requires_manage_content_permission(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get(route('admin.servicios.edit'));

        $response->assertForbidden();
    }

    public function test_admin_editor_reports_safe_media_upload_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->actingAs($user)->get(route('admin.servicios.edit'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/servicios/edit')
                ->where('uploadConfig.max_size_mb', MediaUploadLimits::maxFileSizeMegabytes()));
    }

    public function test_admin_can_update_servicios_content(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = ServiciosPageDefaults::content();
        $content['locales']['es']['page_title'] = 'Servicios desde admin';

        $response = $this->actingAs($user)->put(route('admin.servicios.update'), [
            'title' => 'Servicios CMS',
            'is_published' => true,
            'content' => $content,
        ]);

        $response->assertRedirect(route('admin.servicios.edit'));

        $this->assertDatabaseHas('editable_pages', [
            'slug' => ServiciosPageDefaults::SLUG,
            'title' => 'Servicios CMS',
            'is_published' => true,
        ]);

        $this->assertSame(
            'Servicios desde admin',
            EditablePage::query()
                ->where('slug', ServiciosPageDefaults::SLUG)
                ->firstOrFail()
                ->content['locales']['es']['page_title'],
        );
    }

    public function test_admin_can_upload_servicio_media_to_public_images_directory(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = ServiciosPageDefaults::content();
        $serviceId = $content['services'][0]['id'];
        $mediaId = 'media-upload-test';
        $targetPath = public_path('imagenes/servicios/servicio-prueba.png');

        $content['services'][0]['media'][] = [
            'id' => $mediaId,
            'type' => 'image',
            'src' => 'blob:test-preview',
            'poster' => null,
            'alt' => [
                'es' => 'Servicio Prueba',
                'en' => 'Servicio Prueba',
            ],
        ];

        File::delete($targetPath);

        try {
            $response = $this->actingAs($user)->put(route('admin.servicios.update'), [
                'title' => 'Servicios CMS',
                'is_published' => true,
                'content' => $content,
                'media_uploads' => [
                    [
                        'service_id' => $serviceId,
                        'media_id' => $mediaId,
                        'name' => 'Servicio Prueba',
                        'file' => UploadedFile::fake()->image('servicio.png'),
                    ],
                ],
            ]);

            $response->assertRedirect(route('admin.servicios.edit'));

            $media = collect(EditablePage::query()
                ->where('slug', ServiciosPageDefaults::SLUG)
                ->firstOrFail()
                ->content['services'][0]['media'])
                ->firstWhere('id', $mediaId);

            $this->assertFileExists($targetPath);
            $this->assertSame('/imagenes/servicios/servicio-prueba.png', $media['src']);
            $this->assertSame('Servicio Prueba', $media['alt']['es']);
            $this->assertSame('Servicio Prueba', $media['alt']['en']);
        } finally {
            File::delete($targetPath);
        }
    }

    public function test_admin_cannot_upload_servicio_media_above_safe_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = ServiciosPageDefaults::content();
        $serviceId = $content['services'][0]['id'];
        $mediaId = 'large-video-test';

        $content['services'][0]['media'][] = [
            'id' => $mediaId,
            'type' => 'video',
            'src' => 'blob:test-preview',
            'poster' => null,
            'alt' => [
                'es' => 'Video grande',
                'en' => 'Video grande',
            ],
        ];

        $response = $this->actingAs($user)->put(route('admin.servicios.update'), [
            'title' => 'Servicios CMS',
            'is_published' => true,
            'content' => $content,
            'media_uploads' => [
                [
                    'service_id' => $serviceId,
                    'media_id' => $mediaId,
                    'name' => 'Video grande',
                    'file' => UploadedFile::fake()->create(
                        'servicio.mp4',
                        MediaUploadLimits::maxFileSizeKilobytes() + 1,
                        'video/mp4',
                    ),
                ],
            ],
        ]);

        $response->assertSessionHasErrors('media_uploads.0.file');
    }
}
