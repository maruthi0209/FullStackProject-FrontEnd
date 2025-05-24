import MovieName from "./MovieName";
import MovieRating from "./MovieRating";

export default function MovieBanner({movieName, movieReleaseYear, movieRunningTimeInMinutes, movieAverageRating, favorited}) {

    return (
        <>
            <div className="container m-auto p-2 my-3 d-flex flex-row align-items-center space-mono-regular rounded" style={{width : "80%", fontSize : "1rem", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
                <MovieName movieName={movieName} movieReleaseYear={movieReleaseYear} movieRunningTimeInMinutes={movieRunningTimeInMinutes} />
                <MovieRating movieAverageRating={movieAverageRating} favorited={favorited} />
            </div>
        </>
    )
}