import classes from "./Reservations.module.css"
import close from "./components/assets/close.png";
import { useNavigate } from "react-router";


export default function ConfirmedBooking () {
const handleClick = () => {
    navigate("/");
}
let navigate = useNavigate();
    return (
        <main className={classes.main}>
            <h1>Reserve a table</h1>
            <div className={classes.formSubmission}>
                <img src={close} onClick={handleClick}></img>
                <p>Your booking was successful!</p>
            </div>
        </main>

    )

}