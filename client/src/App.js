import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,  
  NavLink,
  useNavigate
} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';


import {Navbar,Nav,NavDropdown,Container,Button} from 'react-bootstrap';
import { ToastContainer} from 'react-toastify';

import {SkateMap} from "./components/skatemap.jsx";
import {getCurrentUser,logout} from "./services/userService.js"
import {LoginPage,RegisterPage} from "./components/LoginPage.jsx"
import {ProfilePage} from "./components/ProfilePage.jsx"


const MyNavBar = (props) =>{
  let navigate = useNavigate();
  const [user,setUser] = useState({user:"Anonymous"});

  useEffect(()=>{
    const {user} = props;
    setUser(user);
  },[user]);

  return(
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Hpng</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link onClick={()=>navigate("/map")}>Map</Nav.Link>     
      </Nav>
      <Nav>
      <NavDropdown title={user?user.user:'Sign-in options'} id="basic-nav-dropdown">
          {user?(
            <>
            <NavDropdown.Item onClick={()=>navigate("/profile")}>Profile</NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={()=>{logout()}}>Logout</NavDropdown.Item>
            </>
            )  
            :(
              <>
              <NavDropdown.Item onClick={()=>navigate("/login")}>Login</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/register")}>Register</NavDropdown.Item>
              </>
            )
          }         
        </NavDropdown>
    </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )

}



function App() {
  const [user,setUser]=useState({});
 
  useEffect(()=>{
    const user = getCurrentUser();    
    setUser(user);    
  },[]);
  
  return (
  <Router>
    <MyNavBar user={user}/>
    <Container>
    <Routes>
      <Route path='/' exact element={<div>Home</div>}/>
      <Route path='/map' element={<SkateMap user={user}/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>


    </Routes>
    <div>Footer</div>
    </Container>
    <ToastContainer />
  </Router>
  );
}

export default App;