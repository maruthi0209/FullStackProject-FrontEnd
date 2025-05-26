import Card from 'react-bootstrap/Card';
import ActorCard from '../Cards/ActorCard';

export default function MovieCast({movieActors}) {

    return (
        <>
            <Card className="movieDetails container rounded m-auto p-2 my-2 space-mono-regular" style={{backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}}>
            <Card.Title className='py-2'>List of Actors</Card.Title>
            <Card.Body>
                {/* <Card.Text> */}
                    {movieActors && movieActors?.map((actor, index) => {
                        return <ActorCard actorId={actor} key={index}/>
                    })}
                {/* </Card.Text> */}
            </Card.Body>
        </Card>
        </>
    )
}