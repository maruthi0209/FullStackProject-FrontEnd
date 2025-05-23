import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import decodeToken from '../Components/Util/GetUserIdFromEmail2';
import Header from "../Components/HeaderAndFooter/Header"
import Footer from "../Components/HeaderAndFooter/Footer2"
import UserInfo from "../Components/UserProfile/UserInfo";
import UserRelatedReviews from "../Components/UserProfile/UserRelatedReviews";

export default function UserDetails() {

    let navigate = useNavigate()
    const [user, setUser] = useState(null);

    // let [err, setErr] = useState(false)
    // function handleLogOut() {
    //     try {
    //         localStorage.removeItem("userToken");
    //         navigate("/")
    //     } catch (error) {
    //         setErr(true)
    //         setTimeout(()=> {
    //             setErr(false)
    //         }, 5000)
    //     }
    // } 

    const token = localStorage.getItem('userToken');
    
    useEffect(() => {   
        let isMounted = true;   
        const fetchUser = async () => {
            try {
                const userData = await decodeToken();
            if (isMounted && userData) { // Check mount state
                setUser(userData);
                }
            } catch (error) {
                if (isMounted) {
                    console.log(error.message);
                }
            }
        };
        fetchUser();
    return () => {
    isMounted = false; // Cleanup function
    };
    }, [])
    
    return (
        <>
            <div className="userProfile container m-auto p-2 my-2 d-flex flex-column space-mono-regular">
                {/* {err && <p style={{color : "red"}}>There was an error. Please try again after some time.</p>}
                <button className="btn btn-warning" onClick={handleLogOut}>Log out</button> */}
                <Header />
                    <UserInfo userId={user} />
                    <UserRelatedReviews userId={user}/>
                <Footer />
            </div>
        </>
    )
}