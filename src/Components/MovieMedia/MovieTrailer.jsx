import Iframe from 'react-iframe'

export default function MovieTrailer(movieTrailer) {

    return (
        <>
            <div className="moviePoster m-auto w-75">
                <Iframe url={`${movieTrailer.movieTrailer}`.replace("watch?v=", "embed/")} height='360px' className="iframe w-100 m-auto"/>
            </div>
        </>
    )
}