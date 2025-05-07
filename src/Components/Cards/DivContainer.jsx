import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function DivContainer({showlist}) {

    return (
        <>
        <Container fluid className='my-2 mx-auto'>
            <Row>
                {
                showlist.map((element, index) => {
                    return (
                        <Col key={index} className='m-auto'>
                        <Card key={index} className='innerCard'>
                            <Card.Img src={element.moviePoster} />
                            <Card.Body>
                                <Card.Text style={{ fontSize : "0.75rem"}}>
                                <b>{element.movieName}</b>, {element.movieReleaseYear} <br />
                                Director : {element.movieDirector}
                                
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    )
                })
                }
            </Row>
        </Container>
        </>
    )
}