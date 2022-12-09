import { useState, useEffect } from "react";
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const submitHandler = async event => {
        event.preventDefault();
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/login/', {
                method: 'POST',
                body: JSON.stringify(formData),
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

    const emailChangeHandler = (event) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                email: event.target.value,
            };
        });
    }

    const passwordChangeHandler = (event) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                password: event.target.value,
            };
        });
    }

    return (
        <>
          <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}} onError={() => {console.log('Login Failed');}} />

          <form method='post' onSubmit={submitHandler} >
              <input type='email' name='email' placeholder='Your Email Address' onChange={emailChangeHandler} />
              <input type='password' name='password' placeholder='Your Password' onChange={passwordChangeHandler} />
              <button type='submit'>submit</button>

              <p className='error'>{error}</p>

              <Link href='./forgot_password' className="text-3xl">Forgot Password ?</Link>
          </form>
        </>
    );
}

export default Login;