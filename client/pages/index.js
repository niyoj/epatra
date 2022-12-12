import { Landing } from "../components/index";
import React, { useState } from "react";
import axios from "axios";
export default function Home() {
  const [news, setNews] = useState("");
  React.useEffect(() => {
    async function getResponse() {
      const accessToken= localStorage.getItem("accessToken");
      const {data} = await axios.get(
          "http://localhost:8000/api/v1/news/n/",
            {
              headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}`,
              },
            }
            );
            const News = data.data;
            setNews(News);
            console.log(news);
          }
          getResponse();
  }, []);
  return (
    <>
      <div>
        <Landing news={news}/>
      </div>
    </>
  );
}
