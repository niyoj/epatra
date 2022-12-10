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
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
      <form
        className="form-input decoration-solid"
        onSubmit={handleSubmit}
      >
        <label className="" htmlFor="username">
          Username:
        </label>
        <br />
        <input
          className=""
          type="text"
          id="username"
          name="username"
          placeholder="Your Username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {<div className="text-error">{errors.username && touched.username ? (
             <div>{errors.username}</div>
           ) : null}</div>}
        <br />
        <label className="" htmlFor="email">
          Email:
        </label>
        <br />
        <input
          className=""
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {<div className="text-error">{errors.email && touched.email ? (
             <div>{errors.email}</div>
           ) : null}</div>}
        <br />
        <label className="" htmlFor="password">
          Password:
        </label>
        <br />
        <input
          className=""
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {<div className="text-error">{errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}</div>}
        <br />
        <label className="" htmlFor="cpassword">
          Confirm password:
        </label>
        <br />
        <input
          className=""
          type="password"
          id="cpassword"
          name="cpassword"
          placeholder="Confirm Password"
          value={values.cpassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {<div className="text-error">{errors.cpassword && touched.cpassword ? (
             <div>{errors.cpassword}</div>
           ) : null}</div>}
        <br />
        <label className="" htmlFor="fname">
          First name:
        </label>
        <input
          className=""
          type="text"
          id="fname"
          name="fname"
          placeholder="Firstname"
          value={values.fname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {<div className="text-error">{errors.fname && touched.fname ? (
             <div>{errors.fname}</div>
           ) : null}</div>}
           <br/>
        <label className="" htmlFor="lname">
          Last name:
        </label>
        <input
          className=""
          type="text"
          id="lname"
          name="lname"
          placeholder="Lastname"
          value={values.lname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {<div className="text-error">{errors.lname && touched.lname ? (
             <div>{errors.lname}</div>
           ) : null}</div>}
        <br />
        <br />
        <label htmlFor="myfile">Profile Image:</label>
        <input
          type="file"
          name="profileImg"
          accept="image/"
          onChange={handleUploadImage}
        ></input>
        <br />
        <br/>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-sky-500 to-indigo-500"
        >
          {loading ? "Loading..." : "Submit"}
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
  );
};

export default Register;
