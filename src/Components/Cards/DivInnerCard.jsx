import Card from 'react-bootstrap/Card';

export default function DivInnerCard({displayValue}) {

    const imageUrl = `${displayValue.moviePoster}`;
    console.log(imageUrl)
    return (
        <>
            <Card className='innerCard'>
                <Card.Img variant="top" src={imageUrl} alt="Movie Poster"/>
                <Card.Body>
                    <Card.Text style={{ fontSize : "0.75rem"}}>
                    <b>{displayValue.movieName}</b>, {displayValue.movieReleaseYear} <br />
                    Director : {displayValue.movieDirector}           
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}