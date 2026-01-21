import classes from "./Footer.module.css"
import footerPic from "./components/assets/Mario and Adrian A.jpg"
import { useLogin } from "./LoginContext";
import { NavLink, Link } from "react-router";
import { HashLink } from "react-router-hash-link";

export default function Footer () {

const {popup,setPopup} = useLogin();

const loginClick = (e) => {
        e.preventDefault();
        setPopup();
    }

const handleHome = () => window.scrollTo({top:0,behavior:"smooth"});

    return (
        <footer className={popup ? "blurred" : ""}>
            <section className={classes.footer}>
                <img className={classes.footerPic} src={footerPic}></img>
                <div className={classes.footerRight}>
                    <div className={classes.doormatNav}>
                        <h4 className={classes.title}>Little Lemon</h4>
                        <ul>
                            <li><HashLink to="/" onClick={handleHome}>Home</HashLink></li>
                            <li><HashLink smooth to="/#about">About</HashLink></li>
                            <li><HashLink smooth to="/#menu">Menu</HashLink></li>
                            <li><NavLink to="/reservation">Reservations</NavLink></li>
                            <li><NavLink to="/order">Order Online</NavLink></li>
                            <li><NavLink to="/" onClick={loginClick}>Login</NavLink></li>
                        </ul>
                    </div>
                    <div className={classes.contactFooter}>
                        <h4 className={classes.title}>Contact</h4>
                        <div className={classes.middleContainer}>
                            <p>328 Little Lemon St.,<br/> Chicago, Illinois</p>
                            <Link to="tel:+13124827691">(312) 482 - 7961</Link>
                            <Link to="mailto:hi@littlelemon.com">hi@littlelemon.com</Link>
                        </div>
                    </div>
                    <div className={classes.socialsFooter}>
                        <h4 className={classes.title}>Social Media</h4>
                        <ul id={classes.socials}>
                            <li><Link to={{ pathname: "https://facebook.com/" }} target="_blank">Facebook</Link></li>
                            <li><Link to={{ pathname: "https://instagram.com/" }} target="_blank">Instagram</Link></li>
                            <li><Link to={{ pathname: "https://youtube.com/" }} target="_blank">YouTube</Link></li>
                            <li><Link to={{ pathname: "https://tripadvisor.com/" }} target="_blank">Tripadvisor</Link></li>
                        </ul>
                    </div>
                </div>
                <p className={classes.copyright}>© Little Lemon | 2026</p>
            </section>
        </footer>
    )
}