import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import { Icon } from "leaflet";


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

const skater = new Icon({
  iconUrl: "./skateboarding.png",
  iconSize: [25, 25]
});


function App() {
  const [activePark, setActivePark] = useState(null);
  console.log(parkData[0].features);
  return (
    <MapContainer center={[45.4, -75.7]} zoom={11}>      
      {activePark && (
      <Popup
      position={[
        activePark.geometry.coordinates[1],
        activePark.geometry.coordinates[0]
      ]}
      onClose={() => {
        setActivePark(null);
      }}
    >
      <div>
        <h2>{activePark.properties.NAME}</h2>
        <p>{activePark.properties.DESCRIPTIO}</p>
      </div>
      </Popup>
      )}
      {parkData[0].features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0]
          ]}
          eventHandlers={{
            click: (e) => {
              console.log('marker clicked', e);
              setActivePark(park);
            }
          }}
          icon={skater}
          
        />
      ))}
       <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default App;