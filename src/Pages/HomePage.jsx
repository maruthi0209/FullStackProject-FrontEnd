import HotTrending from "../Components/Carousel/HotTrending";
import Footer from "../Components/HeaderAndFooter/Footer";
import Header from "../Components/HeaderAndFooter/Header";
import HighestGrossing from "../Components/HighestGrossing/HighestGrossing";
import TopRated from "../Components/TopRated/TopRated";
import UpcomingReleases from "../Components/UpcomingReleases/UpcomingReleases";

function HomePage() {
    return (
        <>
        <Header />
        <HotTrending />
        <HighestGrossing />
        <TopRated />
        <UpcomingReleases />
        <Footer />
        </>
    )
}

export default HomePage
