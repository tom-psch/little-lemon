import Nav from './Nav';
import logo from './components/assets/Logo.svg';
import classes from './Header.module.css';

export default function Header () {
    return (
        <header>
            <img className={classes.headerLogo} alt="Little Lemon's logo" src={logo}></img>
            <Nav />
        </header>
    )
}

