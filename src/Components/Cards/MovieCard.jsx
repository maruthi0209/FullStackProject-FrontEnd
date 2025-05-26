import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';

export default function MovieCard({id}) {

    let [movieInfo, setMovieInfo] = useState({})

    useEffect(()=> {
        async function getMovieDetails(id) {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/movies/id/" + id)
                if(!response.ok) {
                    throw new Error("Error occured" + response.json())
                }
                const jsonResponse = await response.json()
                setMovieInfo(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getMovieDetails(id)
    }, [id])

    return (
        <>
            <Card className="MovieCard m-auto border-light">
                <Card.Img variant="top" src={movieInfo.moviePoster} style={{display : "block", width : "50%", margin : "auto"}}/>
                <Card.Body>
                    <Card.Text className="text-center caveat-regular" style={{fontSize : "1rem"}}>{movieInfo.movieName}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}