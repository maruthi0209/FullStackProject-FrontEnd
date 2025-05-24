import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

export default function DivInnerCard({displayValue}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/moviedetails/${displayValue._id}`); // movie._id passed in URL
    };

    const imageUrl = `${displayValue.moviePoster}`;
    return (
        <>
            <Card className='innerCard' onClick={handleClick} style={{cursor: "pointer", overflow: "hidden", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
                <Card.Img 
                    variant="top" 
                    src={imageUrl} 
                    alt="Movie Poster" 
                    style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    aspectRatio: "2/3",
                    display: "block"
                    }}
                />
                <Card.Body className='space-mono-regular'>
                    <Card.Text style={{ fontSize: "0.75rem" }}>
                    <b>{displayValue.movieName}</b> {displayValue.movieReleaseYear} <br />
                    Director : {displayValue.movieDirector}           
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}