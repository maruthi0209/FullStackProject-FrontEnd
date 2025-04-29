import { useState, useEffect } from "react"
import screenscorelogo from "../../assets/ScreenScore_dark.png"
import { SearchOutline, MenuOutline, ListOutline } from 'react-ionicons'
import { Link } from "react-router-dom"
// import { MenuOutline } from 'react-ionicons'
import { Heart } from 'react-ionicons'

function Logo() {
    return (
        <div className="logo" id="logo">
            <img src={screenscorelogo} alt="ScreenScore Logo" />
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
                <button type="button" id="menusearchButton" onClick={()=>{setmenusearchbuttonclicked(!menusearchbuttonclicked)}}><SearchOutline color={'#FFFFFF'} /></button>
            </>   
        }
        {
            (matches && menusearchbuttonclicked) && <div id="searchBarContent">
                <input type="text" name="searchBar" id="contentsearchBar" placeholder="Search Movies, Actors or Genre" />
                <button type="button" id="contentsearchButton"><SearchOutline color={'#000000'} /></button>
            </div>
        }
        { 
            (!matches || ((!matches && menusearchbuttonclicked))) &&// (!matches || menusearchbuttonclicked) &&
            <>
                <input type="text" name="searchBar" id="searchBar" placeholder="Search Movies, Actors or Genre" />
                <button type="button" id="searchButton"><SearchOutline color={'#000000'} /></button>
            </> 
        }
        </div>
    )
}

// function MenuNavBarCheckbox() {
//     return(
//         <div className="MenuNavBar" id="MenuNavBarCheckbox">
//             <input type="checkbox" name="checkbox" id="checkbox" />
//         </div>
//     )
// }

function MenuNavBarLabel() {
    const [labelClicked, setlabelClicked] = useState(false); // https://react.dev/reference/react/useState
    return(
        <>
        <div className="MenuNavBar" id="MenuNavBarLabel" >
            {/* <label htmlFor="checkbox"><MenuOutline  color={'#FFFFFF'} /></label> */}
            <button type="button" id="MenuNavBarButton" onClick={() => {setlabelClicked(!labelClicked)}}><MenuOutline  color={'#FFFFFF'} /></button>
        </div>
        {
            labelClicked && <div className="MenuNavBar" id="MenuNavBarContents">
            <a href="#" className="menunavlinks" id="menufavorites"><ListOutline color={'#FFFFFFF'}/>      Categories</a>
            <Link to="/login" className="menunavlinks" id="menulogin">Login</Link>
        </div>
        }
        
        </>
    )
}

// function MenuNavBarContents(){
//     return(
//         <>
//              {this.labelClicked && <div className="MenuNavBar" id="MenuNavBarContents">
//                 <a href="#" className="menunavlinks" id="menufavorites"><Heart color={'#FFFFFF'}/>      Favorites</a>
//                 <a href="#" className="menunavlinks" id="menulogin">Login</a>
//             </div>}
//         </>
//     )
// }

function NavBar() {
    return (
        <div id="navbar">
            <Link href="/categories" className="menunavlinks" id="menucategories"><ListOutline color={'#FFFFF'}/>      Categories</Link>
            <Link to="/login" className="menunavlinks" id="menulogin">Login</Link>
        </div>
    )
}

export default function Header() {

    return (
        <>
        <div className="header space-mono-regular">
            <Logo />
            <SearchBar />
            {/* <MenuNavBarCheckbox /> */}
            {/* <MenuNavBarContents /> */}
            <NavBar />
            <MenuNavBarLabel />
            
        </div>
        </>
    )
}