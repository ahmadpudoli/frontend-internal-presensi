// ** React Imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Utils
import { getDefaultLogoutAPI, isUserLoggedIn } from '@utils';

// ** Store & Actions
import { useDispatch } from 'react-redux';
import { handleLogout } from '@store/actions/auth';

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { User, Settings, Power } from 'react-feather';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import useJwt from '@src/auth/jwt/useJwt';
import { async } from 'react-select/async';
const UserDropdown = () => {
    // ** Store Vars
    const dispatch = useDispatch();

    // ** State
    const [userData, setUserData] = useState(null);

    //** ComponentDidMount
    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')));
        }
    }, []);

    //** Vars
    const userAvatar = (userData && userData.avatar) || defaultAvatar;

    const userDataDefault = (userData && userData.role) || '';
    let urlReturnToLogin = '/login';
    const dataInfo = () => {
        urlReturnToLogin = '/loginInternal';
        return (
            <>
                <span className="user-name font-weight-bold">
                    {(userData && userData['nama']) || 'Nama Pengguna'} - {'Internal'}
                </span>
            </>
        );
        
    };

    const logout = function() {
        // TODO: Benerin Logout
        // await useJwt.logout(getDefaultLogoutAPI(userData.role));
        // console.log('logout cuy');
        dispatch(handleLogout());
    };

    // const logout = async () => {
    //     // TODO: Benerin Logout
    //     // await useJwt.logout(getDefaultLogoutAPI(userData.role));
    //     // console.log('logout cuy');
    //     dispatch(handleLogout());
    // };

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
                <div className="user-nav d-sm-flex d-none">{dataInfo()}</div>
                <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem tag={Link} to="#">
                    <User size={14} className="mr-75" />
                    <span className="align-middle">Profile</span>
                </DropdownItem>
                <DropdownItem tag={Link} to={urlReturnToLogin} onClick={() => logout()}>
                    <Power size={14} className="mr-75" />
                    <span className="align-middle">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserDropdown;
