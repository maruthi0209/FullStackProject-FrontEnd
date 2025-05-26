import Card from 'react-bootstrap/Card';
import DivContainer from './DivContainer';

export default function DivCard({title, list, idname}) {

    return (
       <>
        <Card style={{width : "85%", margin : "auto", backgroundColor : "var(--bg-secondary)", color : "var(--text-primary)"}} className='outerCard my-4' id={idname}>
        <Card.Body>
            <Card.Title className='my-2 py-2 space-mono-bold text-start'>{title}</Card.Title>
                <DivContainer  showlist={list} />
        </Card.Body>
        </Card>
       </> 
    )
}