// ** Dropdowns Imports
import UserDropdown from './UserDropdown';
// ** Third Party Components

const NavbarUser = (props: any) => {
    return (
        <ul className="nav navbar-nav align-items-center ml-auto">
            <UserDropdown />
        </ul>
    );
};
export default NavbarUser;
