import React, {useState} from "react";
import {login} from "../services/userService.js"
import {Container,Button} from 'react-bootstrap';

export const ProfilePage = ({user}) =>{
    const signIn = async()=>{
        //get profile info
    }

    return (
    <Container>
        <div className="h1">{`${user.user}'s page`}</div>
    </Container>);
}