import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DivCard from "../Cards/DivCard";

export default function UpcomingReleases() {

    let [upcomingReleases, setUpcomingReleases] = useState([])

    useEffect(() => {
        async function getUpcomingReleases() {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/movies/upcoming")
                if (!response.ok) {
                    throw new Error("Some error occured" + response.status )
                }
                const jsonresponse = await response.json()
                setUpcomingReleases(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        getUpcomingReleases()
    }, [])
    
    return (
        <>
            <DivCard title={"Upcoming Releases"} list={upcomingReleases} idname = {"upcomingReleases"}  />
        </>
    )
}