<?php

namespace Database\Seeders;

use App\Models\EditablePage;
use App\Support\EditablePages\BodasPageDefaults;
use App\Support\EditablePages\ContactoPageDefaults;
use App\Support\EditablePages\FaqPageDefaults;
use App\Support\EditablePages\GaleriaPageDefaults;
use App\Support\EditablePages\HabitacionesPageDefaults;
use App\Support\EditablePages\PromocionesPageDefaults;
use App\Support\EditablePages\RecomendacionesPageDefaults;
use App\Support\EditablePages\ServiciosPageDefaults;
use Illuminate\Database\Seeder;

class EditablePageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EditablePage::query()->updateOrCreate(
            ['slug' => HabitacionesPageDefaults::SLUG],
            HabitacionesPageDefaults::attributes(),
        );

        EditablePage::query()->updateOrCreate(
            ['slug' => ServiciosPageDefaults::SLUG],
            ServiciosPageDefaults::attributes(),
        );

        EditablePage::query()->updateOrCreate(
            ['slug' => BodasPageDefaults::SLUG],
            BodasPageDefaults::attributes(),
        );

        EditablePage::query()->updateOrCreate(
            ['slug' => PromocionesPageDefaults::SLUG],
            PromocionesPageDefaults::attributes(),
        );

        EditablePage::query()->updateOrCreate(
            ['slug' => RecomendacionesPageDefaults::SLUG],
            RecomendacionesPageDefaults::attributes(),
        );

        EditablePage::query()->updateOrCreate(
            ['slug' => GaleriaPageDefaults::SLUG],
            GaleriaPageDefaults::attributes(),
        );

        EditablePage::query()->updateOrCreate(
            ['slug' => FaqPageDefaults::SLUG],
            FaqPageDefaults::attributes(),
        );

        EditablePage::query()->updateOrCreate(
            ['slug' => ContactoPageDefaults::SLUG],
            ContactoPageDefaults::attributes(),
        );
    }
}
