import { Register } from "../components/index";
import { Navbar } from "../components/index";
import { Landing } from "../components/index";
import { Login } from "../components/index";
import styles from "../styles/Home.module.css";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  React.useEffect(() => {
    async function getResponse() {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/auth/test/`
      );
      console.log(data);
    }
    getResponse();
  }, []);
  return (
    <>
      {/* <Router> */}
      <div>
        <Landing />
        {/* <Routes> */}
        {/* <Route path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} /> */}
        {/* </Routes> */}
        {/* </Router> */}
      </div>
    </>
  );
}
