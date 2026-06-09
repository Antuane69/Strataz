<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/inicio')->name('home');

Route::inertia('/habitaciones', 'public/habitaciones')->name('public.habitaciones');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
