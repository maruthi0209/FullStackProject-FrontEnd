import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SkipToMain from "./SkipToMain";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function SignUpContainer() {

    let navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [userEmails, setUserEmails] = useState([])
    let [validEmail, setValidEmail] = useState(true)
    let [enteredPass, setEnteredPass] = useState(null)
    let [validPassword, setValidPassword] = useState(true)
    let [valid2Password, setValid2Password] = useState(true)
    let [userExists, setUserExists] = useState(false)

    useEffect(() => {
        async function getAllUsers() {
            try {
                let response = await fetch("https://fullstackproject-backend-1.onrender.com/users/allUsers")
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

    useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);

    async function postData(inputObj) {
        const loadingToast = toast.loading("Signing you up...");
        try {
            const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/create", {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(inputObj)
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const jsonresponse = await response.json()
            // console.log(jsonresponse)
            toast.update(loadingToast, {
            render: "Signup successful!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
                });
            // store the token in local storage  
            localStorage.setItem("userToken", jsonresponse.userToken);
            // Redirect or update UI
            navigate("/"); // or use window.location.href
        } catch (error) {
            console.log(error.message)
            toast.update(loadingToast, {
            render: `Signup failed: ${error.message}`,
            type: "error",
            isLoading: false,
            autoClose: 3000,
                });
        }
    }

    async function handleSignUp(formData) { 
        let inputObj = {}
            inputObj.userName = formData.get("userName")
            inputObj.userEmail = formData.get("userEmail")
            inputObj.userPassword = formData.get("userPassword")
            inputObj.userFavorites = []
            inputObj.userIsAdmin = false
        if (validEmail && !userExists && validPassword && valid2Password) {  
            postData(inputObj)
        }
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
        (inputPassword === enteredPass || inputPassword == "") ? setValid2Password(true) : setValid2Password(false) 
    }

    async function handleGoogleClick() {
        // const auth = getAuth(); Not needed since im importing it after initialisation in firebase.js
        
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            const userToken = await user.getIdToken();
            // // sending the token to get authenticated
            // const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${userToken}`,
            //     },
            //     });
            // const data = await response.json();
            // if (response.ok) {
                // store the token in local storage  
                localStorage.setItem("userToken", userToken);
                // Redirect or update UI
                navigate("/"); // or use window.location.href
                // }

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            
            console.log(errorCode, errorMessage)

            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            
        });
    }

    return (
        <>
            <div 
                className="signUpDiv bg-white p-4 rounded" 
                id="signUpDiv"
                style={{
                    backgroundImage: isMobile ? 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba")' : 'https://wallpapercat.com/w/full/3/a/f/1380744-1920x1080-desktop-full-hd-film-wallpaper-photo.jpg',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    position: "relative",
                    top: "0px",
                    textAlign: "center",
                    width: "90%", // Default width for mobile
                    maxWidth: "500px", // Max width for larger screens
                    margin: "0 auto", // Center the div
                    // Responsive padding
                    padding: "1.5rem",
                    // Responsive margins
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    // Box shadow for better visibility
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
                }}
            >
                {/* Internal style tag for responsive breakpoints */}
                <style>
                    {`
                        @media (min-width: 425px) {
                            #signUpDiv {
                                width: 80%;
                            }
                        }
                        @media (min-width: 768px) {
                            #signUpDiv {
                                width: 50%;
                            }
                        }
                        @media (min-width: 1024px) {
                            #signUpDiv {
                                width: 35%;
                            }
                        }
                        .form-control {
                            width: 100%;
                            margin-bottom: 1rem;
                        }
                        .btn {
                            width: 100%;
                            margin-bottom: 0.5rem;
                        }
                        @media (min-width: 425px) {
                            .btn {
                                width: 75%;
                            }
                        }
                    `}
                </style>

                <form action={handleSignUp}>
                    <div className="form-floating mb-2">
                        <input 
                            type="text" 
                            name="userName" 
                            id="floatingInput" 
                            required 
                            className="form-control" 
                            placeholder="Enter your Username"
                            style={{ minHeight: "3rem" }}
                        />
                        <label htmlFor="floatingInput">Enter your Username</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input 
                            type="email" 
                            onInput={handleEmailInput} 
                            id="floatingEmail" 
                            required 
                            name="userEmail" 
                            className="form-control"
                            style={{ minHeight: "3rem" }}
                        />
                        <label htmlFor="floatingEmail">Enter your email</label>
                        {validEmail == false && <p className="p-2 text-warning mb-3" style={{ fontSize: "0.9rem" }}>Please enter a valid email format</p>}
                        {userExists && <p className="p-2 text-danger" style={{ fontSize: "0.9rem" }}>User already exists!</p>}
                        <p className="text-muted" style={{ fontSize: "0.8rem" }}>We'll never share your email with anyone else.</p>
                    </div>
                    
                    <div className="form-floating mb-2">
                        <input 
                            type="password" 
                            placeholder="Enter your Password" 
                            id="floatingPassword" 
                            onInput={handlePasswordInput} 
                            required 
                            name="userPassword" 
                            className="form-control"
                            style={{ minHeight: "3rem" }}
                        />
                        <label htmlFor="floatingPassword">Enter your Password</label>
                        {validPassword==false && <p style={{ fontSize: "0.9rem" }}>Enter a password that is 8 to 16 characters long, contains only lowercase letters, uppercase letters, numbers, no special characters or spaces.</p>}
                    </div>
                    
                    <div className="form-floating mb-2">
                        <input 
                            type="password" 
                            placeholder="Confirm your Password" 
                            onInput={handle2PasswordInput} 
                            required 
                            className="form-control" 
                            id="floatPass2"
                            style={{ minHeight: "3rem" }}
                        />
                        <label htmlFor="floatingPass2">Confirm your Password</label>
                        {valid2Password==false && <p className="p-2 text-danger" style={{ fontSize: "0.9rem" }}>Passwords do not match</p>}
                    </div>
                    
                    <button 
                        className="btn btn-primary" 
                        type="submit"
                        style={{ 
                            padding: "0.75rem",
                            fontSize: "1rem",
                            fontWeight: "500"
                        }}
                    >
                        Submit
                    </button>
                    
                    <br />
                    
                    <Link 
                        to="/login" 
                        className="btn border-secondary my-2"
                        style={{ 
                            padding: "0.75rem",
                            fontSize: "1rem",
                            display: "inline-block"
                        }}
                    >
                        Go To Login
                    </Link>
                </form> 

                <button 
                    className="btn border-secondary my-2"
                    onClick={handleGoogleClick}
                    style={{ 
                        padding: "0.75rem",
                        fontSize: "1rem",
                        display: "inline-block"
                    }}
                >
                    Sign Up with Google
                </button>

                <SkipToMain />
            </div>
        </>
    )
}

export default SignUpContainer