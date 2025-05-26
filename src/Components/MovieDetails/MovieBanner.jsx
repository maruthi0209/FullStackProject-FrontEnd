import MovieName from "./MovieName";
import MovieRating from "./MovieRating";

export default function MovieBanner({ movieName, movieReleaseYear, movieRunningTimeInMinutes, movieAverageRating, favorited }) {

    return (
        <>
            <div id='movieBanner' className="movieDetails container m-auto p-2 my-3 d-flex align-items-center space-mono-regular rounded" style={{ fontSize: "1rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
                <MovieName movieName={movieName} movieReleaseYear={movieReleaseYear} movieRunningTimeInMinutes={movieRunningTimeInMinutes} />
                <MovieRating movieAverageRating={movieAverageRating} favorited={favorited} />
            </div>
        </>
    )
}