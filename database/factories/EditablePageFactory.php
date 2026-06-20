<?php

namespace Database\Factories;

use App\Models\EditablePage;
use App\Support\EditablePages\HabitacionesPageDefaults;
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
}
