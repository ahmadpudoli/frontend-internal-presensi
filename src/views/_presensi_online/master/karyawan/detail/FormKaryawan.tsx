import { useState, Fragment, useEffect } from 'react';
import { X } from 'react-feather';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Input,
    Label,
    Form,
    FormFeedback,
    CardText,
    Col,
    Row,
    Card,
    CardBody,
    CardHeader,
    CardTitle
} from 'reactstrap';

import api from '@src/auth/api/useAPI';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import UILoader from '@components/ui-loader';
import Spinner from '@components/spinner/Loading-spinner';
import { toast } from 'react-toastify';
import Toast from '@src/views/_presensi_online/general/components/Toast';
import { getError, generateErrorForm } from '@src/auth/getError';
import { useHistory, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Select from 'react-select';

// import async from 'react-select/async';
type FormDataProps = {
    id_karyawan?: string;
    nip?: string;
    nama_karyawan?: string;
    alamat_karyawan?: string;
    no_hp?: string;
    jenis_kelamin?:string;
    email?:string;
    username?:string;
    password?:string;
    password_confirm?:string;
    role?:string;
    with_user?:boolean;
    jabatan?: string;
};


const FormKaryawan = (props: any) => {
    const { id_karyawan, dataKaryawan } = props;
    const data_id_karyawan = id_karyawan;
    const history = useHistory();
    // TODO: jenis naskah get data, cukup dari list aja kirim ke inputan
    // console.log(isUpdate);
    // console.log(id_ruang_lingkup);
    const location = useLocation();
    const queryClient = useQueryClient();
    const [block, setBlock] = useState(false);
    const [jenisKelamin, setJenisKelamin] = useState('L');    
    const [withUser, setWithUser] = useState(false);
    const [roleSelect, setRole] = useState('');
    const [jabatanSelect, setJabatan] = useState('');
    const labelJudul = `Tambah Karyawan`;

    //===================
    const submitData = async (data: FormDataProps) => {
        const dataSubmit: FormDataProps = {
            nip:data.nip,
            nama_karyawan:data.nama_karyawan,
            alamat_karyawan:data.alamat_karyawan,
            no_hp: data.no_hp,
            jenis_kelamin : jenisKelamin,
            email: data.email,
            username: data.username,
            password: data.password,
            password_confirm: data.password_confirm,
            role: roleSelect,
            with_user: withUser,
            jabatan: jabatanSelect
        };
        if (id_karyawan !== '') {
            return await api.putData(`karyawans/${id_karyawan}`, dataSubmit).then((r) => {
                return r.data;
            });
        } else {
            return await api.postData(`karyawans`, dataSubmit).then((r) => {
                return r.data;
            });
        }
    };

    // const validate
    const objValidateFormWithUser = {
        // nip: yup.string().required('Username harus diisi.')
        nip: yup.string().required().length(6),
        nama_karyawan: yup.string().required().max(100),
        alamat_karyawan: yup.string().min(6).max(15),
        jenisKelamin: yup.string().required,
        jenis_kelamin: yup.string().when('jenisKelamin', {
                            is: true,
                            then: yup.string().required("Jenis kelamin is required")
                        }),
        no_hp: yup.string().min(6).max(15),
        email: yup.string().email().required().max(50),        
        username: yup.string().required().max(20),     
        password: yup.string().required().max(20),     
        password_confirm:  yup.string()
            .oneOf([yup.ref('password'), null], "sdfdsfsdafs")
            .required('Password confirm is required')
    };
    const objValidateForm = {
        // nip: yup.string().required('Username harus diisi.')
        nip: yup.string().required().length(6),
        nama_karyawan: yup.string().required().max(100),
        alamat_karyawan: yup.string().min(6).max(15),
        jenis_kelamin: yup.string().length(1),
        no_hp: yup.string().min(6).max(15),
        email: yup.string().email().required().max(50)
    };

    // tidak menggunakan ini, karena pada handle submit kita cast menggunakan antara objValidateFormWithUser atau objValidateForm
    // const SubmitProfileSchema = yup.object().shape({
    //     nip: yup.string().required().length(6),
    //     nama_karyawan: yup.string().required().max(100),
    // });
    
    const { handleSubmit, errors, register, reset, clearErrors, setError, setValue } = useForm<FormDataProps>({
        resolver: yupResolver((withUser ? yup.object().shape(objValidateForm) : yup.object().shape(objValidateForm)))
    });

    //react query mutation
    const mutation = useMutation(submitData, {
        onMutate: async (_newMessage) => {
            setBlock(true);
        },
        onSettled: async (_dataRespon, _error: any) => {
            //setBlock(false);
        },
        onError: async (error, _variables, _context) => {
            getError(error);
            if (error.response.data.result) {
                generateErrorForm(error.response.data.result, setError);
            }
            setBlock(false);
        },
        onSuccess: async (ret) => {
            clearErrors();
            // console.log(ret.result.id_jenis_naskah);
            if (id_karyawan === '') {
                reset();

                history.push('/master/karyawan', { });
            }
            //refetch ulang query ke API
            queryClient.removeQueries('detail-form-karyawan');
            await queryClient.invalidateQueries('list-master-karyawan');
            toast.success(<Toast color="success" title="Berhasil" message="Berhasil Menyimpan Data Karyawan" />, {
                position: toast.POSITION.BOTTOM_RIGHT,
                hideProgressBar: true
            });
            history.push('/master/karyawan', { });
        }
    });

    const onSubmit = async (data: FormDataProps) => {
        mutation.mutate(data);
    };

    console.log(dataKaryawan);
    useEffect(() => {
        if (id_karyawan !== '') {
            setValue('nip', dataKaryawan.nip || '');
            setValue('nama_karyawan', dataKaryawan.nama_karyawan || '');
            setValue('jenis_kelamin', dataKaryawan.jenis_kelamin || '');
            setValue('alamat_karyawan', dataKaryawan.alamat_karyawan || '');
            setValue('no_hp', dataKaryawan.no_hp || '');
            setValue('email', dataKaryawan.email || '');
            setValue('username',  (dataKaryawan.user ? dataKaryawan.user.username : '') || '');
            setValue('role', (dataKaryawan.user ? dataKaryawan.user.role : '') || '');
            setValue('jabatan', (dataKaryawan.jabatan ? dataKaryawan.jabatan : '') || '');
            setJenisKelamin(dataKaryawan.jenis_kelamin || '');
            setJabatan(dataKaryawan.jabatan || '')
        } 
    }, [id_karyawan]);

    const default_list_role = [
        { value: '', label: 'Pilih Role' },
        { value: 'admin', label: 'Administrator' },
        { value: 'user-biasa', label: 'User Biasa' }
    ];

    const default_list_jabatan = [
        { value: '', label: 'Pilih Jabatan' },
        { value: 'Kepala HRD', label: 'Kepala HRD' },
        { value: 'IT Manager', label: 'IT Manager' },
        { value: 'Kepala Divisi IT', label: 'Kepala Divisi IT' }
    ];

    const defaultValueJabatan = {value:'', label: 'Pilih Jabatan'}
    for (let i = 0; i < default_list_jabatan.length; i++) {
        if (default_list_jabatan[i].value === jabatanSelect) {
            defaultValueJabatan.value = default_list_jabatan[i].value;
            defaultValueJabatan.label = default_list_jabatan[i].label;            
            break;
        }
    }
   
    console.log('fdfd');
    console.log(defaultValueJabatan);

    // console.log(jabatanSelect);

    const viewUser = (withUser: boolean) => {
        const showSelectUser = withUser ? 'd-none' : '';
        const showUser = withUser ? '' : 'd-none';
        // console.log('aksess');
        return (
            <>
                <div className={showUser}>
                    <div className="divider">
                        <div className="divider-text">Data User Akses</div>
                    </div>
                    <FormGroup row>
                        <Label sm="3" for="Role">
                            Pilih Role Pengguna
                        </Label>
                        <Col sm="9">
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                // defaultValue={renderData(query.data)[0] || ''}
                                options={default_list_role}
                                isClearable={false}                                
                                defaultValue={{label: "Pilih Role", value: ''} }
                                onChange={(e) => {
                                    if (e) {
                                        setRole(e.value);
                                    }
                                }}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm="3" for="Username">
                            <FormattedMessage id="Username" />
                        </Label>
                        <Col sm="9">
                            <Input
                                type="text"
                                placeholder="Username"
                                name="username"
                                innerRef={register({ required: true })}
                                invalid={errors.username && true}
                            />
                            {errors && errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm="3" for="Password">
                            <FormattedMessage id="Password" />
                        </Label>
                        <Col sm="9">
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                innerRef={register({ required: true })}
                                invalid={errors.password && true}
                            />
                            {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm="3" for="Konfirmasi Password">
                            <FormattedMessage id="Konfirmasi Password" />
                        </Label>
                        <Col sm="9">
                            <Input
                                type="password"
                                placeholder="Konfirmasi Password"
                                name="password_confirm"
                                innerRef={register({ required: true })}
                                invalid={errors.password_confirm && true}
                            />
                            {errors && errors.password_confirm && <FormFeedback>{errors.password_confirm.message}</FormFeedback>}
                        </Col>
                    </FormGroup>

                    
                </div>
            </>
        );
    };

    return (
        <Row>
            <Col lg="12">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">
                            <FormattedMessage id="Detail Karyawan"></FormattedMessage>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <UILoader blocking={block}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup row>
                                    <Label sm="3" for="nip">
                                        NIP
                                    </Label>
                                    <Col sm="9">
                                        <Input
                                            type="text"
                                            rows="3"
                                            placeholder="NIP"
                                            name="nip"
                                            innerRef={register({ required: true })}
                                            invalid={errors.nip && true}
                                            // disabled={readOnlyInput}
                                        />
                                        {errors && errors.nip && <FormFeedback>{errors.nip.message}</FormFeedback>}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm="3" for="nama_karyawan">
                                        Nama Karyawan
                                    </Label>
                                    <Col sm="9">
                                        <Input
                                            type="text"
                                            rows="3"
                                            placeholder="Nama Karyawan"
                                            name="nama_karyawan"
                                            innerRef={register({ required: true })}
                                            invalid={errors.nama_karyawan && true}
                                            // disabled={readOnlyInput}
                                        />
                                        {errors && errors.nama_karyawan && <FormFeedback>{errors.nama_karyawan.message}</FormFeedback>}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm="3" for="Jabatan">
                                        Pilih Jabatan
                                    </Label>
                                    <Col sm="9">
                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            // defaultValue={renderData(query.data)[0] || ''}
                                            options={default_list_jabatan}
                                            isClearable={true}        
                                            defaultValue={defaultValueJabatan}
                                            onChange={(e) => {
                                                if (e) {
                                                    setJabatan(e.value);
                                                }
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm="3" for="alamat_karyawan">
                                        Alamat Karyawan
                                    </Label>
                                    <Col sm="9">
                                        <Input
                                            type="textarea"
                                            rows="3"
                                            placeholder="Alamat Karyawan"
                                            name="alamat_karyawan"
                                            innerRef={register({ required: true })}
                                            invalid={errors.alamat_karyawan && true}
                                        />
                                        {errors && errors.alamat_karyawan && <FormFeedback>{errors.alamat_karyawan.message}</FormFeedback>}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm="3" for='jenis_kelamin'>Jenis Kelamin</Label>
                                    <Col sm="9" className="pt-50">
                                        <FormGroup check inline className="mr-2">
                                            <Label check>
                                                <Input
                                                    // disabled={isDraft}
                                                    onClick={() => {
                                                        setJenisKelamin("L");
                                                    }}
                                                    type="radio"
                                                    name="jenis_kelamin"                                                    
                                                    defaultChecked={ (dataKaryawan === undefined) ||  (dataKaryawan && dataKaryawan.jenis_kelamin === 'L')}
                                                />
                                                <strong>Laki-laki</strong>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    onClick={() => {
                                                        setJenisKelamin("W");
                                                    }}
                                                    name="jenis_kelamin"
                                                    defaultChecked={dataKaryawan && dataKaryawan.jenis_kelamin !== 'L'}
                                                />
                                                Wanita
                                            </Label>
                                        </FormGroup>
                                        {errors && errors.jenis_kelamin && <FormFeedback>{errors.jenis_kelamin.message}</FormFeedback>}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm="3" for="no_hp">
                                        No. HP
                                    </Label>
                                    <Col sm="9">
                                        <Input
                                            type="text"
                                            rows="3"
                                            placeholder="Nomor HP"
                                            name="no_hp"
                                            innerRef={register({ required: true })}
                                            invalid={errors.no_hp && true}
                                            // disabled={readOnlyInput}
                                        />
                                        {errors && errors.no_hp && <FormFeedback>{errors.no_hp.message}</FormFeedback>}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm="3" for="email">
                                        Email
                                    </Label>
                                    <Col sm="9">
                                        <Input
                                            type="text"
                                            rows="3"
                                            placeholder="Email "
                                            name="email"
                                            innerRef={register({ required: true })}
                                            invalid={errors.email && true}
                                            // disabled={readOnlyInput}
                                        />
                                        {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm="3" for="instansiIcon">
                                        Simpan Juga Data User ?
                                    </Label>
                                    <Col sm="9" className="pt-05">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input
                                                    onClick={() => {
                                                        setWithUser(false);
                                                    }}
                                                    type="radio"
                                                    name="with_user"
                                                    defaultChecked={true}
                                                />
                                                Tanpa mengubah data user
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    onClick={() => {
                                                        setWithUser(true);
                                                    }}
                                                    name="with_user"
                                                    defaultChecked={false}
                                                />
                                                Dengan menggunakan user
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                {viewUser(withUser)}
                                <Row>
                                    <Col className="text-right">
                                        <Button className="mr-1" color="primary">
                                            {id_karyawan !== '' ? 'Update' : 'Submit'}
                                        </Button>
                                        <Button
                                            color="secondary"
                                            onClick={() => {
                                                history.push('/master/karyawan');
                                            }}
                                            outline
                                        >
                                            Kembali ke List Karyawan
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </UILoader>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default FormKaryawan;
