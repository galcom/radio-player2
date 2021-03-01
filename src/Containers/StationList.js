import React from "react";
import xmlToJson from 'xmltojson';

class StationList extends React.Component {
  constructor(props) {
    super(props);

    console.log("StationList constructor");
    // set radio's initial state
    this.state = {};

  }

  componentDidMount() {
      const username="admin";
      const password ="Galcom1995";
      const url = "http://138.197.152.25:8000/admin/stats";

    fetch(url, {
            method:'GET', 
            //headers: {'Authorization': 'Basic ' + window.btoa(username+":"+password)},
         })
        .then((result) => result.body)
        .then((data) =>{
            console.log("station list result: ",data);
            const stationList = xmlToJson.parseString(data);
            console.log("json station list: ",stationList);


        });
 
  }

  render(){
      return (
          <div>stub</div>
      );

  }
}


export default StationList;