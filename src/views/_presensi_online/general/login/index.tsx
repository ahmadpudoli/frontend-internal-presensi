import { useState, useContext, Fragment } from 'react';
import classnames from 'classnames';
import { useSkin } from '@hooks/useSkin';
import useJwt from '@src/auth/jwt/useJwt';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { handleLogin } from '@store/actions/auth';
import { AbilityContext } from '@src/utility/context/Can';
import { Link, useHistory } from 'react-router-dom';
// import InputPasswordToggle from '@components/input-password-toggle';
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils';
import { Row, Col, CardTitle, CardText, Form, Input, FormGroup, Label, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import Toast from '@src/views/_presensi_online/general/components/Toast';
import UILoader from '@components/ui-loader';
import '@styles/base/pages/page-auth.scss';
import { FormattedMessage } from 'react-intl';
import { roleUserInternalEnum } from '../../../../repository/PresensiOnlineDataModel';

const LoginInternal = () => {
    const [block, setBlock] = useState(false);
    const [skin, setSkin] = useSkin();
    const ability = useContext(AbilityContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const [idPengguna, setIdPengguna] = useState('');
    const [password, setPassword] = useState('');

    const { register, errors, handleSubmit } = useForm();
    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default;

    const setAbility = (roles: any) => {
        const listAbility: any[] = [];
        if (roles.includes(roleUserInternalEnum.ADMIN)) {
            listAbility.push({
                action: 'read',
                subject: 'ADMIN'
            });
        }

        return listAbility;
    };
    const onSubmit = async () => {
        if (isObjEmpty(errors)) {
            setBlock(true);
            await useJwt
                .loginInternal({ username: idPengguna, password })
                .then((res: { data: { result: any; accessToken: any; refreshToken: any } }) => {

                    if (res.data.result.role !== 'admin') {
                        throw new Error("Anda tidak memiliki hak akses untuk mengakses aplikasi ini");
                    }

                    console.log(res.data.result);
                    const listAbility = setAbility(
                        res.data.result.role.split('|').filter(function (el: any) {
                            return el !== '';
                        })
                    );
                    const dt = new Date();
                    dt.setHours(dt.getHours() + 2);

                    const dt_login = {
                        id: idPengguna,
                        nama: "",
                        username: idPengguna,
                        avatar: require('@src/assets/images/portrait/small/avatar-s-11.jpg').default,
                        nip: "",
                        jabatan: "",
                        roles: res.data.result.role.split('|').filter(function (el: any) {
                            return el !== '';
                        }),
                        role: 'admin',
                        ability: listAbility,
                        expired: dt
                    };
                    const data = { ...dt_login, accessToken: res.data.result.token, refreshToken: res.data.result.token };
                    dispatch(handleLogin(data));
                    //ability.update(listAbility);
                    ability.update([{ action: 'manage', subject: 'all' }]); // Ambil data src\@fake-db\jwt\index.js
                    window.location.href = getHomeRouteForLoggedInUser(data.role);
                    // history.push(getHomeRouteForLoggedInUser(data.role));
                })
                .catch((err: any) => {
                     console.log(err);
                    if (err.response !== undefined) {
                        toast.error(<Toast color="danger" title={'Login Gagal'} message={err.response.data.message} />, {
                            autoClose: 10000,
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    } else {
                        toast.error(<Toast color="danger" title={'Login Gagal'} message={err.message} />, {
                            autoClose: 10000,
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    }
                    
                });
            setBlock(false);
        }
    };

    return (
        <div className="auth-wrapper auth-v2">
            <Row className="auth-inner m-0">
                <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                    <h2 className="brand-text text-primary ml-1">Presensi Online</h2>
                </Link>
                <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                        <img className="img-fluid" src={source} alt="Login" />
                    </div>
                </Col>
                <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
                    <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                        <CardTitle tag="h2" className="font-weight-bold mb-1">
                            <FormattedMessage id="Halaman Login Internal" />
                        </CardTitle>
                        <CardText className="mb-2">
                            <FormattedMessage id="Silahkan login dengan menggunakan id pengguna yang telah diberikan" />
                        </CardText>
                        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className="form-label" for="login-email">
                                    Username
                                </Label>
                                <Input
                                    autoFocus
                                    type="text"
                                    tabIndex={1}
                                    required
                                    // value={idPengguna}
                                    id="login-email"
                                    name="login-email"
                                    placeholder="ID Pengguna"
                                    onChange={(e: any) => setIdPengguna(e.target.value)}
                                    className={classnames({ 'is-invalid': errors['login-email'] })}
                                    innerRef={register({ required: true, validate: (value) => value !== '' })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <div className="d-flex justify-content-between">
                                    <Label className="form-label" for="login-password">
                                        Password
                                    </Label>
                                </div>
                                <Input
                                    autoFocus
                                    type="password"
                                    tabIndex={2}
                                    required
                                    // value={password}
                                    id="login-password"
                                    name="login-password"
                                    placeholder="Password"
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    className={classnames({ 'is-invalid': errors['login-password'] })}
                                    innerRef={register({ required: true, validate: (value) => value !== '' })}
                                />
                                {/* 
                                <InputPasswordToggle
                                    value={password}
                                    id="login-password"
                                    name="login-password"
                                    className="input-group-merge"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={classnames({ 'is-invalid': errors['login-password'] })}
                                    innerRef={register({ required: true, validate: (value) => value !== '' })}
                                /> */}
                            </FormGroup>
                            <UILoader blocking={block}>
                                <Button type="submit" color="primary" tabIndex={3} block>
                                    Sign In
                                </Button>
                            </UILoader>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default LoginInternal;
