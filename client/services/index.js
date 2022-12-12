import axios from "axios"
import FormData from "form-data";
// let accessToken;
let bodyFormData = new FormData();
export const getNews = async(accessToken)=>{
        // Perform localStorage action
    const {data} = await axios.get(
        "http://localhost:8000/api/v1/news/n/",bodyFormData,
          {
            headers: {
              "Content-type": "multipart/form-data",
              "Authorization": `Bearer ${accessToken}`,
            },
          }
          );
          console.log(accessToken)
          console.log(data);
    // const { data } = await axios.get(
    //     `http://localhost:8000/api/v1/news/n/`
    //   );
    //   console.log(data);
    return data;
}