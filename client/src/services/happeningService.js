import http from './httpService';
import jwtDecode from 'jwt-decode';
import axios from "axios";
import { toast } from 'react-toastify';


const tokenKey="token";

export function getHappenings(){
    // console.log({headers:axios.defaults.headers.common['x-auth-token']});
    return http.get(`/v1/api/happenings`);
}

export function addHappening({name,description,options,geomtype,lat,lng,maxAttendees}){
    // console.log({headers:axios.defaults.headers.common['x-auth-token']});
    console.log(maxAttendees)
    return http.post(`/v1/api/happening`,{name,description,options,geomtype,lat,lng,maxAttendees});
}

export function updateHappening(_id,{name,lat,lng,description,options,maxAttendees}){
    // console.log({headers:axios.defaults.headers.common['x-auth-token']});
    return http.put(`/v1/api/happening/${_id}`,{name,lat,lng,description,options,maxAttendees});
}

export function deleteHappening(id){
    // console.log({headers:axios.defaults.headers.common['x-auth-token']});
    return http.delete(`/v1/api/happening/${id}`);
}

//auth
export async function login(username,password){
    try{
        const {data:jwt} = await http.post(`/api/user/login`,{username,password});    
        localStorage.setItem(tokenKey,jwt);
        http.setJWT(jwt);
        console.log(jwt);
        // window.location="/";
    }catch(ex){
        if(ex.response && ex.response.status===404){
            toast.error("User not found.")
        }
        console.log(ex);
    }
}

export function loginWithJWT(jwt){    
    localStorage.setItem(tokenKey,jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
    window.location="/";
}

export function getJWT(){
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser(){
    const jwt = localStorage.getItem(tokenKey);
    try{
      const user = jwtDecode(jwt);
      http.setJWT(jwt);

      return user;
    }catch(ex){
        return null;
    }
}