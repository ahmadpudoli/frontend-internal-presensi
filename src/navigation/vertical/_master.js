import { Briefcase, Users, Settings, Flag, Box, Tablet, Octagon, BookOpen, User } from 'react-feather';

export default [
    {
        header: 'Master Data',
        action: 'read',
        resource: 'ADMIN'
    },    
    {
        id: 'master_karyawan',
        title: 'Karyawan',
        icon: <Users size={20} />,
        action: 'read',
        resource: 'ADMIN',
        navLink: '/master/karyawan'
    }   
];
