import { IoIosStarOutline } from "react-icons/io";
import PdfButton from "../Util/JSPDF";
import Card from 'react-bootstrap/Card';

export default function MovieRating({movieAverageRating, favorited}) {

    return(
        <>
            <Card id='movieRating' style={{width : "80%", margin : "auto", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)", border : "var(--bg-secondary)"}} >
                <Card.Body>
                    <Card.Text><IoIosStarOutline />{movieAverageRating} / 10</Card.Text>
                    <Card.Text>Favorited by {favorited} people!</Card.Text>
                    <PdfButton />
                </Card.Body>
            </Card>
        </>
    )
}