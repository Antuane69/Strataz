<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            :root {
                --titulos-brand: #832a19;
                --titulos-brand-hover: #d55c01;
                --background-brand: #d55c01;
                --background-page-brand: #fdf7f2;
            }

            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }

            .public-site-header.ant-layout-header {
                position: sticky;
                top: 0;
                z-index: 20;
                display: flex;
                height: auto;
                align-items: center;
                gap: 24px;
                padding: 0 24px;
                background: #fff;
                line-height: normal;
                box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
            }

            .imagen-header {
                width: 80px !important;
                height: auto !important;
            }

            .public-site-menu.ant-menu-horizontal {
                display: flex;
                min-width: 0;
                flex: 1;
                align-items: center;
                justify-content: center;
                border: 0;
                margin: 0;
                padding: 0;
                background: transparent;
                list-style: none;
            }

            .public-site-menu.ant-menu-horizontal > .ant-menu-item,
            .public-site-menu.ant-menu-horizontal > .ant-menu-submenu {
                display: flex;
                height: 48px;
                align-items: center;
                padding: 0 16px;
                color: var(--titulos-brand);
                font-family: Raleway, Arial, sans-serif;
                font-size: 12px;
                font-weight: 500;
                letter-spacing: 0.25em;
                line-height: 1;
                white-space: nowrap;
            }

            .public-site-menu.ant-menu-horizontal > .ant-menu-item a,
            .public-site-menu.ant-menu-horizontal > .ant-menu-item .ant-menu-title-content,
            .public-site-menu.ant-menu-horizontal > .ant-menu-submenu .ant-menu-title-content {
                color: inherit;
                text-decoration: none;
            }

            .public-site-menu.ant-menu-horizontal > .ant-menu-item::after,
            .public-site-menu.ant-menu-horizontal > .ant-menu-submenu::after {
                border-bottom-color: transparent !important;
            }

            .language-flag {
                display: block;
                width: 18px;
                height: 12px;
                object-fit: cover;
                border-radius: 2px;
            }

            .public-language-toggle {
                position: relative;
                display: inline-flex;
                width: 126px;
                height: 30px;
                flex: 0 0 auto;
                align-items: center;
                border: 0;
                border-radius: 999px;
                padding: 0 10px 0 34px;
                overflow: hidden;
                background: #b7b4b1;
                color: #fff;
                font-family: 'Josefin Sans', Arial, sans-serif;
                cursor: pointer;
            }

            .public-language-toggle-thumb {
                position: absolute;
                top: 4px;
                left: 4px;
                z-index: 1;
                width: 22px;
                height: 22px;
                border-radius: 999px;
                background: #fff;
                box-shadow: 0 2px 6px rgb(0 0 0 / 0.24);
            }

            .public-language-toggle.is-english .public-language-toggle-thumb {
                transform: translateX(96px);
            }

            .public-language-toggle-content {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 0.84rem;
                font-weight: 600;
                line-height: 1;
            }

            .public-booking-boundary,
            .content-body {
                background: var(--background-page-brand) !important;
            }

            .public-booking-desktop {
                position: relative;
                z-index: 1;
                width: 100%;
                border-bottom: 1px solid rgb(131 42 25 / 0.08);
                padding: 10px 24px 8px;
                background: rgb(253 247 242 / 0.72);
            }

            .public-booking-form-desktop {
                display: grid;
                max-width: 1040px;
                margin: 0 auto;
                align-items: end;
                gap: 10px;
                grid-template-columns: repeat(3, minmax(150px, 1fr)) minmax(148px, 0.72fr);
                border: 1px solid rgb(131 42 25 / 0.12);
                border-radius: 8px;
                padding: 10px;
                background: rgb(255 255 255 / 0.88);
                box-shadow: 0 12px 26px rgb(58 31 21 / 0.08);
            }

            .public-booking-field {
                display: grid;
                min-width: 0;
                gap: 5px;
            }

            .public-booking-field > span:first-child {
                color: var(--titulos-brand);
                font-family: 'Josefin Sans', Arial, sans-serif;
                font-size: 0.66rem;
                font-weight: 700;
                letter-spacing: 0.18em;
                line-height: 1;
                text-transform: uppercase;
            }

            .public-booking-picker.ant-picker,
            .public-booking-select.ant-select {
                width: 100%;
                height: 38px;
                font-family: 'Josefin Sans', Arial, sans-serif;
            }

            .public-booking-picker.ant-picker,
            .public-booking-select.ant-select .ant-select-selector {
                border: 1px solid rgb(131 42 25 / 0.13) !important;
                border-radius: 8px !important;
                background: #fffaf6 !important;
                color: #2f231d;
                box-shadow: none !important;
            }

            .public-booking-picker.ant-picker {
                display: flex;
                align-items: center;
                padding: 0 11px;
            }

            .public-booking-select.ant-select .ant-select-selector {
                height: 38px !important;
                padding: 0 36px 0 11px !important;
            }

            .public-booking-submit.ant-btn {
                height: 38px;
                border: 1px solid var(--titulos-brand);
                border-radius: 8px;
                background: var(--titulos-brand);
                color: #fff;
                font-family: 'Josefin Sans', Arial, sans-serif;
                font-size: 0.72rem;
                font-weight: 700;
                letter-spacing: 0.22em;
                text-transform: uppercase;
            }

            .public-booking-mobile-trigger {
                display: none;
            }

            @media (max-width: 768px) {
                .public-booking-desktop {
                    display: none;
                }

                .public-booking-mobile-trigger {
                    position: fixed;
                    right: 14px;
                    bottom: max(14px, env(safe-area-inset-bottom));
                    left: 14px;
                    z-index: 26;
                    display: flex;
                    min-height: 58px;
                    align-items: center;
                    justify-content: space-between;
                    border: 1px solid rgb(255 255 255 / 0.32);
                    border-radius: 8px;
                    padding: 12px 14px;
                    background: #fffaf6;
                    color: var(--titulos-brand);
                    box-shadow: 0 16px 34px rgb(58 31 21 / 0.28);
                }
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Josefin+Sans:wght@400;600;700&display=swap">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
