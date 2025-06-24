import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Iframe from 'react-iframe' // https://www.npmjs.com/package/react-iframe

export default function HotTrending() {

    const [carouselInfo, setCarouselInfo] = useState([])
    
    useEffect(() => {
        async function carouselData() {
            try {
                const response = await fetch("https://fullstackproject-backend-1.onrender.com/hottrending/allHotTrending")
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                const jsonresponse = await response.json()
                setCarouselInfo(jsonresponse)
            } catch (error) {
                console.log(error.message)
            }
        }
        carouselData()
    }, [])

    return (
        <div className='hotTrending w-75 m-auto my-3' id='hotTrending'>
            <Carousel fade> 
                {carouselInfo.map((topic, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <Iframe url={topic.trendingTopicLink.replace("watch?v=", "embed/")} height='540px' id={topic._id} className="iframe w-100 m-auto"/>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
}  