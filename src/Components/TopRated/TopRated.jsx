import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TopRated() {

    let [topratedMovies, setTopRatedMovies] = useState([])

    useEffect(() => {
        async function getTopRated() {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/movies/toprated")
                if (!response.ok) {
                    throw new Error("Some error occured" + response.status )
                }
                const jsonresponse = await response.json()
                setTopRatedMovies(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getTopRated()
    }, [])
    
    return (
        <>
            <div className="toprated w-75 my-5 m-auto " id="toprated">
                <div className="space-mono-bold-italic" id="toprated">
                    <h3>Top Rated</h3>
                </div>
                <div className="gridContainer w-100 my-3" id="topRatedContainer">
                    <Container fluid>
                        <Row>
                        {
                        topratedMovies.map((element, index) => {
                            return (
                                <Col xs={3} key={index}>
                                <Card key={index}>
                                    <Card.Img src={element.moviePoster} />
                                    <Card.Body>
                                        {/* <Card.Title>{element.movieName}</Card.Title> */}
                                        <Card.Text>
                                        {element.movieName} {element.movieReleaseYear}<br />
                                        Directed by : {element.movieDirector} <br />
                                        Average Rating : {Math.floor(element.movieAverageRating)}/10
                                        </Card.Text>
                                        {/* <Button variant="primary">Go somewhere</Button> */}
                                    </Card.Body>
                                </Card>
                                </Col>
                            )
                        })
                    }
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}