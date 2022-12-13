import axios from 'axios'
import FormData from 'form-data'
// axios.defaults.baseURL= 'http://localhost:8000/'
let bodyFormData = new FormData();
let refresh = false;
axios.interceptors.response.use(resp=> resp,async (err)=>{
    if(err.response?.status == 401 && !refresh){
        const refreshToken = localStorage.getItem("refreshToken");
        bodyFormData.append("refresh", refreshToken);
        const response = await axios.post("http://localhost:8000/api/v1/auth/login/refresh-token/",bodyFormData,{
            headers: {
                "Content-type": "multipart/form-data",
            },
        })
        console.log(response.data)
        if(response.status ===200){
            const authToken = response.data.access
            localStorage.setItem("accessToken",authToken);
            refresh = true;
            return axios(err.config);
        }
    }
    refresh = false;
    return err; 
})