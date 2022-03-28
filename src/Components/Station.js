import React from "react";
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
        <div className="card flex-fill station" >
            <img className="card-img-top" src={this.props.logoUrl} alt="radio station logo"/>
            <div class="card-body">
                <h5 class="card-title">{this.props.displayName}</h5>
                <p class="cart-text">
                    {this.props.description}
                </p>
                <p class="cart-text">
                    {websiteLink}
                </p>
            </div>
            <div class="card-footer text-center">
                <button onClick={this.openInWindowFn(this.props.stationName)} 
                        className="btn btn-galcom my-3" >Listen Now</button>

            </div>
        </div>
      );
 
  }
}
export default Station