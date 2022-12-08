import React from "react";
import { useRouter } from "next/router";
const Landing = () => {
  const router = useRouter();
  return (
    <div>
      <h4>Landing Page</h4>
      <button
        onClick={() => {
          router.push("/login");
        }}
      >
        <a className="underline">Sign In</a>
      </button>{" "}
      <br />
      <button
        onClick={() => {
          router.push("/register");
        }}
      >
        <a className="underline">Register</a>
      </button>
    </div>
  );
};

export default Landing;
