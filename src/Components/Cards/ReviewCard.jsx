import Card from 'react-bootstrap/Card';

export default function ReviewCard({userReview}) {

    return (
        <>
            <Card className='m-auto border border-light' style={{fontSize : "1rem", width : "80%"}}>
                <Card.Body className='text-center'>
                    <Card.Title className="caveat-bold">{userReview.reviewTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted caveat-regular">Rated : {userReview.reviewRating} / 10</Card.Subtitle>
                    <Card.Text className="caveat-regular">
                        {userReview.reviewDescription}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}