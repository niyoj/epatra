import React, { useState } from "react";
import FormData from "form-data";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/signup";
import { GoogleLogin } from '@react-oauth/google';
import Loading from "./Loading";
import { useRouter } from "next/router";

const initialValues ={
  username:"",
  email:"",
  password:"",
  cpassword:"",
  fname:"",
  lname:"",
}

const Register = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  
  
  const {values,touched, errors, handleBlur, handleChange,handleSubmit} = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit:(values, action)=>{
      console.log(values);
      handleBtnRegister();
      action.resetForm();
    }
  })
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userImg, setUserImg] = useState("");

  const changePage = () => {
    if(page == 3) setPage(4)
    if (page == 2 && errors.username===undefined && errors.fname===undefined && errors.lname===undefined) setPage(3);
    if (page == 1 && errors.email===undefined && errors.password===undefined && errors.cpassword===undefined) setPage(2);
  }
  
  const handleUploadImage = (e) => {
    let img = e.target.files[0];
    setUserImg(img);
  };
  
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
          setLoading(false)
          console.log(error);
        }
      };
      
  if(loading === true)
      return <Loading/>
  if(success === true){
    router.push("/verification")
  }
  return (
    <section className="inline-flex bg-background absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-8 rounded-md border border-outline">
      <div className="login-form flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-center text-primary">Register</h1>
          <p className="text-secondary text-center text-md mb-8">Know what's going around the globe...</p>

          <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}} onError={() => {console.log('Login Failed');}} />
      
          <p className="uppercase text-tertiary text-center text-md mt-4">or</p>

          <form method='post' onSubmit={handleSubmit} className="inline-flex flex-col items-center">
              <div className={`${page === 1 ? null : "hidden"}`}>
                  <label className={`block font-extrabold mb-2 ${touched.email && errors.email ? "text-error": "text-onbackground"}`}>Email</label>
                  <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.email && errors.email ? "border-error text-error" : "border-primary text-onbackground"}`} type='email' name='email' placeholder='Your Email Address' onChange={handleChange} value={values.email} onBlur={handleBlur} />
                  <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.email && errors.email ? errors.email: null }</p>
              </div>

              <div className={`${page === 1 ? null : "hidden"}`}>
                  <label className={`block font-extrabold mb-2 ${touched.password && errors.password ? "text-error": "text-onbackground"}`}>Password</label>
                  <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.password && errors.password ? "border-error text-error" : "border-primary text-onbackground"}`} type='password' name='password' placeholder='Your Password' onChange={handleChange} value={values.password} onBlur={handleBlur} />
                  <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.password && errors.password ? errors.password: null }</p>
              </div>

              <div className={`${page === 1 ? null : "hidden"}`}>
                  <label className={`block font-extrabold mb-2 ${touched.cpassword && errors.cpassword ? "text-error": "text-onbackground"}`}>Confirm Your Password</label>
                  <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.cpassword && errors.cpassword ? "border-error text-error" : "border-primary text-onbackground"}`} type='password' name='cpassword' placeholder='Re-Enter your Password' onChange={handleChange} value={values.cpassword} onBlur={handleBlur} />
                  <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.cpassword && errors.cpassword ? errors.cpassword: null }</p>
              </div>

              <div className={`${page === 2 ? null : "hidden"}`}>
                  <label className={`block font-extrabold mb-2 ${touched.fname && errors.fname ? "text-error": "text-onbackground"}`}>First Name</label>
                  <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.fname && errors.fname ? "border-error text-error" : "border-primary text-onbackground"}`} type='text' name='fname' placeholder='Your First Name' onChange={handleChange} value={values.fname} onBlur={handleBlur} />
                  <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.fname && errors.fname ? errors.fname: null }</p>
              </div>

              <div className={`${page === 2 ? null : "hidden"}`}>
                  <label className={`block font-extrabold mb-2 ${touched.lname && errors.lname ? "text-error": "text-onbackground"}`}>Last Name</label>
                  <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.lname && errors.lname ? "border-error text-error" : "border-primary text-onbackground"}`} type='text' name='lname' placeholder='Your Last Name' onChange={handleChange} value={values.lname} onBlur={handleBlur} />
                  <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.lname && errors.lname ? errors.lname: null }</p>
              </div>

              <div className={`${page === 2 ? null : "hidden"}`}>
                  <label className={`block font-extrabold mb-2 ${touched.username && errors.username ? "text-error": "text-onbackground"}`}>Username</label>
                  <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 ${touched.username && errors.username ? "border-error text-error" : "border-primary text-onbackground"}`} type='text' name='username' placeholder='Your Username' onChange={handleChange} value={values.username} onBlur={handleBlur} />
                  <p className="block text-sm text-error text-right mt-1">&nbsp;{touched.username && errors.username ? errors.username: null }</p>
              </div>

              <div className={`${page === 3 ? null : "hidden"}`}>
                  <label className={`block font-extrabold ${touched.username && errors.username ? "text-error": "text-onbackground"}`}>Profile Image</label>
                  <p className="text-tertiary mb-2">This step is completely optional</p>
                  
                  <label className="flex justify-center mt-4 mb-4">
                    <div className="w-64 flex flex-col items-center px-4 py-6 bg-secondary text-onsecondary rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                        <svg className="w-10 h-10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">Select a file</span>
                        <input type='file' className="hidden" name='profileImg' accept="image/png, image/gif, image/jpeg" onChange={handleUploadImage}/>
                    </div>
                  </label>
              </div>

              <button type={`${page === 4 ? "submit" : "button"}`} className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-full hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary" onClick={changePage} disabled={(page===1 &&( values.email==="" || values.password==="" || values.cpassword==="")) || ((page===2 &&( values.username==="" || values.fname==="" || values.lname==="")))} >{page == 3 ? "submit" : "next"}</button>
          </form>

          <p className="mt-5">Already have an account? <Link className="text-primary font-bold" href="./login">Login</Link></p>
      </div>
    </section>
  );
};

export default Register;
