import RankCard from "./RankCard"
import classes from "./Aside.module.css"
import pic1 from "./components/assets/restaurant.jpg"
import pic2 from "./components/assets/restaurant chef B.jpg"
import { useLogin } from "./LoginContext"
import { useState, useEffect, useRef} from "react";

const reviews = [{
    img: "joseph.jpg",
    name: "Joseph G.",
    user: "JojoGH.87",
    text: "“Such a chilled out atmosphere - love it!”",
    stars: 5
},
{
    img: "reza.jpg",
    name: "Reza B.",
    user: "BranxReza",
    text: "“We had such a great time celebrating my grandmothers bitthday!”",
    stars: 5
},
{
    img: "Justin.jpg",
    name: "Justin S.",
    user: "Justin-2525",
    text: "“Seriously cannot stop thinking about the Turkish Mac n’ Cheese!!”",
    stars: 5
},
{
    img: "Danielle.jpg",
    name: "Danielle W.",
    user: "Dani_wills",
    text: "“Best Feta Salad in town. Flawless everytime!”",
    stars: 5
}]

export default function Aside () {

    const {popup} = useLogin();
    const [expand, setExpand] = useState (false);
    const width = useRef (window.innerWidth);

    useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth !== width.current) {
                    expand && setExpand(false);
                }
            }
            window.addEventListener("resize", handleResize);
            return () => {
        window.removeEventListener("resize", handleResize);
    };
    },[expand]);

    const handleReadMore = () => setExpand(true);
    const handleEnter = (e) => e.key === "Enter" && setExpand(true);

        return (
            <aside className={popup ? "blurred" : ""} inert={popup}>
                <section className={classes.testimonials}>
                    <h2>Testimonials</h2>
                    <div className={classes.testimonialCards}>
                        {reviews.map((person, index) => <RankCard person={person} key={index}/>)}
                    </div>
                </section>
                <section className={classes.about} id="about">
                    <section className={classes.left}>
                        <div className={classes.aboutHeader}>
                            <h1 className={classes.aboutH1}>Little Lemon</h1>
                            <h2 className={classes.aboutH2}>Chicago</h2>
                        </div>
                        <p className={classes.aboutP} id={classes.aboutP}>Little Lemon is owned by two Italian brothers, Mario and Adrian,
                            who moved to the United States to pursue their shared dream of opening a restaurant.
                            <br/>Drawing on cherished family recipes, they developed the menu and expanded it beyond classic
                            Italian dishes to include a variety of flavors and
                            specialties from across the Mediterranean region.</p>
                        {!expand ? <>
                        <p className={classes.aboutPSmall} id={classes.aboutPSmall}>Little Lemon is owned by two Italian brothers, Mario and Adrian,
                            who moved to the United States to pursue their shared dream of opening a restaurant.</p>
                        <p className={classes.readMore} id={classes.readMore} onClick={handleReadMore} tabIndex={0} onKeyDown={handleEnter}>Read more...</p>
                        </>
                        :
                        <p className={classes.aboutPSmall} id={classes.aboutPSmall}>Little Lemon is owned by two Italian brothers, Mario and Adrian,
                            who moved to the United States to pursue their shared dream of opening a restaurant.
                            <br/>Drawing on cherished family recipes, they developed the menu and expanded it beyond classic
                            Italian dishes to include a variety of flavors and
                            specialties from across the Mediterranean region.</p>
                        }
                    </section>
                    <section className={classes.right}>
                        <img src={pic1} className={`${classes.photos} ${classes.pic1}`} alt="Little Lemon's Deck"></img>
                        <img src={pic2} className={`${classes.photos} ${classes.pic2}`} alt="Cooking chef"></img>
                    </section>
                </section>
            </aside>
        )
}


