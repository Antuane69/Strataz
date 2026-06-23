import { Link } from '@inertiajs/react';
import {
    BadgePercent,
    BedDouble,
    BookOpen,
    CircleHelp,
    ConciergeBell,
    FolderGit2,
    Gem,
    Images,
    LayoutGrid,
    MapPin,
    PartyPopper,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Habitaciones',
        href: '/admin/contenido/habitaciones',
        icon: BedDouble,
    },
    {
        title: 'Servicios',
        href: '/admin/contenido/servicios',
        icon: ConciergeBell,
    },
    {
        title: 'Bodas',
        href: '/admin/contenido/bodas',
        icon: Gem,
    },
    {
        title: 'Promociones',
        href: '/admin/contenido/promociones',
        icon: BadgePercent,
    },
    {
        title: 'Recomendaciones',
        href: '/admin/contenido/recomendaciones',
        icon: PartyPopper,
    },
    {
        title: 'Galeria',
        href: '/admin/contenido/galeria',
        icon: Images,
    },
    {
        title: 'FAQ',
        href: '/admin/contenido/faq',
        icon: CircleHelp,
    },
    {
        title: 'Contacto',
        href: '/admin/contenido/contacto',
        icon: MapPin,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
