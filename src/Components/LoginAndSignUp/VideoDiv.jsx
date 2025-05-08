import videoURL from "../../assets/istockphoto-135906049-640_adpp_is.mp4";

export default function VideoDiv() {
    
    return (
        <div className="videoDiv w-100 h-100 bg-tertiary position-absolute z-n1">
                    <video src={videoURL} autoPlay muted loop className="w-100 h-100" style={{objectFit : "fill"}}></video>
        </div>
    )
}