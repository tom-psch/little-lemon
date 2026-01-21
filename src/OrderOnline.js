import classes from './OrderOnline.module.css';
import { useLogin } from './LoginContext';

export default function OrderOnline () {
const {popup, setPopup} = useLogin();

    return (
        <main className={!popup ? classes.main : `${classes.main} blurred`}>
            <h1>Order Online</h1>
            <div className={classes.orderOnline}>
                <h2 onClick={setPopup}>Please sign in or register to continue</h2>
            </div>
        </main>
        )
}