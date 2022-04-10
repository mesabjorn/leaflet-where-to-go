import React, {useState} from "react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

const skater = new Icon({
    iconUrl: "./skateboarding.png",
    iconSize: [25, 25]
  });


export const SkateMap = ({parkData}) => {
    const [activePark, setActivePark] = useState(null);

    // console.log({parkData});


    parkData.map(p=>console.log(p.geometry[1]));

    return(
    <MapContainer center={[45.4, -75.7]} zoom={11}>      
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
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    </MapContainer>)

}