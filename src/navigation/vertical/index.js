// ** Navigation sections imports
import master from './_master';
import general from './_general';
import presensi from './_presensi';
import { isUserLoggedIn } from '@src/utility/Utils';
import { roleUserInternalEnum } from '@src/repository/PresensiOnlineDataModel';

let menus = [];

if (isUserLoggedIn()) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log('acuh');
    if (userData.roles.includes(roleUserInternalEnum.ADMIN)) {
        console.log('acuh a');
        menus = [...menus, ...master, ...presensi];
    } 

    if (menus.length === 0) {
        menus = [...general];
    }
    
}

export default menus;
