import { Landing } from "../components/index";
import React from "react";
import axios from "axios";

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
      <div>
        <Landing />
      </div>
    </>
  );
}
