import classes from "./LoginForm.module.css";
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useLogin } from "./LoginContext";
import close from "./components/assets/close.png";



export default function LoginForm () {

const {popup, setPopup} = useLogin();
const [width,setWidth] = useState(window.innerWidth);

useEffect (() => {
        const handleResize = () => {
            if (window.innerWidth != width) {
                setPopup(false);
                setWidth(window.innerWidth);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => {
     window.removeEventListener("resize", handleResize);
   };
    }, []);

const formik = useFormik({
initialValues: {
    email: "",
    password: "",
  },
onSubmit: values => {
    console.log("Form submitted");
    // alert(JSON.stringify(values, null, 2));
  },
validationSchema: object({
    email: string().email("Invalid email").required("Required"),
    password: string().required("Required").min(8,"At least 8 characeters"),
  }),
});

const formikNew = useFormik({
initialValues: {
    email: "",
    address: "",
    phone: "",
    password: "",
  },
onSubmit: values => {
    console.log("Account created");
    // alert(JSON.stringify(values, null, 2));
  },
validationSchema: object({
    email: string().email("Invalid email").required("Required"),
    address: string().required("Required").min(10, "Invalid address"),
    phone: number().required("Required").min(9, "Invalid phone number"),
    password: string().required("Required").min(8,"At least 8 characeters"),
  }),
});

const [formType, setFormType] = useState("login");
const handleClick = () => setPopup(false);
// console.log(formType);

    return (
        <div id={classes.loginBox}>
            {formType == "login" ? <>
            <h1 className={classes.formTitle}>Login</h1>
            <img src={close} className={classes.close} onClick={handleClick}></img>
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
                <button type="submit">Submit</button>
            </form></>
            :
            <>
            <h1 className={classes.formTitle}>Create account</h1>
            <img src={close} className={classes.close} onClick={handleClick}></img>
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
                    type="number"
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
                <button type="submit">Submit</button>
            </form>
            </>}
            {formType == "login" ? <p onClick={() => setFormType("newAccount")} className={classes.formType}>Don't have an account? Register</p> : <p className={classes.formType} onClick={() => setFormType("login")}>Have an account? Login</p>}
        </div>
    )
}