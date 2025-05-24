import { IoIosStarOutline } from "react-icons/io";
import PdfButton from "../Util/JSPDF";
import Card from 'react-bootstrap/Card';

export default function MovieRating({movieAverageRating, favorited}) {

    return(
        <>
            <Card style={{width : "85%", margin : "auto", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)", border : "var(--bg-secondary)"}} className='outerCard my-2 text-end'>
                <Card.Body>
                    {/* <Card.Title className='space-mono-bold'>{movieName}</Card.Title> */}
                    <Card.Text><IoIosStarOutline />{movieAverageRating} / 10</Card.Text>
                    <Card.Text>Favorited by {favorited} people!</Card.Text>
                    <PdfButton />
                </Card.Body>
            </Card>
        </>
    )
}