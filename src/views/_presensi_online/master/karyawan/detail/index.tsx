import { Col, Row } from 'reactstrap';
import { useQuery, useQueryClient } from 'react-query';
import { Fragment, useState } from 'react';
import Breadcrumbs from '@src/@core/components/breadcrumbs/indexCustom';
import { useLocation } from 'react-router-dom';
import api from '@src/auth/api/useAPI';
import { LoadingSegment } from '@src/views/_presensi_online/general/components/Loading';
import { Karyawan } from '@src/repository/MasterDataModel';
import { getError } from '@src/auth/getError';
import UILoader from '@src/@core/components/ui-loader';
import FormKaryawan from './FormKaryawan';

const DetailKaryawan = () => {
    const queryClient = useQueryClient();
    const [block, setBlock] = useState(false);
    const location = useLocation();

    const paramQuery = () => {
        if (location.state) {
            // setIsUpdate(true);
            return location.state.id_karyawan;
        } else {
            // setIsUpdate(false);
            return '';
        }
    };

    const getDataKaryawan = () => {
        if (paramQuery()) {
            return api.getData(`karyawans/${paramQuery()}`).then((r: any) => {
                return r.data.result;
            });
        } else {
            return null;
        }
    };

    const queryDetail = useQuery([`detail-form-karyawan`, paramQuery()], () => getDataKaryawan(), {
        refetchOnWindowFocus: false
    });

    if (queryDetail.isError) {
        getError(queryDetail.error);
    }

    return (
        <>
            <Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Detail Karyawan"
                    breadCrumbParent="Master"
                    breadCrumbParent2="Karyawan"
                    breadCrumbActive="Detail Karyawan"
                />
                <Row>
                    {paramQuery() ? (
                        <>
                            <Col lg="12" className="px-0 pt-1">
                                <UILoader blocking={queryDetail.isLoading}>
                                    {queryDetail.isLoading ? (
                                        <LoadingSegment message="Loading" />
                                    ) : queryDetail.isError ? (
                                        <LoadingSegment message="Terjadi Kesalahan" />
                                    ) : queryDetail.data !== null ? (
                                        <>
                                            <Row>
                                                <Col lg="12">
                                                    <FormKaryawan id_karyawan={paramQuery()} dataKaryawan={queryDetail.data} />
                                                </Col>
                                            </Row>
                                        </>
                                    ) : (
                                        <LoadingSegment message="Data tidak ditemukan" />
                                    )}
                                </UILoader>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col lg="12">
                                <FormKaryawan id_karyawan={paramQuery()}></FormKaryawan>
                            </Col>
                        </>
                    )}
                </Row>
            </Fragment>
        </>
    );
};

export default DetailKaryawan;
