import Image from 'react-bootstrap/Image';

export default function MoviePoster(moviePoster) {

    const imageURL = `${moviePoster.moviePoster}`
    return (
        <>
            <div className="moviePoster m-auto w-25 p-2">
                <Image  src={imageURL} alt="Movie Poster" rounded style={{objectFit : "fill", width : "100%", display : "block"}}/>
            </div>
        </>
    )
}