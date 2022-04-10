import axios from "axios";
import {toast} from 'react-toastify';
// import logger from "./logService";


axios.interceptors.response.use(null, error=>{  
  const expectedError = error.response && error.response.status>=400 && error.response.status<500;
  
  if(!expectedError){
    // logger.log(error);
    console.log(error);    
    toast.error("An unexpected error occurred.");    
  }
  
  return Promise.reject(error);
});

function setJWT(jwt){
  axios.defaults.headers.common['x-auth-token'] = jwt;
  
}

function putFormData(url,data){
  return axios({
    method: "put",
    url: url,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

function postFormData(url,data){
  return axios({
    method: "post",
    url: url,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  postFormData:postFormData,
  putFormData:putFormData,
  setJWT
};