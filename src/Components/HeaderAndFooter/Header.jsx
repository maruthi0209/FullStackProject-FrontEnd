import { useState, useEffect } from "react"
import screenscorelogo from "../../assets/ScreenScore_dark.png"
// import { HomeOutline } from 'react-icons'
import { IoMdSearch, IoMdMenu , IoIosList , IoIosHome  } from "react-icons/io";
import { Link } from "react-router-dom"
// import { MenuOutline } from 'react-ionicons'

function Logo() {
    return (
        <div className="logo" id="logo">
            <Link to="/" className="logo" id="logoLink"><img src={screenscorelogo} alt="ScreenScore Logo" /></Link> 
        </div>
    ) 
}

function SearchBar() {
    const [matches, setMatches] = useState(window.matchMedia("(max-width: 424px)").matches)
    const [menusearchbuttonclicked, setmenusearchbuttonclicked] = useState(false);
    const [ismobile, setIsMobile] = useState(false)
    
      useEffect(() => { // https://stackoverflow.com/questions/54491645/media-query-syntax-for-reactjs
        window.matchMedia("(max-width: 424px)").addEventListener('change', e => {setMatches( e.matches )});
      }, []);

    return (
        <div id="searchBarDiv">
        {
            matches && 
            <>
                <button type="button" id="menusearchButton" onClick={()=>{setmenusearchbuttonclicked(!menusearchbuttonclicked)}}><IoMdSearch color={'#FFFFFF'} /></button>
            </>   
        }
        {
            (matches && menusearchbuttonclicked) && <div id="searchBarContent">
                <input type="text" name="searchBar" id="contentsearchBar" placeholder="Search Movies, Actors or Genre" />
                <button type="button" id="contentsearchButton"><IoMdSearch color={'#000000'} /></button>
            </div>
        }
        { 
            (!matches || ((!matches && menusearchbuttonclicked))) &&// (!matches || menusearchbuttonclicked) &&
            <>
                <input type="text" name="searchBar" id="searchBar" placeholder="Search Movies" />
                <button type="button" id="searchButton"><IoMdSearch color={'#000000'} /></button>
            </> 
        }
        </div>
    )
}

function MenuNavBarLabel() {
    const [labelClicked, setlabelClicked] = useState(false); // https://react.dev/reference/react/useState
    return(
        <>
        <div className="MenuNavBar" id="MenuNavBarLabel" >
            {/* <label htmlFor="checkbox"><MenuOutline  color={'#FFFFFF'} /></label> */}
            <button type="button" id="MenuNavBarButton" onClick={() => {setlabelClicked(!labelClicked)}}><IoMdMenu  color={'#FFFFFF'} /></button>
        </div>
        {
            labelClicked && <div className="MenuNavBar" id="MenuNavBarContents">
            {(window.location.pathname == "/") && <Link to="/categories" className="menunavlinks" id="menucategories"><IoIosList color={'#FFFFF'}/>Categories</Link>}
                {(window.location.pathname == "/categories") && <Link to="/" className="menunavlinks" id="menuhome"><IoIosHome color={'#FFFFF'}/>Home</Link>}
            { localStorage.getItem("userToken")!=null && <Link to="/user" className="menunavlinks" id="menuUser">User Profile</Link>}
            {localStorage.getItem("userToken")==null && <Link to="/login" className="menunavlinks" id="menulogin">Login</Link>}
        </div>
        }
        
        </>
    )
}

function NavBar() {
    // // https://stackoverflow.com/questions/39823681/read-the-current-full-url-with-react
    return (
        <div id="navbar"> 
            {(window.location.pathname == "/") && <Link to="/categories" className="menunavlinks" id="menucategories"><IoIosList color={'#FFFFF'}/>Categories</Link>}
                {(window.location.pathname == "/categories") && <Link to="/" className="menunavlinks" id="menuhome"><IoIosHome color={'#FFFFF'}/>Home</Link>}
            { localStorage.getItem("userToken")!=null && <Link to="/userprofile" className="menunavlinks" id="menuUser">User Profile</Link>}
            {localStorage.getItem("userToken")==null && <Link to="/login" className="menunavlinks" id="menulogin">Login</Link>}
        </div>
    )
}

export default function Header() {

    return (
        <>
        <div className="header space-mono-regular m-auto">
            <Logo />
            <SearchBar />
            <NavBar />
            <MenuNavBarLabel />
            
        </div>
        </>
    )
}