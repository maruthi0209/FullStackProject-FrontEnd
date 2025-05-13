import { Link } from "react-router-dom";
import SkipToMain from "./SkipToMain";
import {useState, useEffect } from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });
    // return () => unsubscribe();
    // }, []);

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
        navigate("/"); // or use window.location.href
    //   } else {
    //     console.error("Backend login failed");
    //   }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };


    async function handleLogin( formData) {
        // e.preventDefault()
        const loginEmail = formData.get("loginEmail")
        const loginPassword = formData.get("loginPassword")
        try {
            const res = await fetch(`https://fullstackproject-backend-z5rx.onrender.com/users/emailLogin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "userEmail" : loginEmail, "userPassword" :loginPassword }),
            });
            if (!res.ok) {
                throw new Error("Error occured during the login process" + res.statusText)
            }
            const data = await res.json();
            localStorage.setItem("userToken", data.token)
            navigate("/")
        } catch (error) {
            console.log(error.message)

        }
    }

    return (
        <>
            <div className="loginDiv w-25 m-auto h-50 bg-white p-4 rounded" id="loginDiv" 
                style={{position : "relative", top : "200px", textAlign : "center"}}>
                
                <form action={handleLogin}>
                    <input type="email" placeholder="Enter email" className="mb-3" name='loginEmail' required/>

                    <input type="password" placeholder="Enter Password" className="mb-3" name='loginPassword' required/>
                    <br />

                    <button type="submit" className="m-1 btn btn-primary">Submit</button>

                </form>

                <button className="btn w-75 border-secondary my-2" onClick={handleGoogleLogin}>Login In with Google</button>

                <div className="w-100">
                    <Link to="/signup" className=" m-2" >Sign Up!</Link>
                
                    <Link to="/forgotpassword" className=" m-2">Forgot Password</Link>

                    <SkipToMain />
                </div>
            </div>
        </>
    )
}
