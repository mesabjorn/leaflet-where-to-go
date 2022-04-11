import http from './httpService';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';


const tokenKey="token"; 

export function addCourse(name,price,author,tags){
    // console.log({headers:axios.defaults.headers.common['x-auth-token']});
    return http.post(`/api/course`,{name,price,author,tags});
}

export function updateCourse(id,name,price,author,tags){
    // console.log({headers:axios.defaults.headers.common['x-auth-token']});
    return http.put(`/api/course/${id}`,{name,price,author,tags});
}

export function deleteCourse(id){
    // console.log({headers:axios.defaults.headers.common['x-auth-token']});
    return http.delete(`/api/course/${id}`);
}

//auth
export async function login(username,password){
    try{
        const {data:jwt} = await http.post(`/api/user/login`,{username,password});    
        localStorage.setItem(tokenKey,jwt);
        http.setJWT(jwt);        
        window.location="/";
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