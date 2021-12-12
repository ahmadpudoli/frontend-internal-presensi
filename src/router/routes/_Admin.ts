import { lazy } from 'react';

const TablesRoutesAdmin = [    
    {
        path: '/master/karyawan',
        // exact: true,
        // appLayout: true,
        component: lazy(() => import('../../views/_presensi_online/master/karyawan')),
        meta: {
            action: 'read',
            resource: 'ADMIN'
        }
    },
    {
        path: '/master/karyawan_detail',
        // exact: true,
        // appLayout: true,
        component: lazy(() => import('../../views/_presensi_online/master/karyawan/detail')),
        meta: {
            action: 'read',
            resource: 'ADMIN'
        }
    },
    {
        path: '/presensi/monitor',
        // exact: true,
        // appLayout: true,
        component: lazy(() => import('../../views/_presensi_online/presensi')),
        meta: {
            action: 'read',
            resource: 'ADMIN'
        }
    }
];

export default TablesRoutesAdmin;
