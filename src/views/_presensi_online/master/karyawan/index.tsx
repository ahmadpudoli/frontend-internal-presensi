import { MoreVertical, X, Plus, Settings } from 'react-feather';
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, CardBody, Col, Row, Button } from 'reactstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Fragment, useState } from 'react';
import api from '@src/auth/api/useAPI';
import ReactPaginate from 'react-paginate';
import { getError } from '@src/auth/getError';
import Breadcrumbs from '@src/@core/components/breadcrumbs/indexCustom';
import { toast } from 'react-toastify';
import Toast from '@src/views/_presensi_online/general/components/Toast';
import UILoader from '@src/@core/components/ui-loader';
import { DataListWithPagination } from '@src/repository/PresensiOnlineDataModel';
import { Karyawan } from '@src/repository/MasterDataModel';
import { useHistory } from 'react-router-dom';
import PaginateCustom from '../../general/components/Paginate';
import ViewSearchButton from '../../general/components/SearchInput';

const TableKaryawan = () => {
    const queryClient = useQueryClient();
    const history = useHistory();
    const [block, setBlock] = useState(false);
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const [key, setKey] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [idKaryawan, setIdKaryawan] = useState('');
    const [namaKaryawan, setNamaKaryawan] = useState('');
    const [email, setEmail] = useState('');
    const [noHp, setNoHp] = useState('');
    const toggleModal = () => {
        setModal(!modal);
    };

    const getDataFromAPI = async (key: string, page: number) => {
        return await api.getData(`karyawans?key=${key}&page=${page}`).then((r) => {
            setPage(r.data.result.current_page);
            const hasil = r.data.result;
            return hasil;
        });
    };

    const query = useQuery<DataListWithPagination<Karyawan>, Error>([`list-master-karyawan`, page, key], () => getDataFromAPI(key, page), {
        refetchOnWindowFocus: false
    });
    if (query.isError) {
        getError(query.error);
    }

    const renderData = (dataFromAPI: Karyawan[]) => {
        if (dataFromAPI.length !== 0) {
            const rowTable = dataFromAPI.map((r: Karyawan, i: number) => (
                <tr key={i}>
                    <td>{r.nip}</td>
                    <td>{r.nama_karyawan}</td>
                    <td>{r.jabatan}</td>
                    <td>{r.no_hp}</td>
                    <td>{r.email}</td>
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
                                        history.push('/master/karyawan_detail', { id_karyawan: r.id_karyawan });
                                    }}
                                >
                                    <Settings className="mr-50" size={15} /> <span className="align-middle">Ubah</span>
                                </DropdownItem>
                                <DropdownItem
                                    className=" text-danger"
                                    tag="a"
                                    onClick={() => {
                                        handleOnDelete({ id_karyawan: r.id_karyawan });
                                    }}
                                >
                                    <X className="mr-50" size={15} /> <span className="align-middle">Hapus Karyawan</span>
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

    // ==== Delete ====
    const onDelete = async (dataForm: any) => {
        return await api.deleteData(`karyawans/${dataForm.id_karyawan}`).then((r) => {
            return r.data;
        });
    };
    const mutationDelete = useMutation(onDelete, {
        onMutate: async () => {
            setBlock(true);
        },
        onSettled: async () => {
            setBlock(false);
        },
        onError: async (error, _variables, context) => {
            getError(error);
            setBlock(false);
        },
        onSuccess: async (rest) => {
            await queryClient.invalidateQueries('list-master-karyawan');
            toast.success(<Toast color="success" title="Berhasil" message="Data berhasil dihapus" />, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    });
    const handleOnDelete = (data: any) => {
        mutationDelete.mutate(data);
    };
    // ================
    return (
        <>
            <Fragment>
                <Breadcrumbs breadCrumbTitle="Master Karyawan" breadCrumbParent="Master" breadCrumbActive="Master Karyawan" />
                <Row>
                    <Col sm="12">
                        <UILoader blocking={block}>
                            <Card>
                                <CardBody className="px-0 pt-1">
                                    <Row>
                                        <Col lg="12" className="px-1 text-right">
                                            <Button
                                                className="mr-1 mb-1"
                                                onClick={(e: any) => {
                                                    history.push('/master/karyawan_detail', { id_karyawan: '' });
                                                }}
                                                color="primary"
                                                size="sm"
                                                outline
                                            >
                                                <Plus className="mr-50" size={15} /> <span className="align-middle">Tambah Karyawan</span>
                                            </Button>
                                        </Col>
                                        <Col lg="12" className="">
                                            <ViewSearchButton keyCallback={setKey} />
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>NIP</th>
                                                        <th>Nama Lengkap</th>
                                                        <th style={{ width: '15%' }}>Jabatan</th>
                                                        <th style={{ width: '15%' }}>No HP</th>
                                                        <th style={{ width: '15%' }}>Email</th>
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
                                            <PaginateCustom LastPage={query.data?.last_page || 0} CallbackSetPage={setPage} />
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

export default TableKaryawan;
