import { useState, useEffect } from "react";
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import hero from "../public/login_hero.png";
import logo from "../public/epatra.png";

const Login = () => {
    useEffect(() => {
        document.body.classList.add("bg-primary-variant");
    });
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
        <section className="inline-flex bg-background absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-8 rounded-md border border-outline">
                <div className="login-form flex flex-col justify-center items-center">
                    <img className="self-start h-[60px] mb-4" src={logo.src} />
                    <h1 className="font-primary font-bold text-3xl text-center text-primary">Login</h1>
                    <p className="text-secondary text-center text-md mb-8">Know what's going around the globe...</p>

                    <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}} onError={() => {console.log('Login Failed');}} />
                
                    <p className="my-4 uppercase text-tertiary font-secondary font-bold">or</p>

                    <form method='post' onSubmit={submitHandler} className="inline-flex flex-col items-center">
                        <input className="bg-background  mb-2 w-80" type='email' name='email' placeholder='Your Email Address' onChange={emailChangeHandler} />
                        <input className="bg-background mb-2 w-80" type='password' name='password' placeholder='Your Password' onChange={passwordChangeHandler} />

                        <div className="flex justify-between w-full">
                            <div>
                                <input type="checkbox" id="remember" />
                                <label for="remember" className="mx-1.5 text-onbackground">Remember me</label>
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
    );
}

export default Login;