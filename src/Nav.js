import classes from './Header.module.css';
import burguer from "./components/assets/🦆 icon _hamburger menu.svg"

export default function Nav () {
    return (
        <>
            <nav className={classes.fullSizeNav}>
                <ul className={classes.navbar}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Menu</a></li>
                    <li><a href="/">Reservations</a></li>
                    <li><a href="/">Order Online</a></li>
                    <li><a href="/">Login</a></li>
                </ul>
            </nav>
            <nav className={classes.smallSizeNav}>
                <img src={burguer} alt="Hamburguer navigation-bar icon" className={classes.burguer}></img>
            </nav>
        </>
    )
}

