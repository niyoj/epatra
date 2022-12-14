import axios from "axios"
import FormData from "form-data";

export const getNews = async()=>{
        // Perform localStorage action
    const {data} = await axios.get(
        "http://localhost:8000/api/v1/news/n/",
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
          );
    return data;
}

export const getNewsDetails = async(slug)=>{
  const {data} = await axios.get(
    `http://localhost:8000/api/v1/news/na/${slug}`,
      );
  return data;
}

export const increaseViews = async(id)=>{
  let bodyFormData = new FormData();
  bodyFormData.append("like",true)
  const {data} = await axios.post(
    `http://localhost:8000/api/v1/news/na/${id}/view/`,bodyFormData,{
      headers: {
        "Content-type": "multipart/form-data",
      },
    }
      );
  return data;
}


export const LikePost = async(id,state)=>{
  let bodyFormData = new FormData();
  bodyFormData.append("like",state)
  const {data} = await axios.post(
    `http://localhost:8000/api/v1/news/na/${id}/like/`,bodyFormData,{
      headers: {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
      );
      console.log(data);
  return data;
}


export const getLoggedOut = async()=>{
  let bodyFormData = new FormData();
  const refreshToken = localStorage.getItem("refreshToken")
  bodyFormData.append("token",refreshToken)

  const {data} = await axios.post(
    `http://localhost:8000/api/v1/auth/logout/`,bodyFormData,{
      headers: {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
      );
      console.log(data);
  return data;
}