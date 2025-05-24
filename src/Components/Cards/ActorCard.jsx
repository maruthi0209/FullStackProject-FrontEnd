import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function ActorCard({actorId}) {

    let [actorDetails, setActorDetails] = useState({})
    useEffect(() => {
        async function getActorDetails(actorId) {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/actors/id/" + actorId)
                if(!response.ok) {
                    throw new Error("Error occured " + response.json())
                }
                const jsonResponse = await response.json();
                setActorDetails(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getActorDetails(actorId)
    }, [actorId])

    const imageURL = actorDetails.actorPhoto;
    return (
        <>
            <Card className='m-auto mx-3 border' style={{width : "20%" ,display : "inline-block", fontSize : "0.75rem", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
                <Card.Img variant="top" src={imageURL} alt='Actor' style={{display : "block", width : "75%"}} className='m-auto'/>
                <Card.Body className='text-center'>
                    <Card.Text >
                        {actorDetails.actorName}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}