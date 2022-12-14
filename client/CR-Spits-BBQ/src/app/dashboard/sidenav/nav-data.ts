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
        routerLink: 'pedidos/create',
        icon: 'menu_book',
        label: 'Ordenar',
        roles: ['Cliente'] 
    },
    {
        routerLink: 'reservaciones',
        icon: 'auto_stories',
        label: 'Reservación',
        roles: ['Cliente', 'Mesero', 'Administrador']
    },
    {
        routerLink: 'usuarios',
        icon: 'person',
        label: 'Usuarios',
        roles: ['Administrador']
    },
    {
        routerLink: 'reportes/fecha',
        icon: 'bar_chart',
        label: 'Ventas',
        roles: ['Administrador']
    },
    {
        routerLink: 'reportes/tipopago',
        icon: 'query_stats',
        label: 'Tipo de pago',
        roles: ['Administrador']
    },
    // {
    //     routerLink: 'reportes/mixtos',
    //     icon: 'person',
    //     label: 'Usuarios',
    //     roles: ['Administrador']
    // },
]

//* Falta uno para los reportes, aunque son 3 los hptas...