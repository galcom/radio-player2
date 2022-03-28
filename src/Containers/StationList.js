import React from "react";
import Station from "../Components/Station";


const storagePrefix = "https://galcomstorage.blob.core.windows.net/app-data";
async function getStationJson(station){


    return await fetch(`${storagePrefix}/stations/${station}/${station}.json`)
            .then(res => res.json());
}
class StationList extends React.Component {
  constructor(props) {
    super(props);

    // set StationLists's initial state
    this.state = {
        stations: []
    };

  }

  componentDidMount() {
    const self=this;

    fetch("/api/stationList")
        .then(res => res.json())
        .then((stations) =>{
            //console.log("station list result: ",stations);
            stations.filter(station =>{
                    return station.type === "audio/mpeg";
                })
                .forEach(async station => {
                    const info = await getStationJson(station.name);
                    console.log("station info: ",info);
                    station.logoUrl = storagePrefix+ "/" + info.logo;
                    station.website = info.website;
                    station.displayName = info.name;
                    station.description = info.description;

                    
                    self.setState({
                        stations: self.state.stations.concat(station)
                    })

                    return station;
                });
        });
 
  }

  render(){
      var stationEls =  [];
      //console.log("rendering StationList");
      if(this.state.stations != null && this.state.stations.length > 0){
          //console.log("num stations: "+this.state.stations.length)
          stationEls = this.state.stations.sort((a,b) =>{
              if(a.name < b.name) return -1;
              else if(a.name > b.name) return 1;
              else return 0;
          })
          .map(station => {
                return <Station
                    key={station.name}
                    logoUrl = {station.logoUrl}
                    stationName = {station.name}
                    website = {station.website}
                    displayName = {station.displayName}
                    description = {station.description}
                />
            });
      }

      return (
        <div className="container">
            <div className="row my-5">
                <div className="col">
                    <h2>Listen Live</h2>
                </div>
            </div>

            <div className="row">
                <div className="col d-flex flex-wrap">
                    {stationEls}
                </div>
            </div>

        </div>
      );

  }
}


export default StationList;