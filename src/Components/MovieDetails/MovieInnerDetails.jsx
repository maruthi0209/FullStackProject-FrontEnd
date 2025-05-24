import { useEffect } from "react"
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { generatePath } from "react-router-dom";
import MovieGenre from "./MovieGenre";

export default function MovieInnerDetails({movieGenre, movieDirector, movieWriter, movieProducer, movieStudio, movieCountry}) {

    return (
        <>
        <Card className="container m-auto p-2 my-2 d-flex flex-column space-mono-regular" style={{width : "80%" , backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
            <Card.Body>
                {/* <Card.Text> */}
                    <Stack gap={1} className="space-mono-regular">
                        <div className="p-2 border border-info">{
                                movieGenre && movieGenre.map((element, index) => {
                                    return <span className="px-2" style={{display : "inline-block"}} key={index}><MovieGenre genreId={element} key={index}/></span>
                                })
                            }</div>
                        <div className="p-2 border border-info"><b>Director : </b> {movieDirector}</div>
                        <div className="p-2 border border-info"><b>Writer : </b> {movieWriter}</div>
                        <div className="p-2 border border-info"><b>Producer : </b> {movieProducer}</div>
                        <div className="p-2 border border-info"><b>Studio : </b> {movieStudio}</div>
                        <div className="p-2 border border-info"><b>Country : </b> {movieCountry}</div>
                    </Stack>
                {/* </Card.Text> */}
            </Card.Body>
        </Card>
        </>
    )
}