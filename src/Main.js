import Card from "./Card"
import landingPic from "./components/icons_assets/restauranfood.jpg";

export default function Main () {
    return (
        <main>
            <article className="landing">
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                <button>Reserve a Table</button>
                <img alt="A waitress serving bruchetta" width="200px" src={landingPic}></img>
            </article>
            <article className="specials">
                <h1>This week's specials!</h1>
                <button>Online Menu</button>
                <Card />
                <Card />
                <Card />
            </article>
        </main>
    )
}

