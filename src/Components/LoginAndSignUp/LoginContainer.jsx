import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import SkipToMain from "./SkipToMain";

export default function LoginContainer() {

    return (
        <>
            <div className="loginDiv w-25 m-auto h-50 bg-white p-4 rounded" id="loginDiv" 
                style={{position : "relative", top : "200px", textAlign : "center"}}>
                {/* <EmailInput />
                <PasswordInput /> */}
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Button variant="primary" type="submit" className="m-1">Submit</Button>

                <Link to="/signup" className="btn btn-primary m-1" >Sign Up!</Link>

                <Link to="/forgotpassword" className="btn btn-danger">Forgot Password</Link>

                </Form>

                <SkipToMain />
            </div>
        </>
    )
}
