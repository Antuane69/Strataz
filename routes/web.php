<?php

use App\Http\Controllers\Admin\EditableBodasController;
use App\Http\Controllers\Admin\EditableContactoController;
use App\Http\Controllers\Admin\EditableFaqController;
use App\Http\Controllers\Admin\EditableGaleriaController;
use App\Http\Controllers\Admin\EditableHabitacionesController;
use App\Http\Controllers\Admin\EditablePromocionesController;
use App\Http\Controllers\Admin\EditableRecomendacionesController;
use App\Http\Controllers\Admin\EditableServiciosController;
use App\Http\Controllers\Site\BodasController;
use App\Http\Controllers\Site\ContactoController;
use App\Http\Controllers\Site\FaqController;
use App\Http\Controllers\Site\GaleriaController;
use App\Http\Controllers\Site\HabitacionesController;
use App\Http\Controllers\Site\PromocionesController;
use App\Http\Controllers\Site\RecomendacionesController;
use App\Http\Controllers\Site\ServiciosController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/inicio')->name('home');

Route::get('/habitaciones', HabitacionesController::class)->name('public.habitaciones');

Route::get('/servicios', ServiciosController::class)->name('public.servicios');

Route::get('/promociones', PromocionesController::class)->name('public.promociones');

Route::get('/bodas', BodasController::class)->name('public.bodas');

Route::get('/recomendaciones', RecomendacionesController::class)->name('public.recomendaciones');

// Route::inertia('/recomendaciones', 'public/recomendaciones')->name('public.recomendaciones');

Route::get('/galeria', GaleriaController::class)->name('public.galeria');

Route::get('/contacto', ContactoController::class)->name('public.contacto');

Route::get('/faq', FaqController::class)->name('public.faq');

Route::inertia('/protocolos-covid-19', 'public/protocolos-covid')->name('public.protocolos-covid');

Route::redirect('/contactos', '/contacto');

Route::middleware(['auth', 'verified', 'can:manage-content'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('/admin/contenido/habitaciones', [EditableHabitacionesController::class, 'edit'])
        ->name('admin.habitaciones.edit');

    Route::put('/admin/contenido/habitaciones', [EditableHabitacionesController::class, 'update'])
        ->name('admin.habitaciones.update');

    Route::get('/admin/contenido/servicios', [EditableServiciosController::class, 'edit'])
        ->name('admin.servicios.edit');

    Route::put('/admin/contenido/servicios', [EditableServiciosController::class, 'update'])
        ->name('admin.servicios.update');

    Route::get('/admin/contenido/bodas', [EditableBodasController::class, 'edit'])
        ->name('admin.bodas.edit');

    Route::put('/admin/contenido/bodas', [EditableBodasController::class, 'update'])
        ->name('admin.bodas.update');

    Route::get('/admin/contenido/recomendaciones', [EditableRecomendacionesController::class, 'edit'])
        ->name('admin.recomendaciones.edit');

    Route::put('/admin/contenido/recomendaciones', [EditableRecomendacionesController::class, 'update'])
        ->name('admin.recomendaciones.update');

    Route::get('/admin/contenido/galeria', [EditableGaleriaController::class, 'edit'])
        ->name('admin.galeria.edit');

    Route::put('/admin/contenido/galeria', [EditableGaleriaController::class, 'update'])
        ->name('admin.galeria.update');

    Route::get('/admin/contenido/faq', [EditableFaqController::class, 'edit'])
        ->name('admin.faq.edit');

    Route::put('/admin/contenido/faq', [EditableFaqController::class, 'update'])
        ->name('admin.faq.update');

    Route::get('/admin/contenido/contacto', [EditableContactoController::class, 'edit'])
        ->name('admin.contacto.edit');

    Route::put('/admin/contenido/contacto', [EditableContactoController::class, 'update'])
        ->name('admin.contacto.update');

    Route::get('/admin/contenido/promociones', [EditablePromocionesController::class, 'edit'])
        ->name('admin.promociones.edit');

    Route::put('/admin/contenido/promociones', [EditablePromocionesController::class, 'update'])
        ->name('admin.promociones.update');
});

require __DIR__.'/settings.php';
