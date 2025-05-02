import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function UpcomingReleases() {

    let [upcomingReleases, setUpcomingReleases] = useState([])

    useEffect(() => {
        async function getUpcomingReleases() {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/movies/upcoming")
                if (!response.ok) {
                    throw new Error("Some error occured" + response.status )
                }
                const jsonresponse = await response.json()
                setUpcomingReleases(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getUpcomingReleases()
    }, [])
    
    return (
        <>
            <div className="upcoming w-75 my-5 m-auto " id="upcoming">
                <div className="space-mono-bold-italic" id="upcoming">
                    <h3>Upcoming Releases</h3>
                </div>
                <div className="gridContainer w-100 my-3" id="upcomingReleasesContainer">
                    <Container fluid>
                        <Row>
                        {
                        upcomingReleases.map((element, index) => {
                            return (
                                <Col xs={3} key={index}>
                                <Card key={index}>
                                    <Card.Img src={element.moviePoster} />
                                    <Card.Body>
                                        {/* <Card.Title>{element.movieName}</Card.Title> */}
                                        <Card.Text>
                                        {element.movieName} {element.movieReleaseYear}<br />
                                        Directed by : {element.movieDirector} <br />
                                        Movie Studio : {element.movieStudio}
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