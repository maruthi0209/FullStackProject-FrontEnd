import { GoClock } from "react-icons/go";

export default function MovieName({movieName, movieReleaseYear, movieRunningTimeInMinutes}) {

    return (
        <>
            <div className="container m-auto px-2">
                <h3 className="space-mono-bold">{movieName}</h3>
                <span>Year : {movieReleaseYear}</span> <br />
                <span><GoClock /> {movieRunningTimeInMinutes} minutes</span>
            </div>
        </>
    )
}