import Header from "../Components/HeaderAndFooter/Header"
import Footer from "../Components/HeaderAndFooter/Footer2"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MovieMedia from "../Components/MovieMedia/MovieMedia"
import MovieBanner from "../Components/MovieDetails/MovieBanner"
import MovieInnerDetails from "../Components/MovieDetails/MovieInnerDetails"
import { Suspense, lazy } from 'react';
// import MovieReviews from "../Components/MovieDetails/MovieReviews"
const MovieCast = lazy(() => import("../Components/MovieDetails/MovieCast")) 
const MovieReviews = lazy(() => import("../Components/MovieDetails/MovieReviews"))
import Loader from "../Components/Util/Loader"

export default function MovieDetails() {

    const { id } = useParams();
    let [movieDetails, setMovieDetails] = useState({})
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMovieDetails(id) {
            try {
                const response = await fetch("https://fullstackproject-backend-1.onrender.com/movies/id/" + id);
                if (!response.ok) {
                    throw new Error("Error occured " + response.json())
                }
                const jsonResponse = await response.json();
                setMovieDetails(jsonResponse)
            } catch (error) {
                console.log(error.message)
            }
            finally {
                setLoading(false);
            }
        }
        getMovieDetails(id);

    }, [id])

    if (loading) {
    return <Loader />;
    }

    return (
        <>
            <Header />
            <div className="movie-details container-fluid m-auto" id="pdfContent" >
                <MovieBanner movieName={movieDetails.movieName} movieReleaseYear={movieDetails.movieReleaseYear} 
                    movieRunningTimeInMinutes={movieDetails.movieRunningTimeInMinutes} movieAverageRating={movieDetails.movieAverageRating} 
                    favorited={movieDetails.favorited}/>
                <MovieMedia moviePoster={movieDetails.moviePoster} movieTrailer={movieDetails.movieTrailer}/>
                <MovieInnerDetails movieGenre={movieDetails.movieGenre} movieDirector={movieDetails.movieDirector} movieWriter={movieDetails.movieWriter}
                    movieProducer={movieDetails.movieProducer} movieStudio={movieDetails.movieStudio} movieCountry={movieDetails.movieCountry} />
                <Suspense fallback={<div>Loading Component...</div>}>
                    <MovieCast movieActors={movieDetails.movieActors} />
                    <MovieReviews movieId={movieDetails._id}/>
                </Suspense>
            </div>
            <Footer />
        </>
    )
}