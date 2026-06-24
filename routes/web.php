<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
});

Route::inertia('/detalle', 'public/detalle/page')->name('public.detalle');
Route::inertia('/estadisticas', 'public/estadisticas/page')->name('public.estadisticas');
Route::inertia('/en_vivo', 'public/en_vivo/page')->name('public.en-vivo');
Route::inertia('/noticias', 'public/noticias/page')->name('public.noticias');
Route::inertia('/calendario', 'public/calendario/page')->name('public.calendario');
Route::inertia('/iniciar_sesion', 'public/iniciar_sesion/page')->name('public.iniciar-sesion');
Route::inertia('/registrarme', 'public/registrarme/page')->name('public.registrarme');

require __DIR__.'/settings.php';
