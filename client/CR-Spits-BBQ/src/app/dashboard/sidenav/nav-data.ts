export const navbarData = [
    {
        routerLink: '/',
        icon: 'home',
        label: 'Inicio' ,
        roles: ['Cliente', 'Mesero', 'Administrador']
    },
    {
        routerLink: 'main',
        icon: 'dashboard',
        label: 'Dashboard',
        roles: ['Administrador']
    },
    {
        routerLink: 'mesas',
        icon: 'table_restaurant',
        label: 'Mesas',
        roles: ['Cliente', 'Mesero', 'Administrador']
    },
    {
        routerLink: 'productos',
        icon: 'kebab_dining',
        label: 'Productos',
        roles: ['Mesero', 'Administrador']
    },
    {
        routerLink: 'comandas',
        icon: 'list_alt',
        label: 'Comandas',
        roles: ['Cliente', 'Mesero', 'Administrador']
    },
    {
        routerLink: 'ordenar',
        icon: 'menu_book',
        label: 'Ordenar',
        roles: ['Cliente'] 
    },
    {
        routerLink: 'reservar',
        icon: 'auto_stories',
        label: 'Reservación',
        roles: ['Cliente', 'Mesero', 'Administrador']
    },
]