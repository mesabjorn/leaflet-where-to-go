import http from './httpService';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const tokenKey="token"; 

//auth
export async function login(username,password){
    try{
        const {data:jwt} = await http.post(`/api/v1/user/login`,{username,password});    
        localStorage.setItem(tokenKey,jwt);
        http.setJWT(jwt);        
        window.location="/map";
        toast.success(`Welcome back, ${username}!`)
    } catch(ex){
        if(ex.response)
            if(ex.response.status===404){
                toast.error("User not found.");
            }
            else if(ex.response.status===401){
               toast.error("Invalid password.");
            }        
    }
}

export async function register(username,password){
    try{
        const {data:jwt} = await http.post(`/api/v1/user/register`,{username,password});
        // console.log(data);
        localStorage.setItem(tokenKey,jwt);
        http.setJWT(jwt);        
        window.location="/map";
        toast.success(`Welcome, ${username}!`)
    } catch(ex){
        if(ex.response)
            if(ex.response.status===400){
                // console.log(ex.response);
                toast.error(ex.response.data);
            }
            else if(ex.response.status===401){
               toast.error("Invalid password.");
            }        
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