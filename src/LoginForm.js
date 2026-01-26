import classes from "./LoginForm.module.css";
import { object, string } from 'yup';
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useLogin } from "./LoginContext";
import close from "./components/assets/close.png";
import { useLocation } from "react-router";
import { Link } from "react-router";

export default function LoginForm () {

const {popup, setPopup} = useLogin();
const [width,setWidth] = useState(window.innerWidth);
const location = useLocation();

useEffect (() => {
        const handleResize = () => {
            if (window.innerWidth !== width) {
                setPopup(false);
                setWidth(window.innerWidth);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => {
     window.removeEventListener("resize", handleResize);
   };
    }, [width]);

const formik = useFormik({
initialValues: {
    email: "",
    password: "",
  },
onSubmit: async values => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Form submitted");
    setPopup(false);
    // alert(JSON.stringify(values, null, 2));
  },
validationSchema: object({
    email: string().email("Invalid email").required("Required"),
    password: string().required("Required").min(8,"At least 8 characeters"),
  }),
});
const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const formikNew = useFormik({
initialValues: {
    email: "",
    address: "",
    phone: "",
    password: "",
  },
onSubmit: async values => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Account created");
    setPopup(false);
    // alert(JSON.stringify(values, null, 2));
  },
validationSchema: object({
    email: string().email("Invalid email").required("Required"),
    address: string().required("Required").min(10, "Invalid address"),
    phone: string().matches(phoneRegExp, 'Phone number is not valid'),
    password: string().required("Required").min(8,"At least 8 characeters"),
  }),
});

const [formType, setFormType] = useState("login");
const handleClick = (e) => {
    e.preventDefault();
    setPopup(false);
}
const handleLoginType = (e) => {
    e.preventDefault();
    formType === "login" ? setFormType("newAccount") : setFormType("login");

}

    return (
        <div id={classes.loginBox}>
            {formType === "login" ? <>
            <h1 className={classes.formTitle}>Login</h1>
            <Link to={location} aria-label="Click to close login dialog" onClick={handleClick}><img src={close} className={classes.close} alt="A cross to close the popup"></img></Link>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? <p className={classes.errors}>{formik.errors.email}</p> : <></>}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? <p className={classes.errors}>{formik.errors.password}</p> : <></>}
                <button type="submit" disabled={!formik.isValid || formik.isSubmitting || !formik.dirty }
                className={(!formik.isValid || formik.isSubmitting || !formik.dirty) ? classes.disabled : ""}>Submit</button>
            </form></>
            :
            <>
            <h1 className={classes.formTitle}>Create account</h1>
            <Link to={location} aria-label="Click to close login dialog"><img src={close} className={classes.close} onClick={handleClick} aria-label="Close login popup"></img></Link>
            <form onSubmit={formikNew.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    {...formikNew.getFieldProps('email')}
                />
                {formikNew.touched.email && formikNew.errors.email ? <p className={classes.errors}>{formikNew.errors.email}</p> : <></>}
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    {...formikNew.getFieldProps('address')}
                />
                {formikNew.touched.address && formikNew.errors.address ? <p className={classes.errors}>{formikNew.errors.address}</p> : <></>}
                <label htmlFor="phone">Phone number</label>
                <input
                    id="phone"
                    type="text"
                    {...formikNew.getFieldProps('phone')}
                />
                {formikNew.touched.phone && formikNew.errors.phone ? <p className={classes.errors}>{formikNew.errors.phone}</p> : <></>}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...formikNew.getFieldProps("password")}
                />
                {formikNew.touched.password && formikNew.errors.password ? <p className={classes.errors}>{formikNew.errors.password}</p> : <></>}
                <button type="submit" disabled={!formikNew.isValid || formikNew.isSubmitting || !formikNew.dirty }
                className={(!formikNew.isValid || formikNew.isSubmitting || !formikNew.dirty) ? classes.disabled : ""}>Submit</button>
            </form>
            </>}
            <Link to={location} onClick={handleLoginType} className={classes.formType}><p>{formType === "login" ? "Don't have an account? Register" : "Have an account? Login"}</p></Link>
        </div>
    )
}