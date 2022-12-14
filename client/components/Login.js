import { useState, useEffect } from "react";
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import hero from "../public/login_hero.png";
import { useFormik } from "formik";
import { logInSchema} from "../schemas/login.js";
import FormData from "form-data";
import axios from "axios";
import {useRouter} from "next/router";

const initialValues = {
    email:"",
    password:"",
    username: "",
}
const Login = () => {
    const router = useRouter();
    useEffect(() => {
        document.body.classList.add("bg-primary-variant");
    });

    const {values, touched, errors, handleBlur, handleChange, handleSubmit}=useFormik({
        initialValues,
        validationSchema: logInSchema,
        onSubmit:(values,action)=>{
            console.log(values);
            submitHandler();
            action.resetForm();
            
        }
    })

    const [error, setError] = useState(null);

    if (typeof window !== 'undefined') {
        if (localStorage.getItem("isLoggedIn") == "true") {
            router.push("./");
        }
    }

    const submitHandler = async () => {
        setError(null);
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("email", values.email);
            bodyFormData.append("password", values.password);
            const {data} = await axios.post(
                "http://localhost:8000/api/v1/auth/login/",
                bodyFormData,
                  {
                    headers: {
                      "Content-type": "multipart/form-data",
                    }
                  },
                  );
                  console.log(data);
                  if(typeof window !== "undefined"){
                      
                      localStorage.setItem('refreshToken', data.refresh);
                    localStorage.setItem('accessToken', data.access);
                   localStorage.setItem('isLoggedIn', true);
                   localStorage.setItem('username', values.username);
                  }
            router.push("./");
            window.location.reload();
        } catch(error) {
            setError(error.message); 
        }
    }

    return (
        <section className="inline-flex bg-background absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-8 rounded-md border border-outline shadow-xl">
            <div className="login-form flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl text-center text-primary">Login</h1>
                <p className="text-secondary text-center text-md mb-8">Know what's going around the globe...</p>

                <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}} onError={() => {console.log('Login Failed');}} />
            
                <p className="uppercase text-tertiary text-center text-md mt-4">or</p>

                <form method='post' onSubmit={handleSubmit} className="inline-flex flex-col items-center">
                    <div className="mb">
                        <label className={`block font-extrabold mb-2 ${touched.username && errors.username ? "text-error": "text-onbackground"}`}>Username</label>
                        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.username && errors.username ? "border-error text-error" : "border-primary text-onbackground"}`} type='text' name='username' placeholder='Your Username' onChange={handleChange} value={values.username} onBlur={handleBlur} />
                    </div>

                    <div className="">
                        <label className={`block font-extrabold mb-2 ${touched.email && errors.email ? "text-error": "text-onbackground"}`}>Email</label>
                        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.email && errors.email ? "border-error text-error" : "border-primary text-onbackground"}`} type='email' name='email' placeholder='Your Email Address' onChange={handleChange} value={values.email} onBlur={handleBlur} />
                        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.email && errors.email ? errors.email: null }</p>
                    </div>

                    <div>
                    <label className={`block font-extrabold mb-2 ${touched.password && errors.password ? "text-error" : "text-onbackground"}`}>Password</label>
                        <input className={`block bg-background border-primary w-80 border-0 border-b-2 focus:outline-0 ${touched.password && errors.password ? "border-error text-error": "border-primary text-onbackground"}`} type='password' name='password' placeholder='Your Password' onChange={handleChange} value={values.password} onBlur={handleBlur} />
                        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.password && errors.password ? errors.password: null }</p>
                    </div>

                    <div className="flex justify-between w-full mt-2">
                        <div>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" className="mx-1.5 text-onbackground">Remember me</label>
                        </div>
                        <Link href='/forgot-password' className="text-secondary text-onbackground">Forgot password?</Link>
                    </div>

                    <button type='submit' className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-full hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary" disabled={(touched.email && errors.email)||(touched.password && errors.password) ? true : false}>submit</button>
                </form>

                <p className="mt-5">Don't have an account? <Link className="text-primary font-bold" href="./register">Sign Up</Link></p>
            </div>

            <div className="hidden lg:block relative w-[500px]">
                <img src={hero.src} alt="illustration of news" className="relative top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4" />
            </div>
        </section>
    );
}

export default Login;