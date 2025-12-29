import RankCard from "./RankCard"
import classes from "./Aside.module.css"
import pic1 from "./components/assets/restaurant.jpg"
import pic2 from "./components/assets/restaurant chef B.jpg"


export default function Aside () {

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

    return (
        <aside>
            <section className={classes.testimonials}>
                <h2>Testimonials</h2>
                <div className={classes.testimonialCards}>
                    {reviews.map((person, index) => <RankCard person={person} key={index}/>)}
                </div>
            </section>
            <section className={classes.about}>
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
                    <p className={classes.aboutPSmall} id={classes.aboutPSmall}>Little Lemon is owned by two Italian brothers, Mario and Adrian,
                        who moved to the United States to pursue their shared dream of opening a restaurant.</p>
                    <a className={classes.readMore} id={classes.readMore}>Read more...</a>
                </section>
                <section className={classes.right}>
                    <img src={pic1} className={`${classes.photos} ${classes.pic1}`}></img>
                    <img src={pic2} className={`${classes.photos} ${classes.pic2}`}></img>
                </section>
            </section>
        </aside>
    )
}

