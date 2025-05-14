import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
import DivInnerCard from './DivInnerCard';

export default function DivContainer({showlist}) {

    return (
        <>
        <Container fluid className='my-2 mx-auto'>
            <Row>
                {
                showlist.map((element, index) => {
                    return (
                        <Col key={index} className='m-auto'>
                        < DivInnerCard displayValue={element}/>
                        </Col>
                    )
                })
                }
            </Row>
        </Container>
        </>
    )
}