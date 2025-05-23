import LoginContainer from "../Components/LoginAndSignUp/LoginContainer";
import VideoDiv from "../Components/LoginAndSignUp/VideoDiv";
import Loader from "../Components/Util/Loader";
import { useState, useEffect } from "react";

function LoginPage() {

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
        <VideoDiv />
        <LoginContainer />

        </>
    )
}

export default LoginPage