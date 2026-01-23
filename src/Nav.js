import classes from './Header.module.css';
import burguer from "./components/assets/icon _hamburger menu.svg"
import { useState, useEffect } from 'react';
import { useLogin } from './LoginContext';
import LoginForm from './LoginForm';
import { NavLink } from 'react-router';
import { HashLink } from 'react-router-hash-link';

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
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><HashLink smooth to="/#about">About</HashLink></li>
                    <li><HashLink smooth to="/#menu">Menu</HashLink></li>
                    <li><NavLink to="/reservation">Reservations</NavLink></li>
                    <li><NavLink to="/order">Order Online</NavLink></li>
                    <li><NavLink to="/" onClick={loginClick}>Login</NavLink></li>
                </ul>
            </nav>
            <nav className={classes.smallSizeNav} onVolumeChange={handleClick}>
                <img src={burguer} alt="Hamburguer navigation-bar icon" className={`${classes.burguer} ${classes[nav]}`} onClick={handleClick}></img>
            {nav ?
                <ul className={`${classes.smallNavBar} ${classes[nav ? "open" : "close"]}`}>
                    <li><NavLink to="/" onClick={handleClick}>Home</NavLink></li>
                    <li><HashLink smooth to="/#about">About</HashLink></li>
                    <li><HashLink smooth to="/#menu">Menu</HashLink></li>
                    <li><NavLink to="/reservation" onClick={handleClick}>Reservations</NavLink></li>
                    <li><NavLink to="/order" onClick={handleClick}>Order Online</NavLink></li>
                    <li><NavLink to="/" onClick={loginClick}>Login</NavLink></li>
                </ul>
                :
                <></>
            }
            </nav>
        </>
    )
}

