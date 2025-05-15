import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DivInnerCard from './DivInnerCard';
import { Suspense, lazy } from 'react';
const Container = lazy(() => import('react-bootstrap/Container'));

export default function DivContainer({showlist}) {

    return (
        <>
        <Suspense fallback={<div>Loading Component...</div>}>
            <Container fluid className='my-2 mx-auto'>
                <Row>
                    {
                    showlist?.map((element, index) => {
                        return (
                            <Col key={index} className='m-auto'>
                            < DivInnerCard displayValue={element}/>
                            </Col>
                        )
                    })
                    }
                </Row>
            </Container>
        </Suspense>
        </>
    )
}