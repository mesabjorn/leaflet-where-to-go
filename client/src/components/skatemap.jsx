import React, {useState,useEffect} from "react";

import { MapContainer, TileLayer, Marker, Popup,useMapEvents} from 'react-leaflet';
import { Icon } from "leaflet";
import {Button,Form} from 'react-bootstrap';
import {getHappenings,addHappening} from "../services/happeningService.js";
import { toast } from 'react-toastify';

import {Fab} from './fab.jsx'

const skater = new Icon({
    iconUrl: "./skateboarding.png",
    iconSize: [25, 25]
  });

const AddMarker = ({addClickMarkers})=>{
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
      click({latlng}) {
      //   map.locate()            
          addClickMarkers({name:'testname',
                          desc:'test description',
                          geomType:"Point",
                          lat:latlng.lat,
                          lng:latlng.lng,                          
                          editing:true
                        });
      },
      // locationfound(e) {
      //   setPosition(e.latlng);
      // },
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

const HappeningForm = ({happening,submitEvent,closePopup})=>{

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [options,setOptions] = useState([]);
  const [maxAttendees,setMaxAttendees] = useState("");


  const updateOptions = (t) =>{        
    const currentOptions = [...options];
    if(currentOptions.indexOf(t)>-1){
        currentOptions.splice(currentOptions.indexOf(t),1)
    }
    else{
        currentOptions.push(t);
    }
    setOptions(currentOptions);
  }    

  return(
    <>
    <div className="h3">Your new Event</div>
    <Form>
        <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="input" placeholder="Enter Happening Name" value={name} onChange={({target})=>{setName(target.value)}}/>        
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Tell others what they can expect.."  value={description} onChange={({target})=>{setDescription(target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Max attendees</Form.Label>
        <Form.Control type="input" placeholder="Enter max number of places" value={maxAttendees} onChange={({target})=>{setMaxAttendees(target.value)}}/>        
        <Form.Text className="text-muted">
          Leave empty for unlimited
        </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Options</Form.Label>
        <Form.Check 
            inline
            type="switch"
            id="free-switch"
            label="free"
            checked={options.indexOf("free")>-1&&"checked"}
            onChange={()=>updateOptions("free")}
        />
        <Form.Check 
            inline
            type="switch"
            id="public-switch"
            label="public"
            checked={options.indexOf("public")>-1&&"checked"}
            onChange={()=>updateOptions("public")}
        />       
        </Form.Group>
        <Button variant="primary" onClick={()=>{submitEvent(name,description,options,          
            happening.lat,
            happening.lng,          
          maxAttendees
          )}}>
            Submit
        </Button>
        <Button className="m-2" variant="danger" onClick={closePopup}>
            Cancel
        </Button>
        </Form>
    </>)
}

const HappeningPopup = ({user,happening,submitEvent,closeEvent}) =>{
  const [attendees,setAttendees] = useState(0);

  return(
  <Popup minWidth="300" offset={[0,-30]}
    position={[
      happening.lat,
      happening.lng
    ]}
    onClose={() => {
      closeEvent();
    }}
  >

  {
    happening.editing?
      <HappeningForm happening={happening} submitEvent={submitEvent} closePopup={closeEvent}/>
      :
    (
    <div>
      <h2>{happening.name}</h2>
      <h4><i>{happening.creator}</i>'s happening</h4>
      <p>{happening.description}</p>
      <p>{attendees} of {happening.maxAttendees} people are there!</p>
      <Button className="m-2" variant="primary" onClick={()=>setAttendees(attendees+1)}>
            I am here!
      </Button>
      {user&&user.user===happening.creator &&
      (<span>
      <Button className="m-2" variant="secondary" onClick={()=>setAttendees(attendees+1)}>
            Edit
      </Button>
      <Button className="m-2" variant="danger" onClick={()=>setAttendees(attendees+1)}>
        Remove
      </Button>
      </span>
        )
      }
    </div>
    )
  }
  </Popup>);
}

export const SkateMap = ({user}) => {
    const [activeHappening, setActiveHappening] = useState(null);
    // const [clickMarkers, setClickMarkers] = useState([]);
    const [happeningData, setHappeningData]=useState([]);
    
    useEffect(()=>{
      async function fetchData() {
        const {data:happenings} = await getHappenings();        
        setHappeningData(happenings);
      }
      fetchData();
    },[]);
  
    
    const addNewHappening = async(name,description,options,lat,lng,maxAttendees)=>{      
      const geomtype = "point";
      const newHappening = {
          _id:happeningData.length+1,name,description,options,geomtype,lat,lng,attendees:0,maxAttendees
      };            
      let editing=false;
      try{
        if(editing){}
        else{
            let{data}=await addHappening(newHappening);
            
            let temp = [...happeningData,newHappening];
            setHappeningData(temp);
            setActiveHappening(null);
            console.log(data);
            toast.success("Happening was added.");
        }
      } catch(ex){
        console.log(ex.response);
        if(ex.response){
            if(ex.response.status===400){
              toast.error("Something went wrong, please check the input fields.");
              toast.error(ex.response.data);
            } 
            if(ex.response.status===401){
                toast.error("Something went wrong. Please sign in again.");
            }                
            else if(ex.response.status===403){
                toast.error("You are not authorized to create or update courses. Requires admin.");
            }
        }
        else{
            toast.error("An unknown error occured.");            
        }
    }
    } 
    
    const addClickMarkers = (m) =>{        
        setActiveHappening(m);
    }


    return(
    <>
    <MapContainer center={[52.2190848, 5.1740672]} zoom={15}>    
    {activeHappening && (
      <>
      <HappeningPopup user={user} happening={activeHappening} submitEvent={addNewHappening} closeEvent={()=>setActiveHappening(null)}/>
      <Marker
        key={activeHappening._id}
        position={[
            activeHappening.lat,
            activeHappening.lng
        ]}
        eventHandlers={{
        click: (e) => {
            console.log('marker clicked', e);            
        }
        }}      
      />
      </>
    )}
    
    {happeningData.map(h => (
    <Marker
        key={h._id}
        position={[
            h.lat,
            h.lng
        ]}
        eventHandlers={{
        click: (e) => {
            setActiveHappening(h);
        }
        }}
        icon={skater}        
    />
    ))}
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <AddMarker addClickMarkers={addClickMarkers} />
    </MapContainer>

    <Fab />
    </>)

}