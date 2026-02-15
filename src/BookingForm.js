import classes from "./BookingForm.module.css"
import { object, string, number, date } from 'yup';
import { useFormik } from "formik";
import { useLogin } from "./LoginContext";

export default function BookingForm ({availableTimes, dispatch, submitForm}) {
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
            day: new Date(e.target.value),
        });
        formik.setFieldValue("timeSel","");
        formik.setFieldTouched("timeSel", false)
        formik.setFieldError("timeSel", false)
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
    daySel: date().required("Select day").min(new Date().toISOString().split('T')[0], "Invalid day"),
    timeSel: string().required("Select time"), //.test({name:"Can't be default", message: "Requireds", test: (value) => value!=""}),
    name: string().min(3, "Please input at least 3 characters").required("Required").matches(/^[^0-9]+$/, "Numbers are not allowed in this field"),
    phone: string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
    occasion: string().required("Required"),
    people: number().required("Required").min(1,"One guest minimun").max(6,"More than 6 guests? Contact us!"),
    cancel: string().required().oneOf(["true"],"Please agree to continue"),
  }),
});

    return (
        <main className={!popup ? classes.main : `${classes.main} blurred`} inert={popup}>
            <h1>Reserve a table</h1>
            <form className={classes.reservationForm} onSubmit={formik.handleSubmit}>

                <label htmlFor="name">Name</label>
                <input id="name" type="text" {...formik.getFieldProps('name')} required minLength="3"></input>
                {formik.touched.name && formik.errors.name ? <p className={classes.errors}>{formik.errors.name}</p> : <></>}

                <label htmlFor="phone">Phone number</label>
                <input id="phone" type="text" {...formik.getFieldProps('phone')} required></input>
                {formik.touched.phone && formik.errors.phone ? <p className={classes.errors}>{formik.errors.phone}</p> : <></>}

                 <fieldset className={classes.dateTime}>
                    <legend>When are you coming?</legend>
                    <label htmlFor="daySel" className={classes.dayLabel}>Day</label>
                    <label htmlFor="timeSel" className={classes.timeLabel}>Time</label>
                    <input type="date" id="daySel" data-testid="daySel" {...formik.getFieldProps('daySel')} min={new Date().toISOString().split('T')[0]} onChange={handleDaySelection} className={classes.daySelect} required>
                    </input>
                    <select id="timeSel" className={classes.timeSelect} data-testid="timeSel"{...formik.getFieldProps('timeSel')} required>
                        <option hidden></option>
                        {availableTimes!== "" && availableTimes.map((time, index) => <option key={index}>{time}</option>)}
                    </select>
                    {(formik.touched.daySel && formik.errors.daySel) && <p className={`${classes.errors} ${classes.dayError}`}>{formik.errors.daySel}</p>}
                    {(formik.touched.timeSel && formik.errors.timeSel) && <p className={`${classes.errors} ${classes.timeError}`}>{formik.errors.timeSel}</p>}
                </fieldset>

                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" {...formik.getFieldProps('occasion')} className={classes.occasion} required>
                    <option value="" hidden></option>
                    <option value="casual">Casual meeting</option>
                    <option value="birthday">Birthday</option>
                    <option value="engagement">Engagement</option>
                    <option value="anniversary">Anniversary</option>
                </select>
                {formik.touched.occasion && formik.errors.occasion ? <p className={classes.errors}>{formik.errors.occasion}</p> : <></>}

                <label htmlFor="people">Number of people</label>
                <input id="people" type="number" step="1" min="1" max="6" {...formik.getFieldProps('people')} required></input>
                {formik.touched.people && formik.errors.people ? <p className={classes.errors}>{formik.errors.people}</p> : <></>}

                <div className={classes.cancelPolicy}>
                    <label htmlFor="cancel">I agree to the cancellation policy</label>
                    <input id="cancel" type="checkbox" checked={formik.values.cancel} {...formik.getFieldProps('cancel')} required className={classes.cancel}></input>
                    {formik.touched.cancel && formik.errors.cancel ? <p className={classes.errors}>{formik.errors.cancel}</p> : <></>}
                </div>

                <button type="submit" disabled={!formik.isValid || formik.isSubmitting || !formik.dirty }
                className={(!formik.isValid || formik.isSubmitting || !formik.dirty) ? classes.disabled : ""}
                >Complete reservation</button>

            </form>
        </main>
    )
};