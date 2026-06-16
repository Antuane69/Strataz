import type { ComponentType } from "react";

export type IconComponent = ComponentType<{ size?: number }>;

export type ContactInfo = {
    id: string;
    label: string;
    lines: string[];
    href: string;
    external?: boolean;
    icon: IconComponent;
};

export type ArrivalRoute = {
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
    footer?: string;
    companias?: string[];
    icon: IconComponent;
    steps?: string[];
};