// ** Logo
import logo from '@src/assets/images/logo-kehadiran.jpg';

const SpinnerComponent = () => {
    return (
        <div className="fallback-spinner vh-100">
            <img className="fallback-logo" style={{ width: '200px' }} src={logo} alt="logo" />
            <div className="loading">
                <div className="effect-1 effects"></div>
                <div className="effect-2 effects"></div>
                <div className="effect-3 effects"></div>
            </div>
        </div>
    );
};

export default SpinnerComponent;
