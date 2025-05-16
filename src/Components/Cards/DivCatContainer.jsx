import { useEffect, useState } from "react"
import DivContainer from "./DivContainer";

export default function DivCatContainer({genreName}) {

    let [movieList, setMovieList] = useState([])

    useEffect(() => {
        async function getMoviesList(genreName) {
            try {
                const response = await fetch(`https://fullstackproject-backend-z5rx.onrender.com/movies/genre/` + genreName);
                if(!response.ok) {
                    throw new Error("Error occured" + response.json())
                }
                const jsonResponse = await response.json()
                setMovieList(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getMoviesList(`${genreName}`)
    }, [genreName])

    return (
        <>
            <DivContainer showlist={movieList} />
        </>
    )
}