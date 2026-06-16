# AGENTS.md

Guia corta para trabajar en este proyecto sin gastar contexto de mas.

## Proyecto

Laravel + Inertia + React + TypeScript + Tailwind CSS + Ant Design. Autenticacion con Fortify. Rutas frontend generadas con Wayfinder. El proyecto usa Laravel 13.x y PHP 8.3 segun `composer.json`.

NO LEVANTES SERVIDOR LOCAL NI INTENTES LEVANTARLO, HAZ LAS DEMAS PRUEBAS QUE SEAN NECESARIAS SIN LEVANTAR SERVIDOR LOCAL

## Leer primero

- `README.md`: manual del proyecto y ejemplos.
- `routes/web.php`: rutas publicas y privadas principales.
- `routes/settings.php`: rutas de settings.
- `resources/js/app.tsx`: seleccion de layouts por nombre de pagina Inertia.
- `resources/js/pages`: paginas React.
- `resources/js/layouts`: layouts React.
- `resources/js/components/app-sidebar.tsx`: menu privado con sidebar.
- `resources/js/components/app-header.tsx`: menu privado con header.
- `app/Http/Middleware/HandleInertiaRequests.php`: props compartidas como `auth`.

## No leer salvo necesidad

- `vendor/`
- `node_modules/`
- `public/build/`
- `storage/framework/`

Usar busquedas puntuales con `rg` antes de abrir muchos archivos.

## Convenciones Inertia

- Una ruta `Route::inertia('/nosotros', 'public/about')` carga `resources/js/pages/public/about.tsx`.
- Paginas `public/*` deben usar layout publico con header/footer.
- Paginas `auth/*` usan layout de autenticacion.
- Paginas `settings/*` usan `AppLayout` + `SettingsLayout`.
- Paginas privadas normales usan `AppLayout`.
- No editar a mano `resources/js/routes/*` ni `resources/js/actions/*`; los genera Wayfinder.

## Menus

- Menu publico: `resources/js/layouts/public-layout.tsx`.
- Menu privado con sidebar: `resources/js/components/app-sidebar.tsx`.
- Menu privado con header: `resources/js/components/app-header.tsx`.
- Preferir helpers de Wayfinder desde `@/routes` cuando ya existan; usar string URL solo si el helper aun no se genero.

## React y UI

- Usar TypeScript en paginas y props.
- Usar `Head` de `@inertiajs/react` para el titulo.
- Usar Ant Design para formularios, tablas, cards y controles de admin.
- Mantener layouts simples: header/footer publico para visitantes, app layout para usuarios autenticados.
- No duplicar headers dentro de paginas si el layout ya los renderiza.

## Laravel

- Para contenido editable, preferir modelo + migration + controller.
- Validar siempre antes de guardar.
- En vistas publicas enviar solo props necesarias.
- Proteger admin con `auth`, `verified` y una autorizacion tipo `can:manage-content`.
- Mantener controllers del admin en `app/Http/Controllers/Admin` cuando sean de panel.

## Laravel Boost

Si Boost esta activo, usar sus herramientas antes de adivinar:

- application info para versiones.
- list routes para rutas y middleware.
- database schema para tablas.
- search docs para documentacion versionada de Laravel, Inertia, Tailwind y Wayfinder.
- tinker o queries solo para verificaciones pequeñas.

El paquete oficial es `laravel/boost`. Si no aparece en `composer show laravel/boost`, instalar con:

```bash
composer require laravel/boost --dev
php artisan boost:install
```

Despues de cambios de dependencias o arquitectura:

```bash
php artisan boost:update
```

## Verificacion

Para cambios PHP:

```bash
composer lint
php artisan test
```

Para cambios React/TypeScript:

```bash
npm run lint:check
npm run types:check
npm run build
```

Si el cambio es solo documentacion, basta revisar que los archivos sean claros y coherentes.

===

<laravel-boost-guidelines>
=== .ai/project rules ===

# Meson de Mita Project Guidelines

Use these project-specific rules with Laravel Boost.

- This is a Laravel + Inertia + React + TypeScript app with Ant Design available for React UI.
- Public pages should live under `resources/js/pages/public/*` and use a public layout with site header and footer.
- Auth pages live under `resources/js/pages/auth/*`.
- Settings pages live under `resources/js/pages/settings/*`.
- Private/admin pages live under `resources/js/pages/admin/*` or another non-public folder and should be protected with Laravel middleware.
- The layout selector is in `resources/js/app.tsx`; check it before changing page structure.
- Public navigation belongs in `resources/js/layouts/public-layout.tsx`.
- Private sidebar navigation belongs in `resources/js/components/app-sidebar.tsx`.
- Private header navigation belongs in `resources/js/components/app-header.tsx`.
- Do not manually edit generated Wayfinder files under `resources/js/routes/*` or `resources/js/actions/*`.
- Avoid reading `vendor/`, `node_modules/`, `public/build/`, and `storage/framework/` unless a task specifically requires it.
- For editable public content, use an Eloquent model, a private admin controller to validate and save, and a public controller to read only published data and pass minimal props to Inertia.
- If rendering user-managed HTML, sanitize it before display; prefer plain text or safe Markdown for first implementations.

=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.3
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- laravel/wayfinder (WAYFINDER) - v0
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/react (INERTIA_REACT) - v3
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- @laravel/vite-plugin-wayfinder (WAYFINDER_VITE) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

## Artisan

- Run Artisan commands directly via the command line (e.g., `php artisan route:list`). Use `php artisan list` to discover available commands and `php artisan [command] --help` to check parameters.
- Inspect routes with `php artisan route:list`. Filter with: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Read configuration values using dot notation: `php artisan config:show app.name`, `php artisan config:show database.default`. Or read config files directly from the `config/` directory.

## Tinker

- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: `php artisan tinker --execute 'Your::code();'`
  - Double quotes for PHP strings inside: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== php rules ===

# PHP

- Always use curly braces for control structures, even for single-line bodies.
- Use PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`. Do not leave empty zero-parameter `__construct()` methods unless the constructor is private.
- Use explicit return type declarations and type hints for all method parameters: `function isAccessible(User $user, ?string $path = null): bool`
- Use TitleCase for Enum keys: `FavoritePerson`, `BestLake`, `Monthly`.
- Prefer PHPDoc blocks over inline comments. Only add inline comments for exceptionally complex logic.
- Use array shape type definitions in PHPDoc blocks.

=== deployments rules ===

# Deployment

- Laravel can be deployed using [Laravel Cloud](https://cloud.laravel.com/), which is the fastest way to deploy and scale production Laravel applications.

=== tests rules ===

# Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test --compact` with a specific filename or filter.

=== inertia-laravel/core rules ===

# Inertia

- Inertia creates fully client-side rendered SPAs without modern SPA complexity, leveraging existing server-side patterns.
- Components live in `resources/js/pages` (unless specified in `vite.config.js`). Use `Inertia::render()` for server-side routing instead of Blade views.
- ALWAYS use `search-docs` tool for version-specific Inertia documentation and updated code examples.
- IMPORTANT: Activate `inertia-react-development` when working with Inertia client-side patterns.

# Inertia v3

- Use all Inertia features from v1, v2, and v3. Check the documentation before making changes to ensure the correct approach.
- New v3 features: standalone HTTP requests (`useHttp` hook), optimistic updates with automatic rollback, layout props (`useLayoutProps` hook), instant visits, simplified SSR via `@inertiajs/vite` plugin, custom exception handling for error pages.
- Carried over from v2: deferred props, infinite scroll, merging props, polling, prefetching, once props, flash data.
- When using deferred props, add an empty state with a pulsing or animated skeleton.
- Axios has been removed. Use the built-in XHR client with interceptors, or install Axios separately if needed.
- `Inertia::lazy()` / `LazyProp` has been removed. Use `Inertia::optional()` instead.
- Prop types (`Inertia::optional()`, `Inertia::defer()`, `Inertia::merge()`) work inside nested arrays with dot-notation paths.
- SSR works automatically in Vite dev mode with `@inertiajs/vite` - no separate Node.js server needed during development.
- Event renames: `invalid` is now `httpException`, `exception` is now `networkError`.
- `router.cancel()` replaced by `router.cancelAll()`.
- The `future` configuration namespace has been removed - all v2 future options are now always enabled.

=== laravel/core rules ===

# Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using `php artisan list` and check their parameters with `php artisan [command] --help`.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `php artisan make:model --help` to check the available options.

## APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

## URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

## Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

## Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.

=== wayfinder/core rules ===

# Laravel Wayfinder

Use Wayfinder to generate TypeScript functions for Laravel routes. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

=== pint/core rules ===

# Laravel Pint Code Formatter

- If you have modified any PHP files, you must run `vendor/bin/pint --dirty --format agent` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test --format agent`, simply run `vendor/bin/pint --format agent` to fix any formatting issues.

=== phpunit/core rules ===

# PHPUnit

- This application uses PHPUnit for testing. All tests must be written as PHPUnit classes. Use `php artisan make:test --phpunit {name}` to create a new test.
- If you see a test using "Pest", convert it to PHPUnit.
- Every time a test has been updated, run that singular test.
- When the tests relating to your feature are passing, ask the user if they would like to also run the entire test suite to make sure everything is still passing.
- Tests should cover all happy paths, failure paths, and edge cases.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files; these are core to the application.

## Running Tests

- Run the minimal number of tests, using an appropriate filter, before finalizing.
- To run all tests: `php artisan test --compact`.
- To run all tests in a file: `php artisan test --compact tests/Feature/ExampleTest.php`.
- To filter on a particular test name: `php artisan test --compact --filter=testName` (recommended after making a change to a related file).

=== inertia-react/core rules ===

# Inertia + React

- IMPORTANT: Activate `inertia-react-development` when working with Inertia React client-side patterns.

</laravel-boost-guidelines>
