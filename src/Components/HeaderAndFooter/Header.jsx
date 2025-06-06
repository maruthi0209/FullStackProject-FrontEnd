import { useState, useEffect, useContext} from "react"
// import screenscorelogo from "../../assets/ScreenScore_light.png"
import screenscorelogolight from "../../assets/ScreenScore_light.png"
import screenscorelogodark from "../../assets/ScreenScore_dark2.png"
import { IoMdSearch, IoMdMenu , IoIosList , IoIosHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"
import { useDebounce } from "./Debouncing";
import ThemeToggle from '../Util/ThemeToggle';
import { ThemeContext } from "../Util/ThemeContext";

function Logo() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className="logo" id="logo">
            <Link to="/" className="logo" id="logoLink"><img src={theme==='light'? screenscorelogolight : screenscorelogodark} alt="ScreenScore Logo" style={{display : "block", width : "100%"}}/></Link> 
        </div>
    ) 
}

function SearchBar() {
    const [matches, setMatches] = useState(window.matchMedia("(max-width: 524px)").matches);
    const [menusearchbuttonclicked, setmenusearchbuttonclicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        window.matchMedia("(max-width: 524px)").addEventListener('change', e => setMatches(e.matches));
        return () => {
            window.matchMedia("(max-width: 524px)").removeEventListener('change', e => setMatches(e.matches));
        };
    }, []);

    useEffect(() => {
        if (debouncedSearchQuery.trim() !== "") {
            setIsSearching(true);
            // Perform search or navigate to search results
            navigate(`/search?query=${debouncedSearchQuery}`);
        }
    }, [debouncedSearchQuery, navigate]);

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <div id="searchBarDiv" className="border border-secondary position-relative d-flex justify-content-evenly">
            {matches && (
                <>
                    <button 
                        type="button" 
                        id="menusearchButton" 
                        onClick={() => setmenusearchbuttonclicked(!menusearchbuttonclicked)}
                    >
                        <IoMdSearch color={'var(--text-primary)'} />
                    </button>
                </>   
            )}
            {(matches && menusearchbuttonclicked) && (
                <div id="searchBarContent">
                    <input 
                        type="text" 
                        name="searchBar" 
                        id="contentsearchBar" 
                        placeholder="Search Movies"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* <button 
                        type="button" 
                        id="contentsearchButton"
                        onClick={handleSearch}
                    >
                        <IoMdSearch color={'#000000'} />
                    </button> */}
                </div>
            )}
            {(!matches || ((!matches && menusearchbuttonclicked))) && (
                <>
                    <input 
                        type="text" 
                        name="searchBar" 
                        id="searchBar" 
                        placeholder="Search Movies"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{width: "90%", borderTopLeftRadius : "10px", borderBottomLeftRadius : "10px", borderRight : "none", paddingLeft : "15px", borderColor : "var(--primary-color)"}}
                    />
                    <button 
                        type="button" 
                        id="searchButton"
                        onClick={handleSearch}
                    >
                        <IoMdSearch color={'#000000'} />
                    </button>
                </> 
            )}
        </div>
    )
}

function MenuNavBarLabel() {
    const [labelClicked, setlabelClicked] = useState(false); // https://react.dev/reference/react/useState
    return(
        <>
        <div className="MenuNavBar" id="MenuNavBarLabel">
            {/* <label htmlFor="checkbox"><IoMdMenu  color={'var(--text-primary)'} /></label> */}
            <button type="button" id="MenuNavBarButton" onClick={() => {setlabelClicked(!labelClicked)}}><IoMdMenu  color={'var(--text-primary)'} /></button>
        </div>
        {
            labelClicked && <div className="MenuNavBar" id="MenuNavBarContents">
            {(window.location.pathname != "/") && <Link to="/" className="menunavlinks" id="menuhome"><IoIosHome color={'#FFFFF'}/>Home</Link>}
            {(window.location.pathname != "/categories") && <Link to="/categories" className="menunavlinks" id="menucategories"><IoIosList color={'#FFFFF'}/>Categories</Link>}      
            { localStorage.getItem("userToken")!=null && (window.location.pathname != "/userprofile") && <Link to="/userprofile" className="menunavlinks" id="menuUser">User Profile</Link>}
            {localStorage.getItem("userToken")==null && <Link to="/login" className="menunavlinks" id="menulogin">Login</Link>}
        </div>
        }
        
        </>
    )
}

function NavBar() {
    // // https://stackoverflow.com/questions/39823681/read-the-current-full-url-with-react
    return (
        <div id="navbar" style={{width : "25%", }}> 
            {/* {(window.location.pathname == "/") && <Link to="/categories" className="menunavlinks" id="menucategories"><IoIosList color={'#FFFFF'}/>Categories</Link>}
                {(window.location.pathname == "/categories") && <Link to="/" className="menunavlinks" id="menuhome"><IoIosHome color={'#FFFFF'}/>Home</Link>}
            { localStorage.getItem("userToken")!=null && <Link to="/userprofile" className="menunavlinks" id="menuUser">User Profile</Link>}
            {localStorage.getItem("userToken")==null && <Link to="/login" className="menunavlinks" id="menulogin">Login</Link>} */}

            {(window.location.pathname != "/") && <Link to="/" className="menunavlinks" id="menuhome"><IoIosHome color={'#FFFFF'}/>Home</Link>}
            {(window.location.pathname != "/categories") && <Link to="/categories" className="menunavlinks" id="menucategories"><IoIosList color={'#FFFFF'}/>Categories</Link>}      
            { localStorage.getItem("userToken")!=null && (window.location.pathname != "/userprofile") && <Link to="/userprofile" className="menunavlinks" id="menuUser">User Profile</Link>}
            {localStorage.getItem("userToken")==null && <Link to="/login" className="menunavlinks" id="menulogin">Login</Link>}
        </div>
    )
}

export default function Header() {

    return (
        <>
        <div className="header space-mono-regular m-auto d-flex justify-content-around align-items-center w-100" style={{backgroundColor : "var(--primary-color)", height : "5%"}}>
            <Logo />
            <SearchBar />
            <ThemeToggle />
            <NavBar />
            <MenuNavBarLabel />
            
        </div>
        </>
    )
}