import Card from 'react-bootstrap/Card';
import UserCard from './UserCard';
import ReviewCard from './ReviewCard';

export default function UserReviewCard({element, index}) {

    return (
        <>
            <Card className='m-auto my-2 w-100' style={{backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}} key={index} id={element._id}>
                <Card.Body className='UserReviewCard d-flex w-100'>
                    <UserCard userId={element.userId}/>
                    <ReviewCard userReview={element}/>
                </Card.Body>
            </Card>
        </>
    )
}