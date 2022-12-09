import React, { useState } from "react";
import FormData from "form-data";
import axios from "axios";
import Link from "next/link";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    fname: "",
    lname: "",
    profileImg: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleUploadImage = (e) => {
    let img = e.target.files[0];
    setUserData({ ...userData, profileImg: img });
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleBtnRegister = async (e) => {
    e.preventDefault();
    try {
      if (userData.password === userData.cpassword) {
        setLoading(true);
        let bodyFormData = new FormData();
        bodyFormData.append("username", userData.username);
        bodyFormData.append("email", userData.email);
        bodyFormData.append("password", userData.password);
        bodyFormData.append("display_picture", userData.profileImg);
        bodyFormData.append("first_name", userData.fname);
        bodyFormData.append("last_name", userData.lname);
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
        setUserData({
          username: "",
          email: "",
          password: "",
          cpassword: "",
          fname: "",
          lname: "",
          profileImg: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
      <form
        className="form-input decoration-solid"
        onSubmit={handleBtnRegister}
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
          placeholder="John"
          onChange={handleChange}
          value={userData.username}
          required
        />
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
          placeholder="John@gmial.com"
          onChange={handleChange}
          value={userData.email}
          required
        />
        <br />
        <label className="" htmlFor="password">
          password:
        </label>
        <br />
        <input
          className=""
          type="password"
          id="password"
          name="password"
          placeholder="●●●●●"
          onChange={handleChange}
          value={userData.password}
          required
        />
        <br />
        <label className="" htmlFor="cpassword">
          cpassword:
        </label>
        <br />
        <input
          className=""
          type="password"
          id="cpassword"
          name="cpassword"
          placeholder="●●●●●"
          onChange={handleChange}
          value={userData.cpassword}
          required
        />
        <br />
        <label className="" htmlFor="fname">
          First name:
        </label>
        <input
          className=""
          type="text"
          id="fname"
          name="fname"
          placeholder="John"
          onChange={handleChange}
          value={userData.fname}
          required
        />
        <label className="" htmlFor="lname">
          Last name:
        </label>
        <input
          className=""
          type="text"
          id="lname"
          name="lname"
          placeholder="Doe"
          onChange={handleChange}
          value={userData.lname}
          required
        />
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
