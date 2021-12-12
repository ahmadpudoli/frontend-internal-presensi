import { roleUserInternalEnum } from '@src/repository/PresensiOnlineDataModel';
import { DeepMap, FieldValues, FieldError } from 'react-hook-form';

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj: DeepMap<FieldValues, FieldError>) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num: number) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

// ** Converts HTML to string
export const htmlToString = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, '');

// ** Checks if the passed date is today
const isToday = (date: Date) => {
    const today = new Date();
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value: string | number | Date, formatting: any = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!value) return value;
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value: string | number | Date, toTimeForCurrentDay = true) => {
    const date = new Date(value);
    let formatting: any = { month: 'short', day: 'numeric' };

    if (toTimeForCurrentDay && isToday(date)) {
        formatting = { hour: 'numeric', minute: 'numeric' };
    }

    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData') !== null;
export const getUserData = () => JSON.parse(localStorage.getItem('userData') || '');

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same ro}ute for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole: string) => {
    const userData = getUserData();
    console.log(userData.roles)
    if (userData.roles.includes(roleUserInternalEnum.ADMIN)) {
        console.log("a");
        return '/master/karyawan';
    } else {
        return '/logininternal';
    }
    
};

export const getDefaultLogoutUrl = (userRole: string) => {
    if (userRole === 'mitra') return '/login';
    return '/loginInternal';
};

export const getDefaultLogoutAPI = (userRole: string) => {
    if (userRole === 'mitra') return 'publik/auth/logout';
    return 'admin/auth/logout';
};

export const getMitraRouterProfileBelumLengkap = () => {
    return '/mitra/profile';
};

export const clearStorage = (config: {
    loginEndpoint?: string;
    loginInternalEndpoint?: string;
    registerEndpoint?: string;
    refreshEndpoint?: string;
    logoutEndpoint?: string;
    tokenType?: string;
    storageTokenKeyName: any;
    storageRefreshTokenKeyName: any;
}) => {
    localStorage.removeItem('userData');
    localStorage.removeItem(config.storageTokenKeyName);
    localStorage.removeItem(config.storageRefreshTokenKeyName);
};

// ** React Select Theme Colors
export const selectThemeColors = (theme: { colors: any }) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: '#7367f01a', // for option hover bg-color
        primary: '#7367f0', // for selected option bg-color
        neutral10: '#7367f0', // for tags bg-color
        neutral20: '#ededed', // for input border-color
        neutral30: '#ededed' // for input hover border-color
    }
});

export const defaultFormatDate = (paramDate: string | number | Date) => {
    const date = new Date(paramDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    const ret = `${year}-${month}-${day}`;
    return ret;
};

export const defaultFormatDatetime = (paramDate: string | number | Date) => {
    const date = new Date(paramDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    const ret = `${year}-${month}-${day} 00:00:00`;
    return ret;
};

export const selectColorByStatus = (status: string) => {
    if (status === 'Verifikasi Kelengkapan') return 'warning';
    return 'secondary';
};

export const onClickEventTimer = async (timer: number, callback: any, val: string) => {
    window.setTimeout(async () => {
        await callback(val);
    }, timer);
};

// generateAutoCompleteInstansi = async (e: string) => {
//     this.showLoading(true);
//     if (e !== '') {
//         clearTimeout(this.timer);
//         this.timer = window.setTimeout(async () => {
//             await this.loadInstansi(e);
//         }, 400);
//     }
//     this.showLoading(false);
// };
