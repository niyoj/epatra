import { useState, useEffect } from "react";
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik } from "formik";
import { logInSchema} from "../schemas/login.js";

const initialValues={
    email:"",
    password:"",
}
const Login = () => {
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
        <>
          <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}} onError={() => {console.log('Login Failed');}} />

          <form onSubmit={handleSubmit} >
          <label className="" htmlFor="email"> Email: </label>
          <input type='email' id="email" name='email' placeholder='Your Email Address' onChange={handleChange} value={values.email} onBlur={handleBlur} />
          {<div className="text-error">{errors.email && touched.email ? (
            <div>{errors.email}</div>
           ) : null}</div>}
           <br/>
           <label className="" htmlFor="password">Password:</label>
              <input type='password' id="password" name='password' placeholder='Your Password' onChange={handleChange} value={values.password} onBlur={handleBlur} />
              {<div className="text-error">{errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}</div>}
           <br/>
              <Link href='/forgot_password' className="text-primary">Forgot Password ?</Link>
              <br/>
              <button type='submit'>submit</button>

              <p className='error'>{error}</p>
          </form>
        </>
    );
}

export default Login;