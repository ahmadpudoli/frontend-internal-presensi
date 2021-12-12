import { Briefcase, Users, Settings, Flag, Box, Tablet, Octagon, BookOpen, User } from 'react-feather';

export default [
    {
        header: 'Transaksi',
        action: 'read',
        resource: 'ADMIN'
    },    
    {
        id: 'presensi_monitor',
        title: 'Monitor Presensi',
        icon: <Users size={20} />,
        action: 'read',
        resource: 'ADMIN',
        navLink: '/presensi/monitor'
    }
];
