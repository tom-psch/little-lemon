import classes from "./Footer.module.css"
import footerPic from "./components/assets/Mario and Adrian A.jpg"

export default function Footer () {
    return (
        <footer>
            <section className={classes.footer}>
                <img className={classes.footerPic} src={footerPic}></img>
                <div className={classes.footerRight}>
                    <div className={classes.doormatNav}> 
                        <h4 className={classes.title}>Little Lemon</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">About</a></li>
                            <li><a href="/">Menu</a></li>
                            <li><a href="/">Reservations</a></li>
                            <li><a href="/">Order Online</a></li>
                            <li><a href="/">Login</a></li>
                        </ul>
                    </div>
                    <div className={classes.contactFooter}>
                        <h4 className={classes.title}>Contact</h4>
                        <div className={classes.middleContainer}>
                            <p>328 Little Lemon St.,<br/> Chicago, Illinois</p>
                            <a href="">(312) 482 - 7961</a>
                            <a href="/">hi@littlelemon.com</a>
                        </div>
                    </div>
                    <div className={classes.socialsFooter}>
                        <h4 className={classes.title}>Social Media</h4>
                        <ul id={classes.socials}>
                            <li><a href="/">Facebook</a></li>
                            <li><a href="/">Instagram</a></li>
                            <li><a href="/">YouTube</a></li>
                            <li><a href="/">Tripadvisor</a></li>
                        </ul>
                    </div>
                </div>
                <p className={classes.copyright}>© Little Lemon | 2025</p>
            </section>
        </footer>
    )
}

