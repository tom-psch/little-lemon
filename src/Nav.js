import classes from './Header.module.css';
import burguer from "./components/assets/🦆 icon _hamburger menu.svg"
import { useState, useEffect } from 'react';
import { useLogin } from './LoginContext';
import LoginForm from './LoginForm';

export default function Nav () {
    const [nav,setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    useEffect (() => {
        const handleResizeAndScroll = () => setNav(false);
        window.addEventListener("resize", handleResizeAndScroll);
        window.addEventListener("scroll",handleResizeAndScroll);
        return () => {
     window.removeEventListener("resize", handleResizeAndScroll);
     window.removeEventListener("scroll", handleResizeAndScroll);
   };
    }, []);

    const {popup, setPopup} = useLogin();
    // console.log(popup);

    const loginClick = (e) => {
        e.preventDefault();
        setPopup();
        handleClick();
    }

    return (
        <>
            {popup ? <LoginForm/> : <></>}
            <nav className={classes.fullSizeNav}>
                <ul className={classes.navbar}>
                    <li><a href="/">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="/">Reservations</a></li>
                    <li><a href="/">Order Online</a></li>
                    <li><a href="/" onClick={loginClick}>Login</a></li>
                </ul>
            </nav>
            <nav className={classes.smallSizeNav} onVolumeChange={handleClick}>
                <img src={burguer} alt="Hamburguer navigation-bar icon" className={`${classes.burguer} ${classes[nav]}`} onClick={handleClick}></img>
            {nav ?
                <ul className={`${classes.smallNavBar} ${classes[nav ? "open" : "close"]}`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="/">Menu</a></li>
                    <li><a href="/">Reservations</a></li>
                    <li><a href="/">Order Online</a></li>
                    <li><a href="/" onClick={loginClick}>Login</a></li>
                </ul>
                :
                <></>
            }
            </nav>
        </>
    )
}

