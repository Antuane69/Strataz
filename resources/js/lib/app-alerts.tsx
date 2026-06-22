import { router } from '@inertiajs/react';
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import './app-alerts.css';

type AppAlertType = 'success' | 'info' | 'warning' | 'error';

type AppAlertOptions = Omit<
    NotificationArgsProps,
    'description' | 'message' | 'title' | 'type'
> & {
    description?: ReactNode;
    message?: ReactNode;
    title?: ReactNode;
    type?: AppAlertType;
};

type BackendErrorAlertOptions = Omit<AppAlertOptions, 'description' | 'type'> & {
    fallback?: string;
};

let appAlertApi: NotificationInstance | null = null;
const queuedAlerts: AppAlertOptions[] = [];

export function AppAlertsProvider({ children }: { children: ReactNode }) {
    const [api, contextHolder] = notification.useNotification({
        placement: 'topRight',
        maxCount: 4,
        stack: {
            threshold: 3,
        },
    });

    useEffect(() => {
        appAlertApi = api;

        while (queuedAlerts.length > 0) {
            const alert = queuedAlerts.shift();

            if (alert) {
                showAppAlert(alert);
            }
        }

        return () => {
            if (appAlertApi === api) {
                appAlertApi = null;
            }
        };
    }, [api]);

    useEffect(() => {
        const removeHttpExceptionListener = router.on(
            'httpException',
            (event) => {
                const { response } = event.detail;

                showBackendErrorAlert(response, {
                    title: `Error ${response.status}`,
                });

                return false;
            },
        );
        const removeNetworkErrorListener = router.on('networkError', (event) => {
            showAppAlert({
                type: 'error',
                title: 'Error de conexion',
                description: extractBackendErrorMessage(
                    event.detail.error,
                    'No se pudo conectar con el servidor.',
                ),
                duration: false,
            });

            return false;
        });

        return () => {
            removeHttpExceptionListener();
            removeNetworkErrorListener();
        };
    }, []);

    return (
        <>
            {contextHolder}
            {children}
        </>
    );
}

export function showAppAlert({
    type = 'info',
    title,
    message,
    description,
    className,
    duration,
    ...options
}: AppAlertOptions): void {
    const api = appAlertApi;
    const resolvedDuration = duration ?? (type === 'error' ? false : 4.5);
    const alert: NotificationArgsProps = {
        ...options,
        className: ['app-alert', `app-alert-${type}`, className]
            .filter(Boolean)
            .join(' '),
        description,
        duration: resolvedDuration,
        pauseOnHover: options.pauseOnHover ?? true,
        placement: options.placement ?? 'topRight',
        role: options.role ?? (type === 'error' ? 'alert' : 'status'),
        showProgress: options.showProgress ?? resolvedDuration !== false,
        title: title ?? message ?? defaultAlertTitle(type),
    };

    if (!api) {
        queuedAlerts.push({ ...options, className, description, duration, title, type });

        return;
    }

    api[type](alert);
}

export function showBackendErrorAlert(
    error: unknown,
    options: BackendErrorAlertOptions = {},
): void {
    const { fallback, ...alertOptions } = options;

    showAppAlert({
        ...alertOptions,
        type: 'error',
        title: options.title ?? 'No se pudo completar la accion',
        description: extractBackendErrorMessage(error, fallback),
        duration: alertOptions.duration ?? false,
    });
}

export function extractBackendErrorMessage(
    error: unknown,
    fallback = 'Ocurrio un error inesperado.',
): string {
    const messages = collectErrorMessages(error);
    const uniqueMessages = Array.from(new Set(messages.map((item) => item.trim())))
        .filter(Boolean)
        .slice(0, 10);

    if (uniqueMessages.length === 0) {
        return fallback;
    }

    return uniqueMessages.join('\n');
}

function collectErrorMessages(value: unknown, label?: string): string[] {
    if (value === null || value === undefined) {
        return [];
    }

    if (typeof value === 'string') {
        return collectStringError(value, label);
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return [formatMessage(String(value), label)];
    }

    if (value instanceof Error) {
        return [formatMessage(value.message, label)];
    }

    if (Array.isArray(value)) {
        return value.flatMap((item) => collectErrorMessages(item, label));
    }

    if (typeof value !== 'object') {
        return [];
    }

    if (value instanceof Blob || value instanceof File) {
        return [];
    }

    const record = value as Record<string, unknown>;
    const prioritizedMessages = [
        ...collectErrorMessages(record.response),
        ...collectErrorMessages(record.data),
        ...collectErrorMessages(record.errors),
        ...collectErrorMessages(record.message),
        ...collectErrorMessages(record.error),
        ...collectErrorMessages(record.detail),
        ...collectErrorMessages(record.title),
        ...collectErrorMessages(record.exception),
    ];

    if (prioritizedMessages.length > 0) {
        return prioritizedMessages;
    }

    return Object.entries(record).flatMap(([key, item]) =>
        collectErrorMessages(item, humanizeKey(key)),
    );
}

function collectStringError(value: string, label?: string): string[] {
    const trimmed = stripHtml(value).trim();

    if (!trimmed) {
        return [];
    }

    try {
        const parsed = JSON.parse(trimmed) as unknown;

        return collectErrorMessages(parsed, label);
    } catch {
        return [formatMessage(trimmed, label)];
    }
}

function formatMessage(message: string, label?: string): string {
    if (!label) {
        return message;
    }

    return `${label}: ${message}`;
}

function stripHtml(value: string): string {
    return value
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ');
}

function humanizeKey(key: string): string {
    return key
        .replace(/\.\d+\./g, ' ')
        .replace(/[._-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function defaultAlertTitle(type: AppAlertType): string {
    const titles: Record<AppAlertType, string> = {
        error: 'Error',
        info: 'Informacion',
        success: 'Listo',
        warning: 'Atencion',
    };

    return titles[type];
}
