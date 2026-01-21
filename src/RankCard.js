import classes from "./RankCard.module.css"
import star from "./components/assets/star.png"

export default function RankCard (props) {
    let stars= [];
    let i = props.person.stars;
    while (i >0 ) {
        stars = [...stars,<img className={classes.star} src={star} key={i} alt="Ranking star"></img>];
        i--;
    }
    let a = props.person.img;
    return (
        <article className={classes.container}>
            <div className={classes.rating}>
                {stars}
            </div>
            <img className={classes.pic} src={require(`./components/assets/${a}`)} alt={"A picture of a cutomer"}></img>
            <h3 className={classes.name}>{props.person.name}</h3>
            <h4 className={classes.user}>{props.person.user}</h4>
            <p className={classes.text}>{props.person.text}</p>
        </article>
    )
}