# Meson de Mita

Proyecto Laravel con Inertia, React, TypeScript, Tailwind CSS, Fortify, Wayfinder y Ant Design.

Esta guia explica como crear paginas publicas, paginas privadas, menus, modelos, controllers y contenido editable desde base de datos. La idea es que el proyecto tenga dos mundos claros:

- Paginas publicas: sitio visible para visitantes, con header y footer propios.
- Paginas privadas: panel interno para usuarios autenticados, con layout de app y rutas protegidas.

## 1. Levantar el proyecto

Para una instalacion nueva:

```bash
composer install
npm install
copy .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

Tambien existe este script para preparar un clon desde cero:

```bash
composer run setup
```

Comandos utiles durante desarrollo:

```bash
composer run dev        # Laravel + Vite al mismo tiempo
npm run build           # compilar frontend para produccion
npm run lint:check      # revisar TypeScript/React
npm run types:check     # revisar tipos
composer test           # Pint + tests de Laravel
composer lint           # formateo PHP con Pint
```

## 2. Como se conecta Laravel con React

El flujo normal de una pagina Inertia es:

1. Laravel recibe una ruta en `routes/web.php`.
2. La ruta devuelve una pagina Inertia, por ejemplo `public/about`.
3. Inertia busca el componente React en `resources/js/pages/public/about.tsx`.
4. `resources/js/app.tsx` decide que layout envolvera esa pagina.
5. React recibe props desde Laravel y renderiza la vista.

Ejemplo:

```php
Route::inertia('/nosotros', 'public/about')->name('about');
```

Ese nombre `public/about` corresponde a:

```text
resources/js/pages/public/about.tsx
```

No edites a mano `resources/js/routes/*` ni `resources/js/actions/*`. Esos archivos los genera Wayfinder para darte helpers de rutas tipados. Cuando agregues rutas nuevas, corre o reinicia Vite con `composer run dev` o compila con `npm run build`.

## 3. Layouts: publico vs privado

El archivo que decide el layout es `resources/js/app.tsx`.

Actualmente el starter hace esto:

- `welcome` carga sin layout.
- `auth/*` usa `AuthLayout`.
- `settings/*` usa `AppLayout` + `SettingsLayout`.
- Todo lo demas usa `AppLayout`.

Para tener paginas publicas con header y footer propios, crea este archivo:

```tsx
// resources/js/layouts/public-layout.tsx
import { Link, usePage } from '@inertiajs/react';
import { Button, Layout, Menu } from 'antd';
import type { ReactNode } from 'react';
import { dashboard, login } from '@/routes';

const { Header, Content, Footer } = Layout;

export default function PublicLayout({ children }: { children: ReactNode }) {
    const { auth } = usePage().props;

    const items = [
        { key: '/', label: <Link href="/">Inicio</Link> },
        { key: '/nosotros', label: <Link href="/nosotros">Nosotros</Link> },
        { key: '/menu', label: <Link href="/menu">Menu</Link> },
        { key: '/contacto', label: <Link href="/contacto">Contacto</Link> },
    ];

    return (
        <Layout className="min-h-screen bg-white">
            <Header className="sticky top-0 z-20 flex items-center gap-6 bg-white px-6 shadow-sm">
                <Link href="/" className="text-lg font-semibold text-neutral-950">
                    Meson de Mita
                </Link>

                <Menu mode="horizontal" items={items} className="min-w-0 flex-1 border-0" />

                {auth.user ? (
                    <Button type="primary">
                        <Link href={dashboard()}>Panel</Link>
                    </Button>
                ) : (
                    <Button>
                        <Link href={login()}>Entrar</Link>
                    </Button>
                )}
            </Header>

            <Content>{children}</Content>

            <Footer className="border-t bg-neutral-50 text-center text-neutral-600">
                Meson de Mita
            </Footer>
        </Layout>
    );
}
```

Despues actualiza `resources/js/app.tsx`:

```tsx
import PublicLayout from '@/layouts/public-layout';

createInertiaApp({
    // ...
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('public/'):
                return PublicLayout;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
});
```

Con esa regla, cualquier pagina dentro de `resources/js/pages/public/*` usa el header/footer publico. Cualquier pagina privada fuera de `public/*`, `auth/*` y `settings/*` usa `AppLayout`.

Si quieres que `/` use el layout publico, cambia la ruta a:

```php
Route::inertia('/', 'public/home')->name('home');
```

Y crea:

```text
resources/js/pages/public/home.tsx
```

## 4. Ejemplo de pagina sencilla con React y Ant Design

Crea:

```tsx
// resources/js/pages/public/about.tsx
import { Head } from '@inertiajs/react';
import { Button, Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function About() {
    return (
        <>
            <Head title="Nosotros" />

            <main className="mx-auto max-w-6xl px-6 py-12">
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} md={12}>
                        <Title level={1}>Meson de Mita</Title>
                        <Paragraph>
                            Una pagina publica hecha con React, Inertia y Ant Design.
                        </Paragraph>
                        <Button type="primary" size="large">
                            Conocer el menu
                        </Button>
                    </Col>

                    <Col xs={24} md={12}>
                        <Card title="Horario">
                            <Paragraph>Lunes a domingo</Paragraph>
                            <Paragraph strong>8:00 am a 10:00 pm</Paragraph>
                        </Card>
                    </Col>
                </Row>
            </main>
        </>
    );
}
```

Agrega la ruta publica en `routes/web.php`:

```php
Route::inertia('/nosotros', 'public/about')->name('about');
```

Agrega el enlace al menu publico en `PublicLayout`:

```tsx
{ key: '/nosotros', label: <Link href="/nosotros">Nosotros</Link> }
```

Si Wayfinder ya genero el helper `about()`, tambien puedes usar:

```tsx
import { about } from '@/routes';

<Link href={about()}>Nosotros</Link>
```

## 5. Como agregar mas paginas publicas

Para cada pagina publica:

1. Crea un archivo React en `resources/js/pages/public`.
2. Agrega una ruta en `routes/web.php`.
3. Agrega el enlace al menu de `resources/js/layouts/public-layout.tsx`.
4. Reinicia `composer run dev` si el helper de Wayfinder no aparece.

Ejemplo para contacto:

```php
Route::inertia('/contacto', 'public/contact')->name('contact');
```

```text
resources/js/pages/public/contact.tsx
```

## 6. Paginas privadas o con login

Las paginas privadas van dentro de grupos con middleware:

```php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/admin/paginas', 'admin/pages/index')
        ->name('admin.pages.index');
});
```

El componente va en:

```text
resources/js/pages/admin/pages/index.tsx
```

Como no empieza con `public/`, `auth/` ni `settings/`, automaticamente carga `AppLayout`.

Para agregarla al menu lateral privado, edita `resources/js/components/app-sidebar.tsx`:

```tsx
import { FileText, LayoutGrid } from 'lucide-react';
import { dashboard } from '@/routes';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Paginas',
        href: '/admin/paginas',
        icon: FileText,
    },
];
```

Si prefieres un layout privado con header superior en vez de sidebar, cambia `resources/js/layouts/app-layout.tsx`:

```tsx
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
```

Y agrega los enlaces privados en `resources/js/components/app-header.tsx`.

## 7. Rutas solo para admin

Primero agrega una columna al usuario:

```bash
php artisan make:migration add_is_admin_to_users_table
```

Migration:

```php
Schema::table('users', function (Blueprint $table) {
    $table->boolean('is_admin')->default(false);
});
```

En `app/Models/User.php`, agrega el cast:

```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean',
    ];
}
```

Define una regla en `app/Providers/AppServiceProvider.php`:

```php
use App\Models\User;
use Illuminate\Support\Facades\Gate;

public function boot(): void
{
    Gate::define('manage-content', fn (User $user) => $user->is_admin);
}
```

Protege las rutas:

```php
Route::middleware(['auth', 'verified', 'can:manage-content'])->group(function () {
    Route::inertia('/admin/paginas', 'admin/pages/index')
        ->name('admin.pages.index');
});
```

## 8. Modelos, controllers y contenido guardado en BD

Para que un admin edite contenido y el sitio publico lo lea desde base de datos, usa este flujo:

1. Un `Model` representa la tabla.
2. Un `Controller` privado guarda o actualiza contenido.
3. Un `Controller` publico consulta contenido publicado.
4. Inertia envia los datos como props a React.
5. React muestra los datos en una pagina publica.

Ejemplo con paginas editables:

```bash
php artisan make:model Page -m
php artisan make:controller PublicPageController
php artisan make:controller Admin/PageController --resource
```

Migration de `pages`:

```php
Schema::create('pages', function (Blueprint $table) {
    $table->id();
    $table->string('slug')->unique();
    $table->string('title');
    $table->string('excerpt')->nullable();
    $table->longText('body')->nullable();
    $table->boolean('is_published')->default(false);
    $table->timestamp('published_at')->nullable();
    $table->timestamps();
});
```

Modelo:

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['slug', 'title', 'excerpt', 'body', 'is_published', 'published_at'])]
class Page extends Model
{
    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }
}
```

Controller publico:

```php
namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function show(string $slug): Response
    {
        $page = Page::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('public/page-show', [
            'page' => $page->only(['slug', 'title', 'excerpt', 'body']),
        ]);
    }
}
```

Controller privado:

```php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function edit(Page $page): Response
    {
        return Inertia::render('admin/pages/edit', [
            'page' => $page,
        ]);
    }

    public function update(Request $request, Page $page): RedirectResponse
    {
        $data = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:pages,slug,'.$page->id],
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['nullable', 'string'],
            'is_published' => ['required', 'boolean'],
        ]);

        $page->update($data);

        return redirect()
            ->route('admin.pages.edit', $page)
            ->with('success', 'Pagina guardada.');
    }
}
```

Rutas:

```php
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\PublicPageController;

Route::get('/p/{slug}', [PublicPageController::class, 'show'])
    ->name('pages.show');

Route::middleware(['auth', 'verified', 'can:manage-content'])->group(function () {
    Route::resource('/admin/paginas', AdminPageController::class)
        ->names('admin.pages');
});
```

Vista publica:

```tsx
// resources/js/pages/public/page-show.tsx
import { Head } from '@inertiajs/react';
import { Typography } from 'antd';

type Page = {
    slug: string;
    title: string;
    excerpt?: string | null;
    body?: string | null;
};

export default function PageShow({ page }: { page: Page }) {
    return (
        <>
            <Head title={page.title} />

            <main className="mx-auto max-w-3xl px-6 py-12">
                <Typography.Title>{page.title}</Typography.Title>
                {page.excerpt && <Typography.Paragraph>{page.excerpt}</Typography.Paragraph>}
                {page.body && <Typography.Paragraph>{page.body}</Typography.Paragraph>}
            </main>
        </>
    );
}
```

Vista privada de edicion:

```tsx
// resources/js/pages/admin/pages/edit.tsx
import { Head, useForm } from '@inertiajs/react';
import { Button, Card, Form, Input, Switch } from 'antd';

type Page = {
    id: number;
    slug: string;
    title: string;
    excerpt?: string | null;
    body?: string | null;
    is_published: boolean;
};

export default function EditPage({ page }: { page: Page }) {
    const { data, setData, patch, processing, errors } = useForm({
        slug: page.slug,
        title: page.title,
        excerpt: page.excerpt ?? '',
        body: page.body ?? '',
        is_published: page.is_published,
    });

    return (
        <>
            <Head title={`Editar ${page.title}`} />

            <main className="p-4">
                <Card title="Editar pagina">
                    <Form layout="vertical" onFinish={() => patch(`/admin/paginas/${page.id}`)}>
                        <Form.Item label="Slug" help={errors.slug} validateStatus={errors.slug ? 'error' : ''}>
                            <Input value={data.slug} onChange={(event) => setData('slug', event.target.value)} />
                        </Form.Item>

                        <Form.Item label="Titulo" help={errors.title} validateStatus={errors.title ? 'error' : ''}>
                            <Input value={data.title} onChange={(event) => setData('title', event.target.value)} />
                        </Form.Item>

                        <Form.Item label="Resumen" help={errors.excerpt} validateStatus={errors.excerpt ? 'error' : ''}>
                            <Input value={data.excerpt} onChange={(event) => setData('excerpt', event.target.value)} />
                        </Form.Item>

                        <Form.Item label="Contenido" help={errors.body} validateStatus={errors.body ? 'error' : ''}>
                            <Input.TextArea rows={8} value={data.body} onChange={(event) => setData('body', event.target.value)} />
                        </Form.Item>

                        <Form.Item label="Publicada">
                            <Switch checked={data.is_published} onChange={(value) => setData('is_published', value)} />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" loading={processing}>
                            Guardar
                        </Button>
                    </Form>
                </Card>
            </main>
        </>
    );
}
```

Importante: si guardas HTML en `body` y lo renderizas con `dangerouslySetInnerHTML`, sanitizalo antes de guardarlo o antes de mostrarlo. Para empezar, es mas seguro guardar texto plano o Markdown procesado con una libreria confiable.

## 9. Laravel Boost

La documentacion oficial actual de Laravel Boost indica que se instala asi:

```bash
composer require laravel/boost --dev
php artisan boost:install
```

En este proyecto ahora mismo `composer.json` no muestra `laravel/boost`; muestra `laravel/pao` y `laravel/chisel`. Eso significa que conviene verificar si Boost quedo instalado:

```bash
composer show laravel/boost
```

Si Composer responde que no esta instalado, instalalo con los comandos anteriores.

Durante `php artisan boost:install`, selecciona las integraciones que uses, por ejemplo Codex, MCP, AI Guidelines y Agent Skills. Para Codex, la documentacion oficial tambien muestra este comando manual si el registro automatico no aparece:

```bash
codex mcp add laravel-boost -- php "artisan" "boost:mcp"
```

Para mantener los recursos de Boost actualizados:

```bash
php artisan boost:update
```

Tambien puedes agregarlo al `post-update-cmd` de `composer.json`:

```json
{
    "scripts": {
        "post-update-cmd": [
            "@php artisan vendor:publish --tag=laravel-assets --ansi --force",
            "@php artisan boost:update --ansi"
        ]
    }
}
```

Boost ayuda a la IA porque le da herramientas para inspeccionar rutas, modelos, base de datos, logs, configuracion, comandos Artisan y documentacion versionada. Para ahorrar tokens, pide a la IA que primero lea `AGENTS.md`, use Boost si esta activo, y no lea `vendor/`, `node_modules/` ni `public/build/` salvo que sea necesario.

Este repo incluye `.ai/guidelines/project.md` para que Boost tenga reglas propias del proyecto cuando ejecutes `boost:install` o `boost:update`.

Referencias:

- Laravel Boost docs: https://laravel.com/docs/master/boost
- AI Assisted Development docs: https://laravel.com/docs/12.x/ai

## 10. Checklist para crear una feature

Para una pagina publica simple:

1. Crear `resources/js/pages/public/nombre.tsx`.
2. Agregar `Route::inertia('/url', 'public/nombre')->name('nombre')`.
3. Agregar enlace en `resources/js/layouts/public-layout.tsx`.
4. Probar en navegador.

Para una pantalla privada simple:

1. Crear `resources/js/pages/admin/nombre.tsx`.
2. Agregar ruta dentro de `Route::middleware(['auth', 'verified'])`.
3. Agregar enlace en `resources/js/components/app-sidebar.tsx`.
4. Probar con usuario logueado.

Para contenido editable:

1. Crear modelo y migration.
2. Crear controller publico para leer contenido publicado.
3. Crear controller privado para crear/editar contenido.
4. Validar request antes de guardar.
5. Enviar props minimas a React.
6. No exponer campos internos en la vista publica.
