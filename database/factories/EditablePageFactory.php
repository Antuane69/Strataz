<?php

namespace Database\Factories;

use App\Models\EditablePage;
use App\Support\EditablePages\BodasPageDefaults;
use App\Support\EditablePages\ContactoPageDefaults;
use App\Support\EditablePages\FaqPageDefaults;
use App\Support\EditablePages\GaleriaPageDefaults;
use App\Support\EditablePages\HabitacionesPageDefaults;
use App\Support\EditablePages\PromocionesPageDefaults;
use App\Support\EditablePages\RecomendacionesPageDefaults;
use App\Support\EditablePages\ServiciosPageDefaults;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<EditablePage>
 */
class EditablePageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(2),
            'title' => fake()->words(2, true),
            'content' => HabitacionesPageDefaults::content(),
            'is_published' => true,
            'published_at' => now(),
        ];
    }

    public function habitaciones(): static
    {
        return $this->state(fn (array $attributes): array => HabitacionesPageDefaults::attributes());
    }

    public function servicios(): static
    {
        return $this->state(fn (array $attributes): array => ServiciosPageDefaults::attributes());
    }

    public function bodas(): static
    {
        return $this->state(fn (array $attributes): array => BodasPageDefaults::attributes());
    }

    public function promociones(): static
    {
        return $this->state(fn (array $attributes): array => PromocionesPageDefaults::attributes());
    }

    public function recomendaciones(): static
    {
        return $this->state(fn (array $attributes): array => RecomendacionesPageDefaults::attributes());
    }

    public function galeria(): static
    {
        return $this->state(fn (array $attributes): array => GaleriaPageDefaults::attributes());
    }

    public function faq(): static
    {
        return $this->state(fn (array $attributes): array => FaqPageDefaults::attributes());
    }

    public function contacto(): static
    {
        return $this->state(fn (array $attributes): array => ContactoPageDefaults::attributes());
    }
}
