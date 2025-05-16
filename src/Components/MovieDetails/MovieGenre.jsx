import { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';

export default function MovieGenre({genreId}) {

    let [genreDetails, setGenreDetails] = useState({})
    useEffect(() => {
        async function getGenreDetails(genreId) {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/genres/id/" + genreId)
                if(!response.ok) {
                    throw new Error("Error occured" + response.json())
                }
                const jsonResponse = await response.json();
                setGenreDetails(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getGenreDetails(genreId)
    }, [genreId])

    return(
        <>
            <div className="">
                <Badge bg="info">{genreDetails.genreName}</Badge>
            </div>
        </>
    )
}