import React from "react";
import "./Logo.css";

function Logo(props) {
  const img = <img src={props.logo} alt="logo" id="logo" />;
  if(props.stationWebsite != null){

    return <a href={props.stationWebsite} target="_blank" rel="noopener noreferrer">{img}</a>;
  }else
    return  img;
}

export default Logo;
