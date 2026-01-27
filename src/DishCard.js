import classes from './DishCard.module.css';
import bell from "./components/assets/Dish icon.svg";
import { Link } from 'react-router';

export default function DishCard (props) {
    const a = props.item.pic;
    return (
        <article className={classes.specialCard}>
            <img className={classes.dishPic} src={require(`./components/assets/${a}`)} alt={"A picture of a " + props.item.title}></img>
            <h2>{props.item.title}</h2>
            <h3>{props.item.price}</h3>
            <h4>{props.item.desc}</h4>
            <Link to="/order" aria-label="Click to order online" className={classes.order}>
                <p>Order a delivery</p>
                <img className={classes.bell} src={bell} alt="An icon of a bell"></img>
            </Link>
        </article>
    )
}

