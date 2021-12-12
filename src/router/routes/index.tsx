// ** Routes Imports
import PagesRoutes from './Pages_routes';
import PresensiOnlineAdmin from './_Admin';
import { roleUserInternalEnum } from '../../repository/PresensiOnlineDataModel';
// ** Document title
const TemplateTitle = '%s - Presensi Online';

const getDefaultRoute = () => {
    
    const userData = JSON.parse(localStorage.getItem('userData') ?? '{}');

    if (userData.role === undefined) {
        return '/logininternal';
    } else {
        if (userData.roles.includes(roleUserInternalEnum.ADMIN)) {
            return '/master/karyawan';
        } else {
           // jika ada role lainnya
        }
    }    

        
};
// ** Default Route
const DefaultRoute = getDefaultRoute();

// ** Merge Routes
const Routes = [...PresensiOnlineAdmin, ...PagesRoutes];

export { DefaultRoute, TemplateTitle, Routes };
