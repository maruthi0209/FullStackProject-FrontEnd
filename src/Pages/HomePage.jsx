import HotTrending from "../Components/Carousel/HotTrending";
import FanFavorites from "../Components/FanFavorites/FanFavorites";
import Footer from "../Components/HeaderAndFooter/Footer";
import Header from "../Components/HeaderAndFooter/Header";
import HighestGrossing from "../Components/HighestGrossing/HighestGrossing";
import TopRated from "../Components/TopRated/TopRated";
import UpcomingReleases from "../Components/UpcomingReleases/UpcomingReleases";

function HomePage() {
    return (
        <>
        <div className='app'>
        <Header />
            <HotTrending />
            <HighestGrossing />
            <TopRated />
            <UpcomingReleases />
            <FanFavorites />
        <Footer />
        </div>
        </>
    )
}

export default HomePage
