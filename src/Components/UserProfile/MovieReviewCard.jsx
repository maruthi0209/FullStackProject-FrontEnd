import Card from 'react-bootstrap/Card';
import ReviewCard from '../../Components/Cards/ReviewCard';
import MovieCard from '../Cards/MovieCard';
import { toast } from 'react-toastify';
import { useState } from 'react';
import FormCard from '../Cards/FormCard';

export default function MovieReviewCard({element, index, onUpdate}) {

    let [updateClicked, setUpdateClicked] = useState(false)

    async function handleDeleteReview(e) {
        // e.preventDefault()
        const loadingToast = toast.loading("Deleting your review...");
        try{
            const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/reviews/delete/" + element._id, {
                        method : "DELETE"
                    })
            if(!response.ok) {
                throw new Error("Error occured " + response.json())
            }
            const jsonResponse = await response.json()
            onUpdate()
            // toast message
            toast.update(loadingToast, {
            render: "Review deleted successfully", 
            type: "success",
            isLoading: false,
            autoClose: 3000,
                });
        } catch(error) {
            console.log(error.message)
            toast.update(loadingToast, {
            render: `Review deletion failed: ${error.message}`,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            });
        }
    }

    function handleUpdateReview(e) {
        setUpdateClicked(true)
        // console.log("update button clicked")
    }

    function hideUpdateFormCard(e) {
        setUpdateClicked(false)
        // console.log("update cancel button clicked")
    }

    return (
        <>
            <Card className=' m-auto my-2 w-100' style={{backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}} key={index} id={element._id}>
                <Card.Body className='MovieReviewCard d-flex'>
                    <MovieCard id={element.movieId} />
                    <ReviewCard userReview={element}/>
                    <div className='d-flex flex-column align-items-center justify-content-center caveat-regular' style={{gap : "20px"}}>
                        {!updateClicked && <button className="btn btn-warning" onClick={handleUpdateReview}>Edit</button>}
                        {updateClicked && <button className='btn btn-secondary' onClick={hideUpdateFormCard}>Close</button>}
                        <button className="btn btn-danger" onClick={handleDeleteReview}>Delete</button>
                        
                    </div>
                </Card.Body>
            </Card>
            { updateClicked &&
                <Card style={{backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
                    <Card.Body>
                            <FormCard movieId={element.movieId} userId={element.userId} update={true} reviewId={element._id} onUpdate={onUpdate}/>
                    </Card.Body>
                </Card>
            }
        </>
    )
}