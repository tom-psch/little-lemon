import classes from "./Reservations.module.css"
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from "formik";
import { useLogin } from "./LoginContext";
export default function Reservation () {

const {popup, setPopup} = useLogin();
const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const formik = useFormik({
initialValues: {
    name: "",
    phone: "",
    date: "",
    time: "",
    occasion: "",
    people: "1",
    cancel: false,
  },
onSubmit: (values,{resetForm}) => {
    alert("Reservation completed!");
    resetForm();
    // alert(JSON.stringify(values, null, 2));
  },
validationSchema: object({
    name: string().min(3, "Invalid name").required("Required").matches(/^[^0-9]+$/, "Numbers are not allowed in this field"),
    phone: string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
    date: date().required("Required"),
    time: string().required("Required"),
    occasion: string().required("Required"),
    people: number().required("Required").min(1,"One guest minimun").max(6,"More than 6 guests? Contact us!"),
    cancel: string().required().oneOf(["true"],"Please agree to continue"),
  }),
});

    return (
        <main className={!popup ? classes.main : `${classes.main} blurred`}>
            <h1>Reserve a table</h1>
            <form className={classes.reservationForm} onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" {...formik.getFieldProps('name')}></input>
                {formik.touched.name && formik.errors.name ? <p className={classes.errors}>{formik.errors.name}</p> : <></>}

                <label htmlFor="phone">Phone number</label>
                <input id="phone" type="text" {...formik.getFieldProps('phone')}></input>
                {formik.touched.phone && formik.errors.phone ? <p className={classes.errors}>{formik.errors.phone}</p> : <></>}

                <fieldset className={classes.dateTime}>
                    <legend>Date and time of booking</legend>
                    {/* <label htmlFor="date"></label>
                    <label htmlFor="time"></label> */}
                    <input id="date" type="date" {...formik.getFieldProps('date')}></input>
                    <input id="time" type="time" {...formik.getFieldProps('time')}></input>
                    {formik.touched.date && formik.errors.date ? <p className={classes.errors}>{formik.errors.date}</p> : <></>}
                    {formik.touched.time && formik.errors.time ? <p className={classes.errors}>{formik.errors.time}</p> : <></>}
                </fieldset>
                

                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" {...formik.getFieldProps('occasion')}>
                    <option value="" hidden></option>
                    <option value="casual">Casual meeting</option>
                    <option value="birthday">Birthday</option>
                    <option value="engagement">Engagement</option>
                    <option value="anniversary">Anniversary</option>
                </select>
                {formik.touched.occasion && formik.errors.occasion ? <p className={classes.errors}>{formik.errors.occasion}</p> : <></>}

                <label htmlFor="people">Number of people</label>
                <input id="people" type="number" step="1" min="1" max="6" {...formik.getFieldProps('people')}></input>
                {formik.touched.people && formik.errors.people ? <p className={classes.errors}>{formik.errors.people}</p> : <></>}

                <div className={classes.cancelPolicy}>
                    <label htmlFor="cancel">I agree to the cancellation policy</label>
                    <input id="cancel" type="checkbox" {...formik.getFieldProps('cancel')}></input>
                    {formik.touched.cancel && formik.errors.cancel ? <p className={classes.errors}>{formik.errors.cancel}</p> : <></>}
                </div>

                <button type="submit">Complete reservation</button>

            </form>
        </main>
    )
};