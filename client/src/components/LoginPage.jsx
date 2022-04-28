import React, {useState} from "react";
import {login,register} from "../services/userService.js"
import {Container,Button} from 'react-bootstrap';
import { toast } from "react-toastify";

export const RegisterPage = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");


    const submitForm = () => {
        console.log("Registering user:")
        console.log({username,password,password2});

        if(password.length<8){
            return toast.error("Invalid password, make sure it is at least 8 characters long.");
        }
        if(password!==password2){
            return toast.error("Registration not complete: passwords do not match."); 
        }
        register(username,password);                
    }

    return (
    <Container>

    <form method="POST">
        <label htmlFor="username">User name:</label><br/>
        <input type="text" id="username" name="username" onChange={({target})=>{setUsername(target.value)}}/><br/><br/>
        <label htmlFor="password">Password:</label><br/>
        <input type="password" id="password" name="password" onChange={({target})=>{setPassword(target.value)}}/><br/><br/>        
        <label htmlFor="password2">Password again:</label><br/>
        <input type="password" id="password2" name="password2" onChange={({target})=>{setPassword2(target.value)}}/><br/><br/>        
    </form>
    <Button className="btn btn-primary" onClick={submitForm}>Register</Button>
    </Container>);
}

export const LoginPage = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const signIn = async()=>{
        login(username,password);                
    }

    return (
    <Container>

    <form method="POST">
        <label htmlFor="username">User name:</label><br/>
        <input type="text" id="username" name="username" onChange={({target})=>{setUsername(target.value)}}/><br/><br/>
        <label htmlFor="password">Password:</label><br/>
        <input type="password" id="password" name="password" onChange={({target})=>{setPassword(target.value)}}/><br/><br/>        
    </form>
    <Button className="btn btn-primary" onClick={signIn}>Login</Button>
    </Container>);
}