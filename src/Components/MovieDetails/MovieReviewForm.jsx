import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
// import {jwt_decode} from 'jwt-decode';
const {jwtDecode} = await import('jwt-decode')

export default function MovieReviewForm() {

    const [userEmails, setUserEmails] = useState([])
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getAllUsers() {
            try {
                let response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/allUsers")
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                let jsonresponse = await response.json()
                setUserEmails(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }      
        }

        function decodeToken(){
            const token = localStorage.getItem('userToken');
            if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded)
                setUser(decoded);
            } catch (error) {
                console.error('Invalid token:', error);
            }
            } else {
                setUser(null)
            }
        }

        getAllUsers()
        decodeToken()
    }, [])

    const { id } = useParams();
    function handleReviewSubmit(formData) {
        let newReview = {};
        newReview.movieId = id;
        newReview.userId = user;

    }

    return (
        <>
            <Card className='m-auto my-2 w-100 m-auto'>
                <Card.Body className='d-flex flex-row'>
                    {/* <Card.Title>Write your review </Card.Title><br /> */}
                    <Form className='w-100 caveat-regular' style={{fontSize : "1.25rem"}} action={handleReviewSubmit}>
                        <Form.Group className="mb-3" controlId="reviewTitle">
                            <Form.Label>Your review title</Form.Label>
                            <Form.Control type="text" placeholder="Eg. Amazing or Needs improvement" />
                        </Form.Group>
                        <FloatingLabel className="mb-3" controlId="reviewDescription" label="Review description (word limit - 2000)">
                            {/* <Form.Label htmlFor="reviewDescription">Review description (word limit - 2000)</Form.Label> */}
                            <Form.Control as="textarea" placeholder="Type your detailed review here" style={{ height: '100px' }} />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}