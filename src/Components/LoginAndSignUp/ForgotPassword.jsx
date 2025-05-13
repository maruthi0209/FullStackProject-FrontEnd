import { Link } from "react-router-dom";
import { useState } from "react";
import  SkipToMain from "../LoginAndSignUp/SkipToMain"

export default function ForgotPassword() {

    let [error, setError] = useState(false)
    let [errMessge, setErrMessage] = useState(null)

    async function handleForgot(formData) {
        forgotEmail = formData.get("forgotEmail")
        try {
            const res = await fetch(`https://fullstackproject-backend-z5rx.onrender.com/users/emailLogin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "userEmail" : loginEmail}),
            });
            if (!res.ok) {
                throw new Error(await res.json())
            }
            const data = await res.json();
            // localStorage.setItem("userToken", data.token)
            navigate("/login")
        } catch (error) {
            console.log(error.message)
            setError(true)
            setErrMessage(error.message)
            setTimeout(()=> {
                setError(false)
            }, 5000)
        }
    }

    return (
        <>
            <div className="forgotDiv w-25 m-auto h-50 bg-white p-4 rounded " id="forgotDiv" 
                            style={{position : "relative", top : "200px", textAlign : "center"}}>
                            
                <form action={handleForgot}>
                    {error && <p style={{color : "red"}}>{errMessge}</p>} <br />
                    <input type="email" placeholder="Enter email" className="mb-3" name='forgotEmail' required/> <br />
                    <p>We're gonna show your password on screen for 10 seconds. Note it down before it's gone. If you were unable to, enter email again.</p> <br />
                    {}
                    <button type="submit" className="m-1 btn btn-primary">Submit</button>
                    
            
                    </form>
            
                    <Link to="/signup" className=" m-2" >Sign Up!</Link>
                            
                    <Link to="/login" className=" m-2">Login</Link>
            
                    <SkipToMain />
            </div>
        </>
    )
}