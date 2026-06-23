<?php

namespace Tests\Feature;

use App\Models\EditablePage;
use App\Models\User;
use App\Support\EditablePages\FaqPageDefaults;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EditableFaqPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_faq_page_uses_editable_content(): void
    {
        EditablePage::factory()->faq()->create([
            'content' => array_replace_recursive(
                FaqPageDefaults::content(),
                [
                    'locales' => [
                        'es' => [
                            'page_title' => 'FAQ editable',
                        ],
                    ],
                ],
            ),
        ]);

        $response = $this->get(route('public.faq'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/faq')
                ->where('pageContent.locales.es.page_title', 'FAQ editable')
                ->where('locale', 'es'));
    }

    public function test_admin_editor_requires_manage_content_permission(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get(route('admin.faq.edit'));

        $response->assertForbidden();
    }

    public function test_admin_editor_loads_faq_content(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->actingAs($user)->get(route('admin.faq.edit'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/faq/edit')
                ->where('editablePage.slug', FaqPageDefaults::SLUG));
    }

    public function test_admin_can_update_faq_content(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = FaqPageDefaults::content();
        $content['locales']['es']['page_title'] = 'FAQ desde admin';
        $content['faqs'][0]['question']['es'] = 'Pregunta editada?';
        $content['contact_email'] = 'hola@example.com';

        $response = $this->actingAs($user)->put(route('admin.faq.update'), [
            'title' => 'FAQ CMS',
            'is_published' => true,
            'content' => $content,
        ]);

        $response->assertRedirect(route('admin.faq.edit'));

        $this->assertDatabaseHas('editable_pages', [
            'slug' => FaqPageDefaults::SLUG,
            'title' => 'FAQ CMS',
            'is_published' => true,
        ]);

        $storedContent = EditablePage::query()
            ->where('slug', FaqPageDefaults::SLUG)
            ->firstOrFail()
            ->content;

        $this->assertSame('FAQ desde admin', $storedContent['locales']['es']['page_title']);
        $this->assertSame('Pregunta editada?', $storedContent['faqs'][0]['question']['es']);
        $this->assertSame('hola@example.com', $storedContent['contact_email']);
    }

    public function test_admin_cannot_save_invalid_contact_email(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $content = FaqPageDefaults::content();
        $content['contact_email'] = 'correo-invalido';

        $response = $this->actingAs($user)->put(route('admin.faq.update'), [
            'title' => 'FAQ CMS',
            'is_published' => true,
            'content' => $content,
        ]);

        $response->assertSessionHasErrors('content.contact_email');
    }
}
