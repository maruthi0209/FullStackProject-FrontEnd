import { useEffect, useState } from "react"
import DivCard from "../Cards/DivCard"

export default function FanFavorites() {

    let [fanfavorites, setFanFavorites] = useState([])

    useEffect(() => {
        async function getFanFavorites() {
            try {
                const response = await fetch("https://fullstackproject-backend-1.onrender.com/movies/fanfavorites")
                if (!response.ok) {
                    throw new Error("Some error occured " + response.status + response.statusText)
                }
                const jsonresponse = await response.json()
                setFanFavorites(jsonresponse)
            } catch (error) {
                console.log(error.message)
            } 
        }
        getFanFavorites()
    }, [])

    return (
        <>
            < DivCard title={"Fan Favorites"} list={fanfavorites} idname = {"fanFavorites"} />
        </>
    )
}