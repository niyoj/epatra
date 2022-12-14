import { Landing } from "../components/index";
import React, { useState } from "react";
// import axios from "axios";
import { getNews } from "../services";

export default function Home({data}) {
  // const [news, setNews] = useState("");
  React.useEffect(() => {
    // async function getResponse() {
      // const {data} = await axios.get(
      //   "http://localhost:8000api/v1/auth/test/"
      //       );
      //       console.log(data);
      //     }
      //     getResponse();
        }, []);
        console.log(data)
        return (
          <>
      <div className="">
        <Landing data={data}/>
      </div>
    </>
  );
}
export async function getStaticProps()
{
  const {data} = await getNews()
  console.log(data);
  return {
    props: {data},
    revalidate: 3 
  }
}