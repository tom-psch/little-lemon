import Nav from './Nav';
import logo from './components/assets/logo2.png';
import arrow from "./components/assets/to-the-top.png"
import classes from './Header.module.css';
import { useInView } from 'react-intersection-observer';
import { HashLink } from "react-router-hash-link";
import { NavLink, useLocation } from 'react-router';


export default function Header () {
const {ref, inView} = useInView();
const handleHome = () => window.scrollTo({top:0,behavior:"smooth"});
    return (
        <>
        <header ref={ref}>
            <img className={classes.headerLogo} alt="Little Lemon's logo" src={logo}></img>
            <Nav />
        </header>
        {useLocation().pathname=="/" &&
            // <HashLink to="/" onClick={handleHome}> ACA HABÏA HASHLINK
            <NavLink to="/" onClick={handleHome}>
                <img src={arrow} className={inView ? `${classes.backToTop} ${classes.hidden}` : `${classes.backToTop} ${classes.shown}`} alt="Back to top arrow"/>
            </NavLink>
        }
</>
    )
}

