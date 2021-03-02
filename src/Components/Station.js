import React from "react";
import { Link } from 'react-router-dom';
import "./Station.css";

class Station extends React.Component {
  openInWindowFn(stationName) {
    const url = "/?station="+stationName;
    return function(){
        window.open(
            url, 'listennow',
            'toolbar=no,resizable=no,title=no,scrollbars=no,titlebar=no,width=360,height=550'	
        );
    }
  }
  render() {
      //console.log("rendering station: ",this.props);
      var websiteLink="";
      if(this.props.website != null){
          websiteLink = <a href={this.props.website} target="_blank" rel="noopener noreferrer">Visit Station's Website</a>
      }
      return (
        <div className="row my-3 station">
            <div className="col-lg-4 text-center">
                <div className="logo">
                    <img className="w-50 py-3" src={this.props.logoUrl} alt="radio station logo"/>
                </div>
            </div>
            <div className="col-lg-8 py-3">
                <h3>{this.props.displayName}</h3>
                <p>
                    {this.props.description}
                </p>
                <p>
                    {websiteLink}
                </p>
                <button onClick={this.openInWindowFn(this.props.stationName)} className="btn btn-galcom my-3" >Listen Now</button>
            </div>

        </div>
      );
 
  }
}
export default Station