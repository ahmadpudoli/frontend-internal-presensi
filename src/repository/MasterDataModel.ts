export interface Karyawan {
    id_karyawan: string;
    nama_karyawan: string;
    alamat_karyawan: string;
    jenis_kelamin: string;
    email: string;
    no_hp: string;
    nip:string;
    jabatan:string;
}
export interface Presensi {
    id_presensi: string;
    tgl_presensi: Date;
    id_karyawan: string;
    checkin: Date;
    checkout: Date;
    status: string;
    
}
export interface User {
    id_user: string;
    username: string;
    id_karyawan: string;
    role: string;
}

export interface DefaultOptionData {
    label: string;
    value: string;
}

export interface DataListWithPagination<T> {
    current_page: string | number;
    data: T[];
    first_page_url: string | null;
    from: string | null;
    last_page: any;
    last_page_url: string | null;
    next_page_url: string | null;
    path: string;
    per_page: string;
    prev_page_url: string | null;
    to: string | null;
    total: string | number;
}
