import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function UserUpdateCard({userInfo, userEmails}) {

    let [validEmail, setValidEmail] = useState(true)
    let [userExists, setUserExists] = useState(false)

    function handleEmailInput(e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let inputMail = e.target.value
        inputMail !== "" ? setValidEmail(emailRegex.test(inputMail)) : setValidEmail(true)
        let userEmailsList = userEmails.map((user) => {return user.userEmail})   
        (userEmailsList.includes(inputMail) && (inputMail != userInfo.userEmail)) ? setUserExists(true) : setUserExists(false)
    }

    function handleUserUpdate(formData){
        let updatedUserInfo = userInfo;
        updatedUserInfo.userName = formData.get("username");
        updatedUserInfo.userEmail = formData.get("updatedEmail")
        console.log(validEmail, userExists)
        if(validEmail && !userExists) {
            submitUpdatedUserInfo(updatedUserInfo)
        }
    }

    async function submitUpdatedUserInfo(updatedUserInfo) {
        const loadingToast = toast.loading("Submitting your review...");
        try {
            const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/update/" + userInfo._id, 
                {
                    method : "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(updatedUserInfo)
                }
            )
            if(!response.ok) {
                throw new Error("Error occured " + await response.json())
            }
            const jsonResponse = await response.json()
            toast.update(loadingToast, {
                render: "Details submitted successfully" + jsonResponse,
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });    
        } catch (error) {
            console.log(error.message)
            toast.update(loadingToast, {
                render: "Details submission failed " + error.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                });
        }
    }

    // https://stackoverflow.com/questions/30516391/html-input-already-filled-in-text
    return (
        <>
            <Card className='m-auto my-2 w-100 m-auto'>
                <Card.Body className='d-flex flex-row'>
                <Form action={handleUserUpdate}>
                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type="text" name='username' placeholder="new username" defaultValue={userInfo.userName} /> 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='updatedEmail' placeholder="Enter updated email" onInput={handleEmailInput} defaultValue={userInfo.userEmail} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                        {userExists && <p className="p-2 text-danger">User email already exists!</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Card.Body>
            </Card>
        </>
    )
}