import MoviePoster from "./MoviePoster";
import MovieTrailer from "./MovieTrailer";

export default function MovieMedia({moviePoster, movieTrailer}) {

    // console.log(moviePoster.moviePoster, movieTrailer.movieTrailer);
    return (
        <>
            <div id="movieMedia" className="movieDetails container d-flex justify-content-center align-items-center m-auto m-2" >
                <MoviePoster moviePoster={moviePoster} />
                <MovieTrailer movieTrailer={movieTrailer} />
            </div>
        </>
    )
}