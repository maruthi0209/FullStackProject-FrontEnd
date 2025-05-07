import Card from 'react-bootstrap/Card';
import { Link, Navigate, redirect } from 'react-router-dom';
import imageURL from "../assets/not_found.gif"

export default function PageNotFound() {

    // https://stackoverflow.com/questions/61252385/why-reactjs-says-the-link-or-path-is-broken-when-i-put-it-in-card-imgsrc
    return (
        <>
        <div className="pageNotFound m-auto h-100">
            <Card id='pageNotFound' className='m-auto w-50 border-0'>
                <Card.Img className='m-auto d-block' src={imageURL} alt='PageNotFound' />
                <Card.Body className='m-auto'>
                    <Card.Title>Hmmm...</Card.Title>
                    <Card.Text>
                        Looks like this page does not exist.
                    </Card.Text>
                    <Link to='/' className='btn btn-primary'>Go To Home</Link>{/* https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page */}
            </Card.Body>
            </Card>
        </div>
        </>
    )
}