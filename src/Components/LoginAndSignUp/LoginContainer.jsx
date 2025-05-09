import { Link } from "react-router-dom";
import SkipToMain from "./SkipToMain";
import { useEffect } from "react";

export default function LoginContainer() {

    function handleLogin() {
        
    }
    useEffect(()=> {
        async function getAllUsers() {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/allUsers")
                if (!response.ok) {
                    throw new Error("An error occured " + response.statusText)
                }
                const jsonresponse = await response.json()
            } catch (error) {
                console.log(error.message)
            }
        }
    }, [])

    return (
        <>
            <div className="loginDiv w-25 m-auto h-50 bg-white p-4 rounded" id="loginDiv" 
                style={{position : "relative", top : "200px", textAlign : "center"}}>
                
                <form>
                    <input type="email" placeholder="Enter email" className="mb-3" name='loginEmail' required/>

                    <input type="password" placeholder="Enter Password" className="mb-3" name='loginPassword' required/>
                    <br />

                    <button type="submit" className="m-1 btn btn-primary" onClick={handleLogin}>Submit</button>

                    <Link to="/signup" className="btn btn-primary m-1" >Sign Up!</Link>
                    <Link to="/forgotpassword" className="btn btn-danger">Forgot Password</Link>

                </form>

                <SkipToMain />
            </div>
        </>
    )
}
