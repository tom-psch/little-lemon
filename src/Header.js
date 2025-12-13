import Nav from './Nav';
import logo from './components/icons_assets/Logo.svg';
import './Header.css';

export default function Header () {
    return (
        <header>
            <img className="headerLogo" alt="Little Lemon's logo" src={logo}></img>
            <Nav />
        </header>
    )
}

