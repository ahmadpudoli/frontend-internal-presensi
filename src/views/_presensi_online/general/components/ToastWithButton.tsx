import { Fragment } from 'react';
import { Bell, Check, X, AlertTriangle, Info } from 'react-feather';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const ToastWithButton = ({ color, title, message, buttonTitle, onClickFunction }: any) => {
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
            <div className="text-right">
                <Button
                    onClick={() => {
                        onClickFunction();
                    }}
                    size={'sm'}
                    color={color}
                >
                    {buttonTitle}
                </Button>
            </div>
        </Fragment>
    );
};

export default ToastWithButton;
