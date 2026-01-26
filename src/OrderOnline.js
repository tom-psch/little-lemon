import classes from './OrderOnline.module.css';
import { useLogin } from './LoginContext';
import { Link } from 'react-router';

export default function OrderOnline () {
const {popup, setPopup} = useLogin();

const handleClick = (e) => {
    e.preventDefault();
    setPopup();
}

    return (
        <main className={!popup ? classes.main : `${classes.main} blurred`} inert={popup}>
            <h1>Order Online</h1>
            <div className={classes.orderOnline}>
                <Link onClick={handleClick}><h2>Please sign in or register to continue</h2></Link>
            </div>
        </main>
        )
}