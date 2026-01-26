import classes from "./Reservations.module.css"
import close from "./components/assets/close.png";
import { Link } from "react-router";
import { useLogin } from "./LoginContext";

export default function ConfirmedBooking () {

    const { popup } = useLogin();

    return (
        <main inert={popup} className={popup ? `${classes.main} blurred` : classes.main}>
            <h1>Reserve a table</h1>
            <div className={classes.formSubmission} >
                <Link to="/" aria-label="Click to close confirmation dialog"><img src={close} alt="A cross to close the popup"></img></Link>
                <p>Your booking was successful!</p>
            </div>
        </main>

    )

}