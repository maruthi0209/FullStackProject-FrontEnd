import { useEffect } from "react"
import Card from 'react-bootstrap/Card';


export default function HighestGrossing() {

    let [highestgrossingList, setHighestGrossing] = useState(null)

    useEffect(() => {
        async function getHighestGrossing() {
            try {
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/highestgrossing/allHighestGrossing")
                if (!response.ok) {
                    throw new Error("Error occured " + response.status + response.statusText)
                }
                const jsonresponse = await response.json()
                setHighestGrossing(jsonresponse)
            } catch (error) {
                console.log()
            }
        }
        getHighestGrossing()
    }, [])

    return (
        <>
            <div className="highestGrossing w-75 m-auto" id="highestGrossing">
                <div className="" id="highestGrossingHeading">
                    <h3>Highest Grossing</h3>
                </div>
                <div className="" id="highestGrossingContainer">
                    {
                        highestgrossingList.map((element) => {
                            return (
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}