import { Home, Mail } from 'react-feather';

export default [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Home size={20} />,
        action: 'read',
        resource: 'ADMIN',
        navLink: '/admin/dashboard'
    }
];
