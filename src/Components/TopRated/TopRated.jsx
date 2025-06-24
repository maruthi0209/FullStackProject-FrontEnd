import { useEffect, useState } from "react"
import DivCard from "../Cards/DivCard";

export default function TopRated() {

    let [topratedMovies, setTopRatedMovies] = useState([])

    useEffect(() => {
        async function getTopRated() {
            try {
                const response = await fetch("https://fullstackproject-backend-1.onrender.com/movies/toprated")
                if (!response.ok) {
                    throw new Error("Some error occured" + response.status )
                }
                const jsonresponse = await response.json()
                setTopRatedMovies(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getTopRated()
    }, [])
    
    return (
        <>
            <DivCard title={"Top Rated"} list={topratedMovies} idname = {"topRated"} />
        </>
    )
}