import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import userImage from "../../assets/user_image.png"

export default function UserCard({userId}) {

    let [username, setUserName] = useState({})

    useEffect(() => {
        async function getUserData(userId) {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/id/" + userId)
                if (!response.ok) {
                    throw new Error("Error occured " + response.json())
                }
                const jsonResponse = await response.json()
                setUserName(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getUserData(userId)
    }, [userId])

    return (
        <>
            <Card className=" m-auto border-light" style={{width : "20%"}}>
                <Card.Img variant="top" src={userImage} style={{display : "block", width : "50%", margin : "auto"}}/>
                <Card.Body>
                    <Card.Text className="text-center caveat-regular" style={{fontSize : "1rem"}}>{username.userName}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}