import React from 'react';
import PageList from './PageList';
import Ranger from './Ranger';
import ProgressBar from './ProgressBar';
import "../styles/App.css";

export default function SideMenu(props) {
    
    return (
        <div class = "sidemenu">
            <ProgressBar bgcolor={"#2c8558"} completed={props.completed} page={props.page}/>
            <Ranger level={props.level} setNewLevel={props.setNewLevel}/>
            <PageList onClick={props.onClick}/>
        </div>
     );
}