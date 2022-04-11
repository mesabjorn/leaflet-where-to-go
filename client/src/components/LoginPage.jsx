import React, {useState} from "react";
import {login} from "../services/userService.js"
import {Container,Button} from 'react-bootstrap';

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
    <button className="button" onClick={signIn}>Login</button>
    </Container>);
}