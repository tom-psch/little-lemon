import classes from "./Reservations.module.css"
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from "formik";
import { useLogin } from "./LoginContext";
import { useState } from "react";

export default function Reservation (props) {
const {popup, setPopup} = useLogin();
const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const [selectedDay,setSelectedDay] = useState("");
const [selectedTimes,setSelectedTimes] = useState([]);

const availableTimes = props.availableTimes;

function handleDaySelection (e) {
    formik.handleChange(e);
    setSelectedDay(e.target.value);
    setSelectedTimes(availableTimes.filter(day => day.day == e.target.value)[0].times);
    formik.setFieldValue("timeSel","");
    formik.setFieldTouched("timeSel",false);
}


const formik = useFormik({
initialValues: {
    daySel:"",
    timeSel:"",
    name: "",
    phone: "",
    occasion: "",
    people: "1",
    cancel: false,
  },
onSubmit: (values,{resetForm}) => {
    resetForm();
    props.dispatch({
        type: "selected_day_time",
        day: formik.values.daySel,
        time: formik.values.timeSel,
    });
    alert(JSON.stringify(values, null, 2));
  },
validationSchema: object({
    daySel: string().required("Required"),
    timeSel: string().required("Required"),
    name: string().min(3, "Invalid name").required("Required").matches(/^[^0-9]+$/, "Numbers are not allowed in this field"),
    phone: string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
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
                    <select id="daySel" {...formik.getFieldProps('daySel')} onChange={handleDaySelection}>
                        <option hidden></option>
                        {availableTimes.map((day, index) => <option key={index}>{day.day}</option>)}
                    </select>
                    <select id="timeSel" className={classes.timeSelect} {...formik.getFieldProps('timeSel')}>
                        <option hidden></option>
                        {selectedTimes.map((time,index) => time.available ? <option key={index}>{time.time}</option> : <option key={index} disabled>{`${time.time} - Reserved`}</option>)}
                    </select>

                    {(formik.touched.daySel && formik.errors.daySel) || (formik.touched.timeSel && formik.errors.timeSel) ? <p className={classes.errors}>Required time and date</p> : <></>}
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
                    <input id="cancel" type="checkbox" checked={formik.values.cancel}{...formik.getFieldProps('cancel')}></input>
                    {formik.touched.cancel && formik.errors.cancel ? <p className={classes.errors}>{formik.errors.cancel}</p> : <></>}
                </div>

                <button type="submit">Complete reservation</button>

            </form>
        </main>
    )
};