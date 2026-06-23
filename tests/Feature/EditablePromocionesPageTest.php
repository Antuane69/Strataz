<?php

namespace Tests\Feature;

use App\Models\EditablePage;
use App\Models\User;
use App\Support\EditablePages\MediaUploadLimits;
use App\Support\EditablePages\PromocionesPageDefaults;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EditablePromocionesPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_promociones_page_uses_editable_content(): void
    {
        EditablePage::factory()->promociones()->create([
            'content' => array_replace_recursive(
                PromocionesPageDefaults::content(),
                [
                    'locales' => [
                        'es' => [
                            'page_title' => 'Promociones editables',
                        ],
                    ],
                ],
            ),
        ]);

        $response = $this->get(route('public.promociones'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/promociones')
                ->where('pageContent.locales.es.page_title', 'Promociones editables')
                ->where('locale', 'es'));
    }

    public function test_admin_editor_requires_manage_content_permission(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get(route('admin.promociones.edit'));

        $response->assertForbidden();
    }

    public function test_admin_editor_reports_safe_media_upload_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->actingAs($user)->get(route('admin.promociones.edit'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/promociones/edit')
                ->where('uploadConfig.max_size_mb', MediaUploadLimits::maxFileSizeMegabytes()));
    }

    public function test_admin_can_update_promociones_content(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = PromocionesPageDefaults::content();
        $content['locales']['es']['page_title'] = 'Promociones desde admin';

        $response = $this->actingAs($user)->put(route('admin.promociones.update'), [
            'title' => 'Promociones CMS',
            'is_published' => true,
            'content' => $content,
        ]);

        $response->assertRedirect(route('admin.promociones.edit'));

        $this->assertDatabaseHas('editable_pages', [
            'slug' => PromocionesPageDefaults::SLUG,
            'title' => 'Promociones CMS',
            'is_published' => true,
        ]);

        $this->assertSame(
            'Promociones desde admin',
            EditablePage::query()
                ->where('slug', PromocionesPageDefaults::SLUG)
                ->firstOrFail()
                ->content['locales']['es']['page_title'],
        );
    }

    public function test_admin_can_upload_promocion_media_to_public_images_directory(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = PromocionesPageDefaults::content();
        $promotionId = $content['promotions'][0]['id'];
        $mediaId = $content['promotions'][0]['image']['id'];
        $targetPath = public_path('imagenes/promociones/promo-prueba.png');

        File::delete($targetPath);

        try {
            $response = $this->actingAs($user)->put(route('admin.promociones.update'), [
                'title' => 'Promociones CMS',
                'is_published' => true,
                'content' => $content,
                'media_uploads' => [
                    [
                        'promotion_id' => $promotionId,
                        'media_id' => $mediaId,
                        'name' => 'Promo Prueba',
                        'file' => UploadedFile::fake()->image('promo.png'),
                    ],
                ],
            ]);

            $response->assertRedirect(route('admin.promociones.edit'));

            $image = EditablePage::query()
                ->where('slug', PromocionesPageDefaults::SLUG)
                ->firstOrFail()
                ->content['promotions'][0]['image'];

            $this->assertFileExists($targetPath);
            $this->assertSame('/imagenes/promociones/promo-prueba.png', $image['src']);
            $this->assertSame('Promo Prueba', $image['alt']['es']);
            $this->assertSame('Promo Prueba', $image['alt']['en']);
        } finally {
            File::delete($targetPath);
        }
    }

    public function test_admin_cannot_upload_promocion_media_above_safe_limit(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = PromocionesPageDefaults::content();
        $promotionId = $content['promotions'][0]['id'];
        $mediaId = $content['promotions'][0]['image']['id'];

        $response = $this->actingAs($user)->put(route('admin.promociones.update'), [
            'title' => 'Promociones CMS',
            'is_published' => true,
            'content' => $content,
            'media_uploads' => [
                [
                    'promotion_id' => $promotionId,
                    'media_id' => $mediaId,
                    'name' => 'Promo grande',
                    'file' => UploadedFile::fake()->create(
                        'promocion.gif',
                        MediaUploadLimits::maxFileSizeKilobytes() + 1,
                        'image/gif',
                    ),
                ],
            ],
        ]);

        $response->assertSessionHasErrors('media_uploads.0.file');
    }
}
