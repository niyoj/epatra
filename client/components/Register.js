import React, { useState } from "react";
import FormData from "form-data";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/signup";

const initialValues ={
  username:"",
  email:"",
  password:"",
  cpassword:"",
  fname:"",
  lname:"",
}

const Register = () => {
  const {values,touched, errors, handleBlur, handleChange,handleSubmit} = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit:(values,action)=>{
      console.log(values)
      handleBtnRegister();
      action.resetForm();
    }
  })

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userImg, setUserImg] = useState("");
  const handleUploadImage = (e) => {
    let img = e.target.files[0];
    setUserImg(img);
  };
  // const handleChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };

  const handleBtnRegister = async () => {
    try {
        setLoading(true);
        let bodyFormData = new FormData();
        bodyFormData.append("username", values.username);
        bodyFormData.append("email", values.email);
        bodyFormData.append("password", values.password);
        bodyFormData.append("display_picture", userImg);
        bodyFormData.append("first_name", values.fname);
        bodyFormData.append("last_name", values.lname);
        const res = await axios.post(
          "http://localhost:8000/api/v1/auth/register/",
          bodyFormData,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);
        setLoading(false);
        setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="inline-flex bg-background absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-8 rounded-md border border-outline shadow-xl">
      <div className="login-form flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl text-center text-primary">Register</h1>
      <form
        className="inline-flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div>

        <label className={`block font-extrabold mb-2 ${touched.username && errors.username ? "text-error": "text-onbackground"}`} htmlFor="username"> Username:</label>
        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.username && errors.username ? "border-error text-error" : "border-primary text-onbackground"}`} type="text" id="username" name="username" placeholder="Your Username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.username && errors.username ? errors.username: null }</p>
        </div>
        <div>
        <label className={`block font-extrabold mb-2 ${touched.email && errors.email ? "text-error": "text-onbackground"}`} htmlFor="email">Email:</label>
        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.email && errors.email ? "border-error text-error" : "border-primary text-onbackground"}`} type="email" id="email" name="email" placeholder="Your Email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.email && errors.email ? errors.email: null }</p>
        </div>
        <div>
        <label className={`block font-extrabold mb-2 ${touched.password && errors.password ? "text-error": "text-onbackground"}`} htmlFor="password">Password:</label>
        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.password && errors.password ? "border-error text-error" : "border-primary text-onbackground"}`} type="password" id="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.password && errors.password ? errors.password: null }</p>
        </div>
        <div>
        <label className={`block font-extrabold mb-2 ${touched.cpassword && errors.cpassword ? "text-error": "text-onbackground"}`} htmlFor="cpassword">Confirm password:</label>
        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.cpassword && errors.cpassword ? "border-error text-error" : "border-primary text-onbackground"}`} type="cpassword" id="cpassword" name="cpassword" placeholder="cpassword" value={values.cpassword} onChange={handleChange} onBlur={handleBlur}/>
        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.cpassword && errors.cpassword ? errors.cpassword: null }</p>
        </div>
        <div>
        <label className={`block font-extrabold mb-2 ${touched.fname && errors.fname ? "text-error": "text-onbackground"}`} htmlFor="fname">Firstname:</label>
        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.fname && errors.fname ? "border-error text-error" : "border-primary text-onbackground"}`} type="fname" id="fname" name="fname" placeholder="fname" value={values.fname} onChange={handleChange} onBlur={handleBlur}/>
        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.fname && errors.fname ? errors.fname: null }</p>
        </div>
        <div>
        <label className={`block font-extrabold mb-2 ${touched.lname && errors.lname ? "text-error": "text-onbackground"}`} htmlFor="lname">Lastname:</label>
        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.lname && errors.lname ? "border-error text-error" : "border-primary text-onbackground"}`} type="lname" id="lname" name="lname" placeholder="lname" value={values.lname} onChange={handleChange} onBlur={handleBlur}/>
        <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.lname && errors.lname ? errors.lname: null }</p>
        </div>
        <div>
        <label className={`block font-extrabold mb-2 text-onbackground`} htmlFor="profileImg">Profile Image:</label>
        <input
        className="file:bg-primary-b file:px-6 file:py-2 text-surface bg-tertiary file:m-3 file:border-none file:rounded-full file:text-white file:cursor-pointer file:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-600 to-gray-700 text-white/80 rounded-full cursor-pointer shadow-xl shadow-gray-700/60"
          type="file"
          name="profileImg"
          id="profileImg"
          accept="image/"
          onChange={handleUploadImage}
        ></input>
        </div>
        <br/>
          <div>
            <input type="checkbox" id="agree" />
            <label htmlFor="agree" className="mx-1.5 text-onbackground">I agree to the terms and conditions</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-full hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        {success && (
          <div>
            Click here for{" "}
            <Link href="/login" className="underline">
              Login!
            </Link>
          </div>
        )}
      </form>
      </div>
    </section>
  );
};

export default Register;
