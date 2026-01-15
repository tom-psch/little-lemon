import DishCard from "./DishCard";
import landingPic from "./components/assets/restauranfood.jpg";
import classes from './Main.module.css';
import { useLogin } from "./LoginContext";

var dishes = [{
    pic: "greek salad.jpg",
    title: "Greek salad",
    price: "$12.99",
    desc: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    link: "https://www.google.com"
},{
    pic: "bruchetta.svg",
    title: "Bruchetta",
    price: "$5.99",
    desc: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    link: "https://www.google.com"
},{
    pic: "lemon dessert.jpg",
    title: "Lemon Dessert",
    price: "$5.00",
    desc: "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    link: "https://www.google.com"
}]


export default function Main () {

const {popup} = useLogin();
// console.log(popup);

    return (
        <main className={popup ? "blurred" : ""}>
            <article className={classes.landing}>
                <section className={classes.reservation}>
                    <div className={classes.mainHeader}>
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                    </div>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <button>Reserve a Table</button>
                </section>
            </article>
            <img className={classes.landingPic} alt="A waitress serving bruchetta" src={landingPic}></img>
            <article className={classes.specials}>
                <section className={classes.specialsToMenu}>
                    <h1 id="menu">This week's specials!</h1>
                    <button>Online Menu</button>
                </section>
                <section className={classes.specialsCards}>
                    <DishCard item={dishes[0]}/>
                    <DishCard item={dishes[1]}/>
                    <DishCard item={dishes[2]}/>
                </section>
            </article>
        </main>
    )
}

