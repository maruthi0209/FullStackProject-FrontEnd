import { GoClock } from "react-icons/go";
import Card from 'react-bootstrap/Card';

export default function MovieName({movieName, movieReleaseYear, movieRunningTimeInMinutes}) {

    return (
        <>
            <Card id='movieName' style={{width : "80%", margin : "auto", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)", border : "var(--bg-secondary)"}}>
                <Card.Body>
                    <Card.Title className='space-mono-bold'>{movieName}</Card.Title>
                    <Card.Text>Year : {movieReleaseYear}</Card.Text>
                    <Card.Text><GoClock /> {movieRunningTimeInMinutes} minutes</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}