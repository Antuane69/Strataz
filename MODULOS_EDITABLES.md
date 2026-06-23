# Crear nuevos modulos editables

Guia para repetir el patron usado en Habitaciones y Servicios.

## Modulos actuales

- `habitaciones`: usa `rooms`, `hotel_info`, amenidades, politicas y uploads con `room_id`.
- `servicios`: usa `services`, `trust_items`, tags, iconos, acentos de color y uploads con `service_id`.
- `bodas`: usa textos de hero/drawer, `highlights`, `background_media`, carrusel `media` y uploads con `target`.
- `promociones`: usa `promotions`, `tabs`, `highlight_items`, `contact`, grupos de precios y uploads con `promotion_id`.

## 1. Define el contenido

Usa una estructura JSON con:

- `version`: numero para futuras migraciones de contenido.
- `locales.es` y `locales.en`: textos globales de la pagina.
- Arreglos editables: tarjetas, tags, beneficios, amenidades o medios.
- `media`: objetos con `id`, `type`, `src`, `poster` opcional y `alt` por idioma.
- Campos de orden y visibilidad cuando el usuario pueda reordenar o ocultar items: `order` e `is_active`.

Mantener textos como texto plano evita problemas de sanitizacion.

## 2. Crea defaults del modulo

Crea una clase en `app/Support/EditablePages`, por ejemplo:

```php
final class ServiciosPageDefaults
{
    public const SLUG = 'servicios';

    public const TITLE = 'Servicios';

    public static function attributes(): array
    {
        return [
            'slug' => self::SLUG,
            'title' => self::TITLE,
            'content' => self::content(),
            'is_published' => true,
            'published_at' => now(),
        ];
    }
}
```

Estos defaults funcionan como seed inicial y fallback publico.

Despues registra el modulo en:

- `database/seeders/EditablePageSeeder.php`
- `database/factories/EditablePageFactory.php` con un state dedicado, por ejemplo `servicios()`.

## 3. Usa `editable_pages`

La tabla `editable_pages` guarda:

- `slug`
- `title`
- `content`
- `is_published`
- `published_at`

Para la mayoria de paginas con textos, tags, listas, carruseles y drawers, crea un nuevo registro con otro `slug`.

## 4. Controller publico

El controller publico debe:

- Buscar `EditablePage::where('slug', $slug)->published()->first()`.
- Usar defaults si no hay contenido publicado.
- Enviar a Inertia solo `pageContent` y `locale`.
- Leer idioma desde `?locale=en` o `?lang=en`.

## 5. Controller admin

El controller admin debe:

- Vivir en `app/Http/Controllers/Admin`.
- Estar protegido con `auth`, `verified`, `can:manage-content`.
- Renderizar una pagina Inertia de edicion.
- Validar con un FormRequest.
- Guardar JSON validado.
- Procesar uploads y agregarlos al arreglo `media`.
- Usar `MediaUploadLimits` para reportar y validar el limite real de subida.
- Guardar archivos publicos en una carpeta del modulo, por ejemplo `public/imagenes/servicios`.

El nombre del grupo de upload debe indicar el padre del medio:

- Habitaciones usa `media_uploads.*.room_id`.
- Servicios usa `media_uploads.*.service_id`.
- Bodas usa `media_uploads.*.target` con `background` o `media`.
- Promociones usa `media_uploads.*.promotion_id`.

## 6. Frontend reusable

Para cada modulo crea:

- Tipos editables en el `interfaces.ts` del modulo.
- Un mapper tipo `mapHabitacionesContent.ts` o `mapServiciosContent.ts` para convertir JSON bilingue a props render-ready.
- Un showcase que acepte `content?: ...` y `locale?: string`.
- Una pagina admin con `Splitter`: preview a un lado, formulario al otro.
- Inputs de texto con `InputFormulario` para mantener debounce y no recalcular el preview en cada tecla.
- Preview en vivo opcional con `useDeferredValue` y `cloneEditableContent`.

Helpers reutilizables ya disponibles:

- `resources/js/types/editable-content.ts`
- `resources/js/lib/editable-content.ts`

## 7. Rutas

Ejemplo:

```php
Route::get('/servicios', ServiciosController::class)->name('public.servicios');

Route::middleware(['auth', 'verified', 'can:manage-content'])->group(function () {
    Route::get('/admin/contenido/servicios', [EditableServiciosController::class, 'edit'])
        ->name('admin.servicios.edit');

    Route::put('/admin/contenido/servicios', [EditableServiciosController::class, 'update'])
        ->name('admin.servicios.update');
});
```

Si quieres que use el layout auth, renderiza una pagina bajo `resources/js/pages/auth/...`.

Agrega el enlace privado en:

- `resources/js/components/app-sidebar.tsx`
- `resources/js/components/app-header.tsx`

## 8. Verificacion

Para cambios PHP:

```bash
composer lint
php artisan test --compact tests/Feature/NombreDelModuloTest.php
```

Para cambios React/TypeScript:

```bash
npm run lint:check
npm run types:check
npm run build
```

En este proyecto no levantes servidor local para verificar.
