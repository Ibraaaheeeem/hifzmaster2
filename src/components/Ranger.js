import React from "react";

export default function Ranger(props) {
    return(
        <div className="diff-selector">
            <p className="current-level"> {props.level} </p>
            <div className="current-level-select">
            <p className="range-data">1</p>
            <input 
                type="range" 
                id="diff" 
                min="1" 
                max="6" 
                value={props.level} 
                step="1" 
                onChange={props.setNewLevel}
                style={{position: "relative", width: "100%", marginRight:"auto"}}
            >
            </input>
            <p className="range-data">6</p>
            </div>
        </div>
    )
}