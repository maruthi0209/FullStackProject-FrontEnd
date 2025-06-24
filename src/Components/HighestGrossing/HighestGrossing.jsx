import { useState, useEffect } from "react"
import DivCard from "../Cards/DivCard";


export default function HighestGrossing() {

    let [highestgrossingList, setHighestGrossing] = useState([])

    useEffect(() => {
        async function getHighestGrossing() {
            try {
                const response = await fetch("https://fullstackproject-backend-1.onrender.com/movies/highestgrossing")
                if (!response.ok) {
                    throw new Error("Error occured " + response.status + response.statusText)
                }
                const jsonresponse = await response.json()
                setHighestGrossing(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getHighestGrossing()
    }, [])

    return (
        <>
            <DivCard title={"Highest Grossing"} list={highestgrossingList} idname = {"highestGrossing"}/>
        </>
    )
}