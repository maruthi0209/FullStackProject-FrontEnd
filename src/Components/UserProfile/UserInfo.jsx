import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function UserInfo({userId}) {

    let [err, setErr] = useState(false)

    let navigate = useNavigate()
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

    let [userInfo, setUserInfo] = useState(null)

    useEffect(()=> {
        async function getUserDetails(userId) {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/id/" + userId) 
                if(!response.ok) {
                    throw new Error("Error occured " + response.json())
                }
                const jsonResponse = await response.json()
                setUserInfo(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getUserDetails(userId);
    }, [userId])

    return (
        <>
            {userInfo && <Card className="container m-auto p-2 my-2" style={{width : "80%"}}>
                <Card.Body>
                    <Card.Title>{userInfo.userName}</Card.Title>
                    <Card.Text> Email Address : {userInfo.userEmail} </Card.Text>
                    <Button variant="primary" className="btn btn-warning" onClick={handleLogOut}>Log Out</Button>
                </Card.Body>
            </Card>}
        </>
    )
}