import Card from 'react-bootstrap/Card';

export default function DivInnerCard({displayValue}) {

    const imageUrl = `${displayValue.moviePoster}`;
    return (
        <>
            <Card className='innerCard'>
                <Card.Img variant="top" src={imageUrl} alt="Movie Poster" style={{objectFit : "cover", width : "100%", display : "block"}}/>
                <Card.Body className='space-mono-regular'>
                    <Card.Text style={{ fontSize : "0.75rem"}}>
                    <b>{displayValue.movieName}</b> {displayValue.movieReleaseYear} <br />
                    Director : {displayValue.movieDirector}           
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}