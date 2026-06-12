<?php

namespace Tests\Feature;

use Tests\TestCase;

class PromotionsPageTest extends TestCase
{
    public function test_promotions_page_is_public(): void
    {
        $response = $this->get(route('public.promociones'));

        $response->assertOk();
    }
}
