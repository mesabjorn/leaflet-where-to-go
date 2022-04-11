import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,  
  NavLink,
  useNavigate
} from "react-router-dom";

import {Navbar,Nav,NavDropdown,Container,Button} from 'react-bootstrap';
import { ToastContainer} from 'react-toastify';

import {SkateMap} from "./components/skatemap.jsx";
import {getHappenings} from "./services/happeningService.js";
import {getCurrentUser,logout} from "./services/userService.js"
import {LoginPage} from "./components/LoginPage.jsx"

const parkData = [{
  "features": [
    {
      "type": "Feature",
      "properties": {
        "PARK_ID": 960,
        "NAME": "Bearbrook Skateboard Park",
        "DESCRIPTIO": "Flat asphalt surface, 5 components"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-75.3372987731628, 45.383321536272049]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "PARK_ID": 1219,
        "NAME": "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
        "DESCRIPTIO": "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-75.546518086577947, 45.467134581917357]
      }
    }
  ]
}];



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

  const [happeningData, setHappeningData]=useState([]);
  const [user,setUser]=useState({});

  useEffect(()=>{
    async function fetchData() {
      const {data:happenings} = await getHappenings();
      console.log({happenings});
      setHappeningData(happenings);
    }
    fetchData();
  },[]);

  useEffect(()=>{
    const user = getCurrentUser();    
    setUser(user);    
  },[]);

  // console.log(parkData[0].features);
  return (
  <Router>
    <MyNavBar user={user}/>
    <Container>
    <Routes>
      <Route path='/' exact element={<div>Home</div>}/>
      <Route path='/map' element={<SkateMap parkData={happeningData} user={user}/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    <div>Footer</div>
    </Container>
    <ToastContainer />
  </Router>
  );
}

export default App;