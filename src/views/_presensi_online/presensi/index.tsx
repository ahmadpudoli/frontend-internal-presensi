import { MoreVertical, X, Plus, Settings } from 'react-feather';
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, CardBody, Col, Row, Button } from 'reactstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Fragment, useEffect, useState } from 'react';
import api from '@src/auth/api/useAPI';
import ReactPaginate from 'react-paginate';
import { getError } from '@src/auth/getError';
import Breadcrumbs from '@src/@core/components/breadcrumbs/indexCustom';
import { toast } from 'react-toastify';
import Toast from '@src/views/_presensi_online/general/components/Toast';
import UILoader from '@src/@core/components/ui-loader';
import {  Karyawan, Presensi } from '@src/repository/MasterDataModel';
import { useHistory } from 'react-router-dom';
import { DataListMonitorPresensi } from '@src/repository/PresensiOnlineDataModel';
import { format } from 'date-fns';
import Select from 'react-select';

const TablePresensi = () => {
    const queryClient = useQueryClient();
    const history = useHistory();
    const [block, setBlock] = useState(false);
    const [modal, setModal] = useState(false);
    const [tahun, setTahun] = useState(2021);
    const [bulan, setBulan] = useState(12);
    const [idKaryawan, setIdKaryawan] = useState('-no-selected');    
    const [listKaryawan, setListKaryawan]: any = useState([]);

    // ================
    const getListKaryawan = async () => {
        const s = await api.getData(`karyawans/option/list`).then((r: any) => {
            return r.data.result;
        });
        setListKaryawan(renderDataListKaryawan(s));
    };

    const renderDataListKaryawan = (listDoc: any) => {
        if (listDoc.length > 0) {
            const retList = listDoc.map((doc: any) => ({ value: doc.id, label: doc.text }));
            return retList;
        }
    };


    const listTahun = [];
    const today = new Date();
    const curTahun = today.getFullYear();
    
    // setTahun(curTahun);
    // setBulan(today.getMonth() + 1);

     for (let i = curTahun; i > 2015; i--) {
         listTahun.push({value: i, label:i});
     }

     const arr_bulan = [
        '', 'Januari', 'Februari', 'Maret', 'April', 'Mei',
        'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 
        'Desember'
    ];

    const listBulan = [];
    for (let i = 1; i <= 12; i++) {
        listBulan.push({value: i, label:arr_bulan[i]});
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        setTahun(curTahun);
        setBulan(today.getMonth() + 1);
        setIdKaryawan('-no-selected');
        getListKaryawan();
    }, [])

    const getDataFromAPI = async (idKaryawan: string, tahun: number, bulan: number) => {
        return await api.getData(`presensi/${idKaryawan}/${tahun}/${bulan}`).then((r) => {
            const hasil = r.data.result;
            return hasil;
        });
    };

    const query = useQuery<DataListMonitorPresensi<Presensi, Karyawan>, Error>([`list-presensi`, idKaryawan, tahun, bulan], () => getDataFromAPI(idKaryawan, tahun, bulan), {
        refetchOnWindowFocus: false
    });
    if (query.isError) {
        getError(query.error);
    }

    const renderData = (dataFromAPI: Presensi[]) => {
        if (dataFromAPI.length !== 0) {
            const rowTable = dataFromAPI.map((r: Presensi, i: number) => (
                <tr key={i}>
                    <td>{ format(new Date(r.tgl_presensi), "dd MMMM yyyy", { })}</td>
                    <td>{ (r.checkin !== null) ? format(new Date(r.checkin), "HH:mm:ss", {  }) : ""}</td>
                    <td>{ (r.checkout !== null) ? format(new Date(r.checkout), "HH:mm:ss", { }) : ""}</td>
                    <td>{(r.status === "H" ? <span className="mr-1 badge badge-light-success  text-wrap badge-pill">Hadir</span> : <span className="mr-1 badge badge-light-danger  text-wrap badge-pill">Tidak Hadir</span>)}</td>
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem
                                    tag="a"
                                    onClick={(e: any) => {
                                        e.preventDefault();
                                        history.push('/presensi/download_file_checkin', { id_presensi: r.id_presensi });
                                    }}
                                >
                                    <Settings className="mr-50" size={15} /> <span className="align-middle">Download File Checkin</span>
                                </DropdownItem>
                                <DropdownItem
                                    tag="a"
                                    onClick={(e: any) => {
                                        e.preventDefault();
                                        history.push('/presensi/download_file_checkout', { id_presensi: r.id_presensi });
                                    }}
                                >
                                    <Settings className="mr-50" size={15} /> <span className="align-middle">Download File Checkout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
            ));

            return rowTable;
        } else {
            return (
                <tr>
                    <td colSpan={5} className="text-center">
                        Data Kosong
                    </td>
                </tr>
            );
        }
    };

        
    // ================
    return (
        <>
            <Fragment>
                <Breadcrumbs breadCrumbTitle="Monitor Presensi" breadCrumbParent="Monitor" breadCrumbActive="Monitor Presensi" />
                <Row>
                    <Col sm="12">
                        <UILoader blocking={block}>
                            <Card>
                                <CardBody className="px-0 pt-1">
                                    <Row>
                                        <Col lg="12" className="">
                                            <Row className="ml-1 mb-1" >
                                                <Col lg="4" className=""  >
                                                    <Select
                                                        className="react-select"
                                                        classNamePrefix="select"
                                                        name="pilih_karyawan"
                                                        placeholder="Pilih Karyawan"
                                                        // defaultValue={renderData(query.data)[0] || ''}
                                                        options={listKaryawan}
                                                        isClearable={false}
                                                        onChange={(e) => {
                                                            if (e !== null) {
                                                                setIdKaryawan(e.value);
                                                            }
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg="2" className=""  >
                                                    <Select
                                                        className="react-select"
                                                        classNamePrefix="select"
                                                        placeholder="Pilih Tahun"
                                                        // defaultValue={renderData(query.data)[0] || ''}
                                                        options={listTahun}
                                                        defaultValue={ {label: tahun, value: tahun }}
                                                        isClearable={false}
                                                        onChange={(e) => {
                                                            if (e) {
                                                                setTahun(e.value);
                                                            }
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg="2" className="" >
                                                    <Select
                                                        className="react-select"
                                                        classNamePrefix="select"
                                                        placeholder="Pilih Bulan"
                                                        // defaultValue={renderData(query.data)[0] || ''}
                                                        options={listBulan}
                                                        defaultValue={ {label: arr_bulan[bulan], value: bulan }}
                                                        isClearable={false}
                                                        onChange={(e) => {
                                                            if (e) {
                                                                setBulan(e.value);
                                                            }
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                                                                        
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Tanggal</th>
                                                        <th>Checkin</th>
                                                        <th>Checkout</th>
                                                        <th>Status</th>
                                                        <th style={{ width: '15%' }} scope="col">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {query.isLoading ? (
                                                        <tr>
                                                            <td colSpan={5}>Loading...</td>
                                                        </tr>
                                                    ) : query.isError ? (
                                                        <tr>
                                                            <td colSpan={5}>Error: Terjadi Kesalahan</td>
                                                        </tr>
                                                    ) : query.data !== undefined ? (
                                                        renderData(query.data?.data)
                                                    ) : (
                                                        // renderData(dataTest)
                                                        <tr key={0}>
                                                            <td colSpan={5} className="text-center">
                                                                Data Tidak Ditemukan
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                            <hr className="mt-0" />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </UILoader>
                    </Col>
                </Row>
            </Fragment>
        </>
    );
};

export default TablePresensi;
