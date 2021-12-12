// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Third Party Components
import * as Icon from 'react-feather';
// import classnames from 'classnames';
// import Autocomplete from '@components/autocomplete';
import { NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarks, updateBookmarked, handleSearchQuery } from '@store/actions/navbar';
import logo_kehadiran from '../../../../assets/images/logo-kehadiran.jpg';

const NavbarBookmarks = (props) => {
    // ** Props
    const { setMenuVisibility } = props;

    // ** State
    const [value, setValue] = useState('');
    const [openSearch, setOpenSearch] = useState(false);

    // ** Store Vars
    const dispatch = useDispatch();
    const store = useSelector((state) => state.navbar);

    // ** ComponentDidMount
    useEffect(() => {
        dispatch(getBookmarks());
    }, []);


    // ** Removes query in store
    const handleClearQueryInStore = () => dispatch(handleSearchQuery(''));

    // ** Loops through Bookmarks Array to return Bookmarks
    const onKeyDown = (e) => {
        if (e.keyCode === 27 || e.keyCode === 13) {
            setTimeout(() => {
                setOpenSearch(false);
                handleClearQueryInStore();
            }, 1);
        }
    };

    // ** Function to toggle Bookmarks
    const handleBookmarkUpdate = (id) => dispatch(updateBookmarked(id));

    // ** Function to handle Bookmarks visibility
    const handleBookmarkVisibility = () => {
        setOpenSearch(!openSearch);
        setValue('');
        handleClearQueryInStore();
    };

    // ** Function to handle Input change
    const handleInputChange = (e) => {
        setValue(e.target.value);
        dispatch(handleSearchQuery(e.target.value));
    };

    // ** Function to handle external Input click
    const handleExternalClick = () => {
        if (openSearch === true) {
            setOpenSearch(false);
            handleClearQueryInStore();
        }
    };

    // ** Function to clear input value
    const handleClearInput = (setUserInput) => {
        if (!openSearch) {
            setUserInput('');
            handleClearQueryInStore();
        }
    };

    return (
        <Fragment>
            <ul className="nav navbar-nav bookmark-icons">
                <NavItem>
                    <Link to="/" className="navbar-brand">
                        <span className="brand-logo">
                            <img src={logo_kehadiran} style={{ width: '50px' }} alt="logo" />
                        </span>
                    </Link>
                </NavItem>
            </ul>
            <ul className="nav navbar-nav bookmark-icons">
                <li className="nav-item d-none d-lg-block">
                    {/* <span>Presensi Online</span> */}
                </li>
            </ul>
            <ul className="navbar-nav d-xl-none">
                <NavItem className="mobile-menu mr-auto">
                    <NavLink className="nav-menu-main menu-toggle hidden-xs is-active" onClick={() => setMenuVisibility(true)}>
                        <Icon.Menu className="ficon" />
                    </NavLink>
                </NavItem>
            </ul>
        </Fragment>
    );
};

export default NavbarBookmarks;
