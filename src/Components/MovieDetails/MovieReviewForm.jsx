import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
// import {jwt_decode} from 'jwt-decode';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import decodeToken from '../Util/GetUserIdFromEmail2';
import { Link } from "react-router-dom"

export default function MovieReviewForm() {

    const [user, setUser] = useState(null);
    let [value, setValue] = useState(5);

    const token = localStorage.getItem('userToken');

    useEffect(() => {   
        let isMounted = true;   
        const fetchUser = async () => {
            try {
                const userData = await decodeToken();
            if (isMounted && userData) { // Check mount state
                setUser(userData);
                }
            } catch (error) {
                if (isMounted) {
                setError(error.message);
                }
            }
        };

        fetchUser();

  return () => {
    isMounted = false; // Cleanup function
  };
    }, [])

    const { id } = useParams();

    function handleReviewSubmit(formData) {
        let newReview = {};
        newReview.movieId = id;
        newReview.userId = user;
        newReview.reviewTitle = formData.get("reviewTitle")
        newReview.reviewDescription = formData.get("reviewDescription")
        newReview.reviewRating = value;
        newReview.reviewLikes = 0
        newReview.reviewLocation = " "
        submitReviewData(newReview)
    }

    async function submitReviewData(newReview) {
        const loadingToast = toast.loading("Submitting your review...");
        try {
            const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/reviews/create", {
                    method : "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    },
                    body: JSON.stringify(newReview)
                }) 
            if(!response.ok) {
                throw new Error("Error occured " + response.json())
            }
            const jsonResponse = await response.json()
            toast.update(loadingToast, {
            render: "Review submitted successfully" + jsonResponse,
            type: "success",
            isLoading: false,
            autoClose: 3000,
                });    
        } catch (error) {
            console.log(error.message)
            toast.update(loadingToast, {
            render: "Review submission failed " + error.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
                });
        }
    }

    return (
        <>
            {token &&<Card className='m-auto my-2 w-100 m-auto'>
                <Card.Body className='d-flex flex-row'>
                    {/* <Card.Title>Write your review </Card.Title><br /> */}
                    <Form className='w-100 caveat-regular' style={{fontSize : "1rem"}} action={handleReviewSubmit}>
                        <Form.Group className="mb-3" controlId="reviewTitle" >
                            <Form.Label>Your review </Form.Label>
                            <Form.Control type="text" name="reviewTitle" placeholder="Eg. Amazing or Needs improvement" />
                        </Form.Group>
                        <FloatingLabel className="mb-3"  controlId="reviewDescription" label="Review description (word limit - 2000)">
                            {/* <Form.Label htmlFor="reviewDescription">Review description (word limit - 2000)</Form.Label> */}
                            <Form.Control as="textarea" name="reviewDescription" placeholder="Type your detailed review here" style={{ height: '100px' }} />
                        </FloatingLabel>
                        {/* <Form.Label>Range</Form.Label>
                            <Form.Range min={0} max={10} step={1}/> */}
                            <Form.Label>
                                Rating : (Range: {0}-{10}, Step: {1})
                            </Form.Label>
                            <Form.Group className="mb-3">
                            <Row className="align-items-center">
                                <Col xs={1} className="text-center">
                                {0}
                                </Col>
                                <Col>
                                <Form.Range
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                </Col>
                                <Col xs={1} className="text-center">
                                {10}
                                </Col>
                            </Row>
                            
                            <div className="d-flex justify-content-between mt-1">
                                <small>Min</small>
                                <small>Current: {value}</small>
                                <small>Max</small>
                            </div>
                            </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>}
            {
                !token && <Card className='m-auto my-2 w-100 m-auto'>
                    <Card.Body className='d-flex flex-row justify-content-center align-items-center' style={{gap : "20px"}}>
                        <Card.Text>Login to write your review </Card.Text><br />
                        <Card.Text><Link to="/login"><Button>Login</Button></Link></Card.Text>
                    </Card.Body>
                </Card>
            }
        </>
    )
}