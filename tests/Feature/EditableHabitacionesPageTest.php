<?php

namespace Tests\Feature;

use App\Models\EditablePage;
use App\Models\User;
use App\Support\EditablePages\HabitacionesPageDefaults;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EditableHabitacionesPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_habitaciones_page_uses_editable_content(): void
    {
        EditablePage::factory()->habitaciones()->create([
            'content' => array_replace_recursive(
                HabitacionesPageDefaults::content(),
                [
                    'locales' => [
                        'es' => [
                            'page_title' => 'Habitaciones editables',
                        ],
                    ],
                ],
            ),
        ]);

        $response = $this->get(route('public.habitaciones'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/habitaciones')
                ->where('pageContent.locales.es.page_title', 'Habitaciones editables')
                ->where('locale', 'es'));
    }

    public function test_admin_editor_requires_manage_content_permission(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get(route('admin.habitaciones.edit'));

        $response->assertForbidden();
    }

    public function test_admin_can_update_habitaciones_content(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = HabitacionesPageDefaults::content();
        $content['locales']['es']['page_title'] = 'Habitaciones desde admin';

        $response = $this->actingAs($user)->put(route('admin.habitaciones.update'), [
            'title' => 'Habitaciones CMS',
            'is_published' => true,
            'content' => $content,
        ]);

        $response->assertRedirect(route('admin.habitaciones.edit'));

        $this->assertDatabaseHas('editable_pages', [
            'slug' => HabitacionesPageDefaults::SLUG,
            'title' => 'Habitaciones CMS',
            'is_published' => true,
        ]);

        $this->assertSame(
            'Habitaciones desde admin',
            EditablePage::query()
                ->where('slug', HabitacionesPageDefaults::SLUG)
                ->firstOrFail()
                ->content['locales']['es']['page_title'],
        );
    }

    public function test_admin_can_upload_habitacion_media_to_public_images_directory(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = HabitacionesPageDefaults::content();
        $roomId = $content['rooms'][0]['id'];
        $mediaId = 'media-upload-test';
        $targetPath = public_path('imagenes/habitaciones/suite-vista.png');

        $content['rooms'][0]['media'][] = [
            'id' => $mediaId,
            'type' => 'image',
            'src' => 'blob:test-preview',
            'poster' => null,
            'alt' => [
                'es' => 'Suite Vista',
                'en' => 'Suite Vista',
            ],
        ];

        File::delete($targetPath);

        try {
            $response = $this->actingAs($user)->put(route('admin.habitaciones.update'), [
                'title' => 'Habitaciones CMS',
                'is_published' => true,
                'content' => $content,
                'media_uploads' => [
                    [
                        'room_id' => $roomId,
                        'media_id' => $mediaId,
                        'name' => 'Suite Vista',
                        'file' => UploadedFile::fake()->image('suite.png'),
                    ],
                ],
            ]);

            $response->assertRedirect(route('admin.habitaciones.edit'));

            $media = collect(EditablePage::query()
                ->where('slug', HabitacionesPageDefaults::SLUG)
                ->firstOrFail()
                ->content['rooms'][0]['media'])
                ->firstWhere('id', $mediaId);

            $this->assertFileExists($targetPath);
            $this->assertSame('/imagenes/habitaciones/suite-vista.png', $media['src']);
            $this->assertSame('Suite Vista', $media['alt']['es']);
            $this->assertSame('Suite Vista', $media['alt']['en']);
        } finally {
            File::delete($targetPath);
        }
    }
}
