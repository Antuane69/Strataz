<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/inicio')->name('home');

Route::inertia('/habitaciones', 'public/habitaciones')->name('public.habitaciones');

Route::inertia('/servicios', 'public/servicios')->name('public.servicios');

Route::inertia('/bodas', 'public/bodas')->name('public.bodas');

Route::inertia('/recomendaciones', 'public/recomendaciones')->name('public.recomendaciones');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
