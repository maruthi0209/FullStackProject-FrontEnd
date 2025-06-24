import { useState, useEffect } from "react"
import MovieReviewCard from "./MovieReviewCard"

export default function UserRelatedReviews({userId}) {

    async function getUserRelatedReviews(userId) {
            try {
                const response = await fetch("https://fullstackproject-backend-1.onrender.com/reviews/userReviews/" + userId
                )
                if(!response.ok) {
                    throw new Error("Error occured " + response.json())
                }
                const jsonResponse = await response.json()
                setUserReviews(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }

    let [reviewUpdated, setReviewUpdated] = useState(false)
    function handleChildUpdate() {
        getUserRelatedReviews(userId)
        console.log("Parent refreshed due to child action!")
    }

    let [userReview, setUserReviews] = useState([])
    useEffect(() => {
        
        getUserRelatedReviews(userId)
    }, [userId, reviewUpdated])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust as needed

    // Calculate paginated data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userReview.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(userReview.length / itemsPerPage);
    
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {userReview && <div className="container m-auto p-2 my-2" style={{width : "80%", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
                {userReview && currentItems.map((element, index) => {
                return (
                        <div className='reviewCard my-2 ' key={index}>
                            <MovieReviewCard element={element} index={index} key={index} style={{width : "75%"}} onUpdate={handleChildUpdate}/>
                        </div>
                    )
                })
                }
                <div className="pagination" style={{display: "flex", marginTop : "20px"}}>
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
            </div>}
        </>
    )
}