export interface DataListWithPagination<T> {    
    current_page: string | number;
    data: T[];
    last_page: any;
    per_page: string;
    total: string | number;
}

export interface DataListMonitorPresensi<T1, T2> {    
    data: T1[];
    karyawan: T2;
}

export enum roleUserEnum {
    ADMIN = 'admin',
    USER_BIASA = 'user-biasa'
}

export enum roleUserInternalEnum {
    ADMIN = 'admin',
    USER_BIASA = 'user-biasa',
}