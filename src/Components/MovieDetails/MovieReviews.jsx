import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import UserReviewCard from '../Cards/UserReviewCard';
import MovieBarChart from './MovieBarChart';

export default function MovieReviews({movieId}) {
    
    let [movieReviews, setMovieReviews] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust as needed

    // Calculate paginated data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movieReviews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(movieReviews.length / itemsPerPage);
    
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <div className='barChart w-50 my-2 m-auto'>
                        {movieId && < MovieBarChart id={movieId} />}
                    </div>
                    <div className='reviews'>
                        {movieReviews && currentItems.map((element, index) => {
                        return (
                                <div className='reviewCard' key={index}>
                                    <UserReviewCard element={element} index={index} key={index}/>
                                </div>
                            )
                        })
                    }
                        <div className="pagination" style={{display: "flex", gap: "8px", marginTop : "20px"}}>
                            <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            >
                            Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                            ))}

                            <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            >
                            Next
                            </button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}