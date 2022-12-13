import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewsCards from "./NewsCards";

const Landing = ({data}) => {
  console.log(data);
  const router = useRouter();
  return (
    <>
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



    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>ePatra | The Ultimate News Portal</title>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {
            data.map((news)=>
              <NewsCards key={data.slug} news={news}/>
            )
          }
        </div>
      </div>
    </div>
    </>
  );
};

export default Landing;
