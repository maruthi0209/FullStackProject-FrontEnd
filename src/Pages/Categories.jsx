import Header from "../Components/HeaderAndFooter/Header"
import Footer from "../Components/HeaderAndFooter/Footer"
import Accordion from 'react-bootstrap/Accordion';
import { useEffect } from "react"
import { useState } from "react"
import { Suspense, lazy } from 'react';
const DivCatContainer = lazy(() => import("../Components/Cards/DivCatContainer"));
import Loader from "../Components/Util/Loader";

export default function Categories() {

    let [genreNameList, setGenreNameList] = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getGenres() {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/genres/allGenres");
                if(!response.ok) {
                    throw new Error("Error while fetching " + response.json)
                }
                const jsonResponse = await response.json()
                setGenreNameList(jsonResponse)
            } catch (error) {
                console.log(error.message)
            } finally{
                setLoading(false)
            }
        }
        getGenres()
    }, [])

    if (loading) {
    return <Loader />;
  }

    return (
        <>
        <Header />
            <div className="categories h-100 w-100 m-auto p-2">
                <Accordion>
                {
                    genreNameList.map((genre, index) => {         
                        return (
                            <>  
                                
                                    <Accordion.Item eventKey={index} id={index} className="my-4 mx-auto w-75">
                                    <Accordion.Header className="space-mono-bold text-center">{`${genre.genreName}`}</Accordion.Header>
                                    <Accordion.Body className="space-mono-regular p-2 m-2" style={{fontSize : "0.75rem"}}>
                                        <Suspense fallback={<div>Loading Component...</div>}>
                                        {`${genre.genreDescription}`}
                                        <div className="accordion-body-text m-2 p-3 ">
                                            <DivCatContainer genreName = {genre.genreName} />
                                        </div>
                                        </Suspense>
                                    </Accordion.Body>
                                    </Accordion.Item>
                            </>
                            
                        )
                    })
                }
                </Accordion>
            </div>
        <Footer />
        </>
    )
}
