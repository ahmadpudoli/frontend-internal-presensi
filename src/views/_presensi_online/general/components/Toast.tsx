import { Fragment } from 'react';
import { Bell, Check, X, AlertTriangle, Info } from 'react-feather';

const ToastTypes = ({ color, title, message }: any) => {
    return (
        <Fragment>
            <div className="toastify-header">
                <div className="title-wrapper">
                    <Bell size={12} />
                    <h6 className="toast-title">{title}</h6>
                </div>
            </div>
            <div className="toastify-body">
                <span role="img" aria-label="toast-text">
                    {message}
                </span>
            </div>
        </Fragment>
    );
};

export default ToastTypes;
