import { Fragment } from 'react';
import { Spinner, CardText } from 'reactstrap';

export const LoaderView = () => {
    return (
        <Fragment>
            <Spinner />
            <CardText className="mb-0 mt-3 text-white">Please Wait...</CardText>
        </Fragment>
    );
};
