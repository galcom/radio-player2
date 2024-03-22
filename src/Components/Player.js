import React from "react";
import "./Player.css";
import Logo from "./Logo";
import Footer from "./Footer";
import PlayerControl from "./PlayerControl";

class Player extends React.Component {


  componentDidMount(){
    console.log("Player mount, setting event listeners")
    const audioEl = document.querySelector("audio");

    audioEl.addEventListener("waiting",this.props.onBuffer);
    audioEl.addEventListener("canplay",this.props.onReady);
    audioEl.addEventListener("error",this.props.onError);
  }

  render() {
    return (
      <div id="wrapper" style={{ backgroundColor: this.props.backgroundColor }}>
        <div id="top">
          <Logo logo={this.props.logo}
                stationWebsite={this.props.stationWebsite} 
          />
        </div>
        <div id="middle">
          <PlayerControl
            streamUrl={this.props.streamUrl}
            streams={this.props.streams}
            logo={this.props.logo}
            foregroundColor={this.props.foregroundColor}
            // player controls
            isOnline={this.props.isOnline}
            isBroadcasting={this.props.isBroadcasting}
            isPlaying={this.props.isPlaying}
            isReady={this.props.isReady}
            onReady={this.props.onReady}
            onBuffer={this.props.onBuffer}
            togglePlaying={this.props.togglePlaying}
            onError={this.props.onError}
          />
        </div>
        <div id="footer">
          <Footer foregroundColor={this.props.foregroundColor} />
        </div>
      </div>
    );
  }
}

export default Player;
