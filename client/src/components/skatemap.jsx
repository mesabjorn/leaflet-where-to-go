import React, {useState} from "react";

import { MapContainer, TileLayer, Marker, Popup,useMapEvents} from 'react-leaflet';
import { Icon } from "leaflet";

import {Fab} from './fab.jsx'

const skater = new Icon({
    iconUrl: "./skateboarding.png",
    iconSize: [25, 25]
  });

  const AddMarker = ({addClickMarkers})=>{
    const [position, setPosition] = useState(null)

    const map = useMapEvents({
        click({latlng}) {            
        //   map.locate()            
            addClickMarkers({lat:latlng.lat,long:latlng.lng});
            console.log(latlng);
        },
        locationfound(e) {
          setPosition(e.latlng);
          console.log(e);
        },
      })
  }


  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {          
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

export const SkateMap = ({parkData}) => {
    const [activePark, setActivePark] = useState(null);
    const [clickMarkers, setClickMarkers] = useState([]);
    
    const addClickMarkers = (m) =>{
        let  temp = [...clickMarkers,m];
        setClickMarkers(temp);
        console.log(clickMarkers);
    }
    // console.log({parkData});
    parkData.map(p=>console.log(p.geometry[1]));

    return(
    <>
    <MapContainer center={[52.2190848, 5.1740672]} zoom={15}>    
    {activePark && (
    <Popup
    position={[
    activePark.geometry[1][1],
    activePark.geometry[1][0]
    ]}
    onClose={() => {
    setActivePark(null);
    }}
    >
    <div>
    <h2>{activePark.name}</h2>
    <p>{activePark.description}</p>
    </div>
    </Popup>
    )}
    {parkData.map(park => (        
    <Marker
        key={park._id}
        position={[
            park.geometry[1][1],
            park.geometry[1][0]
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

    {
    clickMarkers.map((cm,i)=>{
        console.log(i);
        return <Marker
        key={i}
        position={[
            cm.lat,cm.long            
        ]}
        eventHandlers={{
        click: (e) => {
            console.log('cm clicked', e);            
        }
        }}
        // icon={skater}  
    />
    })
    }
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <AddMarker addClickMarkers={addClickMarkers} />
    </MapContainer>

    <Fab />
    </>)

}