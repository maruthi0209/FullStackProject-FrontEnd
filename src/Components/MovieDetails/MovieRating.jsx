import { IoIosStarOutline } from "react-icons/io";
import PdfButton from "../Util/JSPDF";

export default function MovieRating({movieAverageRating, favorited}) {

    return(
        <>
            <div className="container m-auto text-end px-2">
                <span><IoIosStarOutline />{movieAverageRating} / 10</span> <br />
                <span>Favorited by {favorited} people!</span> <br />
                <span ><PdfButton /></span>
            </div>
        </>
    )
}