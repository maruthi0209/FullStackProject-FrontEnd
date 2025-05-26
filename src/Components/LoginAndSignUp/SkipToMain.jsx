import { Link } from "react-router-dom"

export default function SkipToMain() {

    return (
        <>
            <Link to="/" className="btn btn-secondary m-2" style={{textDecoration : "none", color : "var(--primary-text)"}} >Skip To Main</Link>
        </>
    )
}