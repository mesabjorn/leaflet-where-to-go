import React, {useEffect, useState} from "react";
import './App.css';

import {SkateMap} from "./skatemap.jsx";
import {getHappenings} from "./services/happeningService.js";



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


function App() {

  const [happeningData, setHappeningData]=useState([]);

  useEffect(()=>{
    async function fetchData() {
      const {data:happenings} = await getHappenings();
      console.log({happenings});
      setHappeningData(happenings);
    }
    fetchData();
  },[]);

  // console.log(parkData[0].features);
  return (
   <SkateMap parkData={happeningData} />
  );
}

export default App;