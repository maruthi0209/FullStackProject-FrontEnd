import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function DivCard({title, list, idname}) {

    return (
       <>
        <Card style={{width : "75%", margin : "auto"}} className='outerCard my-4' id={idname}>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            {/* <Card.Text> */}
                <Container fluid>
                    <Row>
                        {
                        list.map((element, index) => {
                            return (
                                <Col xs={2} key={index} className='m-auto'>
                                <Card key={index} className='innerCard'>
                                    <Card.Img src={element.moviePoster} />
                                    <Card.Body>
                                        <Card.Text>
                                        {element.movieName} {element.movieReleaseYear}
                                        Directed by : {element.movieDirector}
                                        
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Container>
            {/* </Card.Text>     */}
        </Card.Body>
        </Card>
       </> 
    )
}