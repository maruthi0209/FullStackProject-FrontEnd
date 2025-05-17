import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ReviewCard from '../Cards/ReviewCard';
import UserCard from '../Cards/UserCard';

export default function MovieReviews({movieId}) {
    
    let [movieReviews, setMovieReviews] = useState([])

    useEffect(() => {
        async function getMovieReviews(movieId) {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/reviews/movieReview/" + movieId)
                if(!response.ok) {
                    throw new Error("An error occured " + response.json())
                }
                const jsonResponse = await response.json()
                setMovieReviews(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getMovieReviews(movieId)
    }, [movieId])

    return (
        <>
            <Card className="container rounded m-auto my-2 space-mono-regular" style={{width : "80%"}}>
                <Card.Body>
                    {movieReviews && movieReviews?.map((element, index) => {
                        return (
                                <Card className='m-auto my-2 w-100' key={index} id={element._id}>
                                    <Card.Body className='d-flex flex-row'>
                                        <UserCard userId={element.userId}/>
                                        <ReviewCard userReview={element}/>
                                    </Card.Body>
                                </Card>
                        )
                    })}
                </Card.Body>
            </Card>
        </>
    )
}