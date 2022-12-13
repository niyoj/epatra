import axios from "axios"
import FormData from "form-data";
let bodyFormData = new FormData();
export const getNews = async()=>{
        // Perform localStorage action
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwOTAzMTkwLCJpYXQiOjE2NzA4OTk1OTAsImp0aSI6IjI3NGI4ZDA1ZGI3YjQxZmM4ZWI1NTIwYjAxNjM3NmFlIiwidXNlcl9pZCI6ImIzZjMwMzkzLTlmNTItNGM1YS04ODE0LTEwNjgzNmU1Zjk4MCJ9.b9XkyEQpsRWzOWE8u03zR_EgCzDAyFcT_EVP7Nxy7RE"
    const {data} = await axios.get(
        "http://localhost:8000/api/v1/news/n/",
          {
            headers: {
              "Content-type": "multipart/form-data",
              "Authorization": `Bearer ${accessToken}`,
            },
          }
          );
          // console.log(accessToken)
          // console.log(data);
    // const { data } = await axios.get(
    //     `http://localhost:8000/api/v1/news/n/`
    //   );
    //   console.log(data);
    return data;
}

export const getNewsDetails = async(id)=>{
  const {data} = await axios.get(
    `http://localhost:8000/api/v1/news/na/${id}`,
      );
  return data;
}