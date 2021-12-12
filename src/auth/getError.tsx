// ** JWT Service Import
import { toast } from 'react-toastify';
import Toast from '@src/views/_presensi_online/general/components/Toast';
import ToastWithButton from '@src/views/_presensi_online/general/components/ToastWithButton';
import { getDefaultLogoutAPI, getUserData, getDefaultLogoutUrl, clearStorage } from '@src/utility/Utils';
import useJwt from '@src/auth/jwt/useJwt';
export function getError(response: any) {
    const roleData = getUserData().role;

    if (response.message.includes('Unauthorized')) {
        toast.error(<Toast color="error" title="Error Permission" message={response.message} />, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } else if (response.message.includes('Network Error')) {
        toast.error(<Toast color="error" title="Error Networking" message={'Network Error'} />, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } else if (response.response.data.message.includes('Could not find')) {
        toast.error(<Toast color="error" title="Error Networking" message={'API Tidak ditemukan'} />, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } else if (response.response.data.message.includes('Token sudah tidak berlaku')) {
        const ep = getDefaultLogoutAPI(roleData);
        useJwt.logout(ep);
        toast.error(
            <ToastWithButton
                color="danger"
                title="Error Authentication"
                buttonTitle="Ke Halaman Login"
                message={'Token sudah tidak berlaku, Login kembali menggunakan Akun yang valid'}
                url={getDefaultLogoutUrl(roleData)}
                onClickFunction={() => {
                    window.location.href = getDefaultLogoutUrl(roleData);
                    clearStorage(useJwt.jwtConfig);
                }}
            />,
            {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT,
                onClose: () => {
                    window.location.href = getDefaultLogoutUrl(roleData);
                    clearStorage(useJwt.jwtConfig);
                }
            }
        );
    } else if (response.response.data.message.includes('Token tidak valid')) {
        const ep = getDefaultLogoutAPI(roleData);
        useJwt.logout(ep);
        toast.error(
            <ToastWithButton
                color="danger"
                title="Error Authentication"
                buttonTitle="Ke Halaman Login"
                message={
                    'Token tidak valid. Hal ini bisa terjadi karena sesi login anda tidak valid atau sudah berakhir, Login kembali menggunakan Akun yang valid'
                }
                onClickFunction={() => {
                    window.location.href = getDefaultLogoutUrl(roleData);
                    clearStorage(useJwt.jwtConfig);
                }}
            />,
            {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT,
                onClose: () => {
                    window.location.href = getDefaultLogoutUrl(roleData);
                    clearStorage(useJwt.jwtConfig);
                }
            }
        );
    } else if (response.response.data.message) {
        toast.error(<Toast color="error" title={'Terjadi Error'} message={response.response.data.message} />, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000
        });
    } else {
        toast.error(<Toast color="error" title={'Terjadi Error'} message={response.message} />, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000
        });
    }
}

export const generateErrorForm = (ret: any, setError: any) => {
    Object.entries(ret).map((data: any, key) => {
        setError(data[0], {
            type: 'manual',
            message: data[1][0]
        });
    });
};
