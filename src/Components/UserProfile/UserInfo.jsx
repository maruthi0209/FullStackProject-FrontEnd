import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import UserUpdateCard from "../Cards/UserUpdateCard";

export default function UserInfo({userId}) {

    let [err, setErr] = useState(false)
    let [userInfo, setUserInfo] = useState(null)
    let [userEmails, setUserEmails] = useState([])
    let [showUpdateCard, setShowUpdateCard] = useState(false)

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

    async function getAllUsers() {
            try {
                let response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/allUsers")
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                let jsonresponse = await response.json()
                setUserEmails(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }      
        }

    useEffect(()=> {
        getAllUsers()
        getUserDetails(userId);
    }, [userId])

    function handleEdit() {
        setShowUpdateCard(!showUpdateCard)
    }

    return (
        <>
            {userInfo && <Card className="container m-auto p-2 my-2" style={{width : "80%", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
                <Card.Body>
                    <Card.Title>{userInfo.userName}</Card.Title>
                    <Card.Text> Email Address : {userInfo.userEmail} </Card.Text>
                    <div className="w-100 d-flex flex-row justify-content-start" style={{gap : "20px"}}>
                        <Button variant="primary" className="btn btn-warning" onClick={handleEdit} >{showUpdateCard && "Close"} {!showUpdateCard && 'Edit Profile'}</Button>
                        <Button variant="primary" className="btn btn-warning" onClick={handleLogOut}>Log Out</Button>
                    </div>
                    {showUpdateCard && <UserUpdateCard userInfo={userInfo} userEmails={userEmails} />}
                </Card.Body>
            </Card>}
            
        </>
    )
}