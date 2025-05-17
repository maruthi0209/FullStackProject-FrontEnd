import Card from 'react-bootstrap/Card';
import UserCard from './UserCard';
import ReviewCard from './ReviewCard';

export default function UserReviewCard({element, index}) {

    return (
        <>
            <Card className='m-auto my-2 w-100' key={index} id={element._id}>
                <Card.Body className='d-flex flex-row'>
                    <UserCard userId={element.userId}/>
                    <ReviewCard userReview={element}/>
                </Card.Body>
            </Card>
        </>
    )
}