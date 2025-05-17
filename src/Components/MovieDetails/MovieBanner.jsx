import MovieName from "./MovieName";
import MovieRating from "./MovieRating";

export default function MovieBanner({movieName, movieReleaseYear, movieRunningTimeInMinutes, movieAverageRating, favorited}) {

    return (
        <>
            <div className="container m-auto p-2 m-2 d-flex flex-row align-items-center space-mono-regular bg-light rounded" style={{width : "80%", fontSize : "1rem"}}>
                <MovieName movieName={movieName} movieReleaseYear={movieReleaseYear} movieRunningTimeInMinutes={movieRunningTimeInMinutes} />
                <MovieRating movieAverageRating={movieAverageRating} favorited={favorited} />
            </div>
        </>
    )
}