import React, {useState,useRef} from "react";


import "../fab.css";
import { faBars,faArrowsAlt,faFloppyDisk,faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Fab = () =>{

    const [active, setActive ] = useState(false);
    const refContainer = useRef(null);

    return(
        <div ref={refContainer} className={`btn-group-fab ${active?'active':''}`} role="group" aria-label="FAB Menu">
        <div>
            <button onClick={()=>setActive(!active)} type="button" className="btn btn-main btn-primary has-tooltip" data-placement="left" title="Menu">
                <FontAwesomeIcon icon={faBars} />            
            </button>
            <button type="button" className="btn btn-sub btn-info has-tooltip" data-placement="left" title="Fullscreen">
                <FontAwesomeIcon icon={faArrowsAlt} />                
            </button>
            <button type="button" className="btn btn-sub btn-danger has-tooltip" data-placement="left" title="Save">
                <FontAwesomeIcon icon={faFloppyDisk} />            
            </button>
            <button type="button" className="btn btn-sub btn-warning has-tooltip" data-placement="left" title="Download">
                <FontAwesomeIcon icon={faDownload} />            
            </button>
        </div>
        </div>
    )
}