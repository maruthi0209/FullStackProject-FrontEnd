import { useEffect, useState } from "react"
// import { handleSignUp } from "./HandleFormSubmission"

function SignUpContainer() {

    const [userEmails, setUserEmails] = useState(null)
    let [userExists, setUserExists] = useState(false)

    useEffect(() => {
        async function getAllUsers() {
            try {
                let response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/AllUsers")
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                let jsonresponse = await response.json()
                setUserEmails(jsonresponse)
            // return jsonresponse
            } catch (error) {
                console.log(error.message)
            }      
        }
        getAllUsers()
        console.log(userEmails)

    }, [])

    function handleSignUp(formData) { 
        // console.log("handle SignUp is called." + formData.get("username") + formData.get("signUpEmail") + formData.get("signUpPassword"))
        if(validateUserName(formData.get("username")) && validateEmail(formData.get("signUpEmail")) && validatePassword(formData.get("signUpPassword"))){
            
            
            console.log("validation success")
            
        } else {
            console.log("validation failed")
        } 
    }

    function validateUserName(username) {
        const alphanumericRegex = /^[A-Za-z0-9]+$/;
        let userEmailsList = userEmails.map((user) => {return user.userEmail})
        if (alphanumericRegex.test(username) && !userEmailsList.includes(username)) {
            setUserExists(true)
        } else {

        }
    }
    function validateEmail(signUpEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(signUpEmail)
    }
    function validatePassword(signUpPassword) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        return passwordRegex.test(signUpPassword)
    }

    return (
        <>
        <div className="loginSignContainer" id="signUpContainer">
            <form action={handleSignUp}>
            <input type="text" name="username" id="username" placeholder="Enter your username" required/>
            
            <input type="email" name="signUpEmail" id="signUpEmail" placeholder="Enter your email address" required />
            <input type="password" name="signUpPassword" id="signUpPassword" placeholder="Enter your password" required />
            <label htmlFor="signUpPassword">Enter a password between 8 to 16 characters</label>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" required/>
            <input type="submit" value="Sign Up!"/>
            </form>
        </div>
        </>
    )
}

export default SignUpContainer