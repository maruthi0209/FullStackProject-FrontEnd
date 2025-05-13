import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function UserDetails() {

    let navigate = useNavigate()

    let [err, setErr] = useState(false)

    function handleLogOut() {
        try {
            localStorage.removeItem("userToken");
            navigate("/")
        } catch (error) {
            setErr(true)
            setTimeout(()=> {
                setErr(false)
            }, 5000)
        }
    } 

    useEffect(() => {
        if(localStorage.getItem("userToken") == null){
            navigate("/")
        } 
    }, [])

    return (
        <>
            <div className="userProfile w-75 m-auto h-100">
                {err && <p style={{color : "red"}}>There was an error. Please try again after some time.</p>}
                <button className="btn btn-warning" onClick={handleLogOut}>Log out</button>
            </div>
        </>
    )
}