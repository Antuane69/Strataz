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
