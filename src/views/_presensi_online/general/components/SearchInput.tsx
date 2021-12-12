import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Col, Input, Row } from 'reactstrap';

const ViewSearchButton = (props: any) => {
    const intl = useIntl();

    const putToInput = async (e: any, callback: any) => {
        callback(e.target.value);
    };

    const defaultTimer = 400;
    const [timer, setTimer] = useState(defaultTimer);
    const HandleSearch = async (e: any, callback: any) => {
        if (e !== '') {
            clearTimeout(timer);
            setTimer(
                window.setTimeout(async () => {
                    await putToInput(e, callback);
                }, defaultTimer)
            );
        }
    };

    const { keyCallback }: any = props;
    return (
        <Row className="justify-content-end">
            <Col className="mb-1 pl-3-5 pr-3-5" lg="5" md="5">
                <Input
                    placeholder={intl.formatMessage({ id: 'Cari Data' })}
                    onChange={(e) => {
                        HandleSearch(e, keyCallback);
                    }}
                />
            </Col>
        </Row>
    );
};

export default ViewSearchButton;
