import { useState, useEffect } from "react";
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import hero from "../public/login_hero.png";
import logo from "../public/epatra.png";
import { useFormik } from "formik";
import { logInSchema} from "../schemas/login.js";

const initialValues={
    email:"",
    password:"",
}
const Login = () => {
    useEffect(() => {
        document.body.classList.add("bg-primary-variant");
    });
    const {values,touched, errors, handleBlur, handleChange,handleSubmit}=useFormik({
        initialValues,
        validationSchema: logInSchema,
        onSubmit:(values,action)=>{
            // console.log(values);
            submitHandler();
            action.resetForm();
        }
    })
    const [error, setError] = useState(null);

    const submitHandler = async () => {
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/login/', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            console.log(data);
            if (typeof window !== 'undefined') {
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('accessToken', data.access);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="inline-flex bg-background absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-8 rounded-md border border-outline">
                <div className="login-form flex flex-col justify-center items-center">
                    <img className="self-start h-[60px] mb-4" src={logo.src} />
                    <h1 className="font-primary font-bold text-3xl text-center text-primary">Login</h1>
                    <p className="text-secondary text-center text-md mb-8">Know what's going around the globe...</p>

                    <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}} onError={() => {console.log('Login Failed');}} />
                
                    <p className="my-4 uppercase text-tertiary font-secondary font-bold">or</p>

                    <form method='post' onSubmit={handleSubmit} className="inline-flex flex-col items-center">
                        <div className="">
                        <input className="bg-background  mb-3 w-80" type='email' name='email' placeholder='Your Email Address' onChange={handleChange} value={values.email} onBlur={handleBlur} />
                        {<div className="text-error italic">{errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}</div>}
                        </div>
                        <div>
                        <input className="bg-background mb-2 w-80" type='password' name='password' placeholder='Your Password' onChange={handleChange} value={values.password} onBlur={handleBlur} />
                              {<div className="text-error italic">{errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}</div>}
                        </div>

                        <div className="flex justify-between w-full">
                            <div>
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember" className="mx-1.5 text-onbackground">Remember me</label>
                            </div>
                            <Link href='./forgot_password' className="text-secondary text-onbackground">Forgot password?</Link>
                        </div>

                        <button type='submit' className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-full">submit</button>
                    </form>

                    <p className="mt-5">Don't have an account? <Link className="text-primary font-bold" href="./register">Sign Up</Link></p>
                </div>

                <div className="hidden lg:block relative">
                    <img src={hero.src} alt="illustration of news" className="bject-contain relative top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4" />
                </div>
        </section>
        //   <form onSubmit={handleSubmit} >
        //   <label className="" htmlhtmlFor="email"> Email: </label>
        //   <input type='email' id="email" name='email' placeholder='Your Email Address' onChange={handleChange} value={values.email} onBlur={handleBlur} />
        //   {<div className="text-error">{errors.email && touched.email ? (
        //     <div>{errors.email}</div>
        //    ) : null}</div>}
        //    <br/>
        //    <label className="" htmlhtmlFor="password">Password:</label>
        //       <input type='password' id="password" name='password' placeholder='Your Password' onChange={handleChange} value={values.password} onBlur={handleBlur} />
        //       {<div className="text-error">{errors.password && touched.password ? (
        //      <div>{errors.password}</div>
        //    ) : null}</div>}
        //    <br/>
        //       <Link href='/forgot_password' className="text-primary">Forgot Password ?</Link>
        //       <br/>
        //       <button type='submit'>submit</button>

        //       <p className='error'>{error}</p>
        //   </form>
    );
}

export default Login;