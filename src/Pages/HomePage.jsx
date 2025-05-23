import Header from "../Components/HeaderAndFooter/Header";
import HotTrending from "../Components/Carousel/HotTrending";
import HighestGrossing from "../Components/HighestGrossing/HighestGrossing";
import { Suspense, lazy } from 'react';
import Footer2 from "../Components/HeaderAndFooter/Footer2";
const FanFavorites = lazy(() => import("../Components/FanFavorites/FanFavorites"));
const UpcomingReleases = lazy(() => import("../Components/UpcomingReleases/UpcomingReleases"));
const TopRated = lazy(() => import("../Components/TopRated/TopRated"));
const Footer = lazy(() => import("../Components/HeaderAndFooter/Footer"))
import Loader from "../Components/Util/Loader";
import { useState, useEffect } from "react";


export default function HomePage() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
        
        <Header />
        <div className='app p-2 w-100 h-100 m-auto'>
            <HotTrending />
            <HighestGrossing />
            <Suspense fallback={<div>Loading Component...</div>}>
                <TopRated />
                <UpcomingReleases />
                <FanFavorites />
            </Suspense>
        </div>
        <Footer2 />
        
        
        </>
    )
}
