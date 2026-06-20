<?php

namespace Database\Seeders;

use App\Models\EditablePage;
use App\Support\EditablePages\HabitacionesPageDefaults;
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
    }
}
