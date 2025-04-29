import { useEffect, useState } from "react"


function SignUpContainer() {
    let [usersData, setUsersData] = useState(null)

    function handleSignUp() {
        console.log("handle SignUp is called.")
    }

    useEffect( ()=> {  // https://stackoverflow.com/questions/77056285/confluence-forge-app-external-fetch-backend-permissions-error
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/allUsers")
                if (!response.ok) {
                    throw new Error(`HTTP Error! status : ${response.status}`)
                }
                const jsondata = await response.json()
                setUsersData(jsondata)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchUsers()
    }, [])

    return (
        <>
        <div className="loginSignContainer" id="signUpContainer">
            <form method="post">
            <input type="text" name="username" id="username" placeholder="Enter your username" required/>
            <input type="email" name="signUpEmail" id="signUpEmail" placeholder="Enter your email address" required/>
            <input type="password" name="signUpPassword" id="signUpPassword" placeholder="Enter your password" required/>
            <label htmlFor="signUpPassword">Enter a password between 8 to 16 characters</label>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" required/>
            <input type="submit" value="Sign Up!" onClick={handleSignUp}/>
            </form>
        </div>
        </>
    )
}

export default SignUpContainer