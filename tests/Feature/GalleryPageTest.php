<?php

namespace Tests\Feature;

use Tests\TestCase;

class GalleryPageTest extends TestCase
{
    public function test_gallery_page_is_public(): void
    {
        $response = $this->get(route('public.galeria'));

        $response->assertOk();
    }
}
