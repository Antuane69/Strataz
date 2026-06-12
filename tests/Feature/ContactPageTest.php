<?php

namespace Tests\Feature;

use Tests\TestCase;

class ContactPageTest extends TestCase
{
    public function test_contact_page_is_public(): void
    {
        $response = $this->get(route('public.contacto'));

        $response->assertOk();
    }

    public function test_legacy_contact_path_redirects_to_contact_page(): void
    {
        $response = $this->get('/contactos');

        $response->assertRedirect('/contacto');
    }
}
