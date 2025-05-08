import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import SkipToMain from "./SkipToMain";

function SignUpContainer() {

    const [userEmails, setUserEmails] = useState([])
    let [validEmail, setValidEmail] = useState(true)
    let [enteredPass, setEnteredPass] = useState(null)
    let [validPassword, setValidPassword] = useState(true)
    let [valid2Password, setValid2Password] = useState(true)
    let [userExists, setUserExists] = useState(false)

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
        getAllUsers()

    }, [])

    function handleSignUp(formData) { 
        console.log(formData)
    }

    function handleEmailInput(e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let inputMail = e.target.value
        inputMail !== "" ? setValidEmail(emailRegex.test(inputMail)) : setValidEmail(true)
        let userEmailsList = userEmails.map((user) => {return user.userEmail})   
        userEmailsList.includes(inputMail) ? setUserExists(true) : setUserExists(false)
    }

    function handlePasswordInput(e) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        let inputPassword = e.target.value
        if (inputPassword !== ""){
            setValidPassword(passwordRegex.test(inputPassword))
            setEnteredPass(inputPassword)
        } else {
            setValidPassword(true)
        } 
    }

    function handle2PasswordInput(e) {
        let inputPassword = e.target.value;
        inputPassword === enteredPass ? setValid2Password(true) : setValid2Password(false) 
    }

    return (
        <>
        <div className="signUpDiv w-25 m-auto h-50 bg-white p-4 rounded" id="signUpDiv" 
                style={{position : "relative", top : "150px", textAlign : "center"}}>
            <Form action={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address*</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onInput={handleEmailInput}/>
                    {validEmail == false && <p className="p-2 text-warning">Please enter a valid email format</p>}
                    {userExists && <p className="p-2 text-danger">User already exists!</p>}
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="Password" onInput={handlePasswordInput}/>
                    {validPassword==false && <p>Enter a password that is 8 to 16 characters long, contains only lowercase letters, uppercase letters, numbers, no special characters or spaces.</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic2Password">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control type="password" placeholder="Password" onInput={handle2PasswordInput}/>
                    {valid2Password==false && <p className="p-2 text-danger">Passwords do not match</p>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Link to="/login" className="btn btn-primary m-1" >Login</Link>

                <Link to="/forgotpassword" className="btn btn-danger">Forgot Password</Link>

            </Form> 

            <SkipToMain />
        </div>
        </>
    )
}

export default SignUpContainer