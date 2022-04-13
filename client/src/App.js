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
import {LoginPage} from "./components/LoginPage.jsx"

const MyNavBar = (props) =>{
  let navigate = useNavigate();
  const [user,setUser] = useState({user:"Anonymous"});

  useEffect(()=>{
    const {user} = props;
    setUser(user);

  });

  return(
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Hpng</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">        
        <NavLink className="nav-link" to="/map">Happenings</NavLink>
        {user?
        <NavDropdown title={user.user} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={()=>navigate("/profile")}>Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Options</NavDropdown.Item>          
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" onClick={()=>{logout()}}>Logout</NavDropdown.Item>          
        </NavDropdown>:
        <Button onClick={()=>navigate("/login")}>Log in</Button>}
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
    </Routes>
    <div>Footer</div>
    </Container>
    <ToastContainer />
  </Router>
  );
}

export default App;