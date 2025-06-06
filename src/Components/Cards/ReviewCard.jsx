import Card from 'react-bootstrap/Card';

export default function ReviewCard({userReview}) {

    return (
        <>
            <Card className='ReviewCard m-auto border border-light' style={{ width : "80%", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
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