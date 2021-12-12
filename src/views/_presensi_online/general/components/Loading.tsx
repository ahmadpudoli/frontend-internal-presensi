import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

export const LoadingSegment = (props: any) => {
    const { message } = props;
    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Proses Data</CardTitle>
            </CardHeader>
            <CardBody>{message}</CardBody>
        </Card>
    );
};
