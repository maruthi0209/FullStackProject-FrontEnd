import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DivInnerCard from './DivInnerCard';
import { Suspense, lazy } from 'react';
const Container = lazy(() => import('react-bootstrap/Container'));

export default function DivContainer({showlist}) {

    return (
        <>
        <Suspense fallback={<div>Loading Component...</div>}>
            <Container fluid >
                <Row className='m-auto'>
                    {
                    showlist?.map((element, index) => {
                        return (
                            <Col key={index} className='my-2 m-auto'>
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