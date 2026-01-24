import classes from "./Reservations.module.css"
import { object, string, number, date } from 'yup';
import { useFormik } from "formik";
import { useLogin } from "./LoginContext";
import { useState } from "react";

export default function Reservation ({availableTimes, dispatch, submitForm}) {
const {popup} = useLogin();
const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const selectedDay = new Date().toISOString().split('T')[0];

function handleDaySelection (e) {
    formik.handleChange(e);
    if (e.target.value === "") {
        dispatch({
            type: "erased_day",
        });
    }
    else {
        dispatch({
            type: "selected_day",
            day: e.target.value,
        });
        formik.setFieldValue("timeSel","hh:mm");
    }
}

const formik = useFormik({
initialValues: {
    daySel: selectedDay,
    timeSel: "",
    name: "",
    phone: "",
    occasion: "",
    people: "1",
    cancel: false,
  },
onSubmit: submitForm,
validationSchema: object({
    daySel: date().required("Required"),
    timeSel: string().required("Required").test({name:"Can't be default", message: "Must select time", test: (value) => value!="hh:mm"}),
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
                    <legend>When are you coming?</legend>
                    {/* <label htmlFor="daySel" className={classes.dateLabel}>Date</label> */}
                    {/* <label htmlFor="timeSel" className={classes.timeLabel}>Time</label> */}
                    <input type="date" id="daySel" data-testid="daySel" {...formik.getFieldProps('daySel')} min={new Date().toISOString().split('T')[0]} onChange={handleDaySelection} className={classes.daySelect}>
                    </input>
                    <select id="timeSel" className={classes.timeSelect} data-testid="timeSel"{...formik.getFieldProps('timeSel')}>
                        <option hidden>hh:mm</option>
                        {availableTimes!== "" && availableTimes.map((time, index) => <option key={index}>{time}</option>)}
                    </select>

                    {(formik.touched.daySel && formik.errors.daySel) || (formik.touched.timeSel && formik.errors.timeSel) ? <p className={classes.errors}>Required date and time</p> : <></>}
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

                <button type="submit" disabled={!formik.isValid || formik.isSubmitting || !formik.dirty }
                className={(!formik.isValid || formik.isSubmitting || !formik.dirty) ? classes.disabled : ""}
                >Complete reservation</button>

            </form>
        </main>
    )
};