<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/inicio')->name('home');

Route::inertia('/habitaciones', 'public/habitaciones')->name('public.habitaciones');

Route::inertia('/servicios', 'public/servicios')->name('public.servicios');

Route::inertia('/promociones', 'public/promociones')->name('public.promociones');

Route::inertia('/bodas', 'public/bodas')->name('public.bodas');

Route::inertia('/recomendaciones', 'public/recomendaciones')->name('public.recomendaciones');

Route::inertia('/galeria', 'public/galeria')->name('public.galeria');

Route::inertia('/contacto', 'public/contacto')->name('public.contacto');

Route::inertia('/faq', 'public/faq')->name('public.faq');

Route::inertia('/protocolos-covid-19', 'public/protocolos-covid')->name('public.protocolos-covid');

Route::redirect('/contactos', '/contacto');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
