import MoviePoster from "./MoviePoster";
import MovieTrailer from "./MovieTrailer";

export default function MovieMedia({moviePoster, movieTrailer}) {

    // console.log(moviePoster.moviePoster, movieTrailer.movieTrailer);
    return (
        <>
            <div className="container d-flex flex-row justify-content-center align-items-center flex-wrap m-auto p-2 m-2" 
                style={{width : "80%"}}>
                <MoviePoster moviePoster={moviePoster} />
                <MovieTrailer movieTrailer={movieTrailer} />
            </div>
        </>
    )
}