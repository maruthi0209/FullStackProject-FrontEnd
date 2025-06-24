import { Link, replace } from "react-router-dom";
import SkipToMain from "./SkipToMain";
import {useState, useEffect } from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LoginContainer() {

    let navigate = useNavigate();
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    let [error, setError] = useState(false)
    let [errMessge, setErrMessage] = useState(null)

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });
    // return () => unsubscribe();
    // }, []);

     useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleGoogleLogin = async () => {
        setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken(); // 🔐 this is what you send to your backend

    //   console.log("User:", user);
    //   console.log("ID Token:", idToken);

      // Optional: Send token to your backend
    //   const res = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${idToken}`,
    //     },
    //   });

    //   if (res.ok) {
        console.log("Logged in on backend.");
        // store the token in local storage  
        localStorage.setItem("userToken", idToken);
        // Redirect or update UI
        navigate("/", {replace : true}); // or use window.location.href
    //   } else {
    //     console.error("Backend login failed");
    //   }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };


    async function handleLogin( formData) {
        // e.preventDefault()
        const loadingToast = toast.loading("Logging you in...");

        const loginEmail = formData.get("loginEmail")
        const loginPassword = formData.get("loginPassword")
        try {
            const res = await fetch(`https://fullstackproject-backend-1.onrender.com/users/emailLogin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "userEmail" : loginEmail, "userPassword" :loginPassword }),
            });
            if (!res.ok) {
                throw new Error(await res.json())
            }
            const data = await res.json();
            // // toast message
            toast.update(loadingToast, {
            render: "Login successful!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
                });
            localStorage.setItem("userToken", data.token)
            navigate("/", {replace : true})
        } catch (error) {
            console.log(error.message)
            toast.update(loadingToast, {
            render: `Login failed: ${error.message}`,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            });
            setError(true)
            setErrMessage(error.message)
            setTimeout(()=> {
                setError(false)
            }, 5000)
        }
    }

    return (
        <>
            <div 
                style={{
                    minHeight: '100vh',
                    backgroundImage: isMobile ? 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba")' : 'https://wallpapercat.com/w/full/3/a/f/1380744-1920x1080-desktop-full-hd-film-wallpaper-photo.jpg',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    padding: '20px 0'
                }}
            >
                <div 
                    className="loginDiv bg-white p-4 rounded" 
                    id="loginDiv"
                    style={{
                        position: "relative",
                        textAlign: "center",
                        width: "90%",
                        maxWidth: "500px",
                        margin: "0 auto",
                        padding: "1.5rem",
                        marginTop: "2rem",
                        marginBottom: "2rem",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : '#fff'
                    }}
                >
                    {/* Internal style tag for responsive breakpoints */}
                    <style>
                        {`
                            @media (min-width: 425px) {
                                #loginDiv {
                                    width: 80%;
                                }
                                .btn {
                                    width: 75%;
                                }
                            }
                            @media (min-width: 768px) {
                                #loginDiv {
                                    width: 50%;
                                }
                            }
                            @media (min-width: 1024px) {
                                #loginDiv {
                                    width: 35%;
                                }
                            }
                            .form-control {
                                width: 100%;
                                margin-bottom: 1rem;
                                min-height: 3rem;
                            }
                            .btn {
                                width: 100%;
                                margin-bottom: 0.5rem;
                                padding: 0.75rem;
                                font-size: 1rem;
                            }
                            .login-links {
                                display: flex;
                                justify-content: space-around;
                                flex-wrap: wrap;
                                margin-top: 1rem;
                            }
                            .login-links a {
                                margin: 0.5rem;
                                color: var(--bs-primary);
                                text-decoration: none;
                            }
                        `}
                    </style>

                    <form action={handleLogin}>
                        {error && <p style={{color: "red", fontSize: "0.9rem"}}>{errMessage}</p>}
                        
                        <div className="form-floating mb-2">
                            <input 
                                type="email" 
                                placeholder="Enter email" 
                                className="form-control" 
                                id="formLogin" 
                                name="loginEmail" 
                                required
                            />
                            <label htmlFor="formLogin">Enter email</label>
                        </div>

                        <div className="form-floating mb-2">
                            <input 
                                type="password" 
                                placeholder="Enter Password" 
                                className="form-control" 
                                name="loginPassword" 
                                id="formPass" 
                                required
                            />
                            <label htmlFor="formPass">Enter Password</label>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            style={{
                                fontWeight: "500"
                            }}
                        >
                            Submit
                        </button>
                    </form>

                    <button 
                        className="btn border-secondary my-2"
                        onClick={handleGoogleLogin}
                    >
                        Login with Google
                    </button>

                    <div className="login-links">
                        <Link to="/signup">Sign Up!</Link>
                        <Link to="/forgotpassword">Forgot Password</Link>
                        <SkipToMain />
                    </div>
                </div>
            </div>
        </>
    )
}
