import React from "react";
import "./Player.css";
import Logo from "./Logo";
import Footer from "./Footer";
import PlayerControl from "./PlayerControl";
import { WebAudioPeakMeter} from "web-audio-peak-meter";

class Player extends React.Component {


  componentDidMount(){
    console.log("Player mount, setting event listeners")
    const audioEl = document.querySelector("audio");

    audioEl.addEventListener("waiting",this.props.onBuffer);
    audioEl.addEventListener("canplay",this.props.onReady);
    audioEl.addEventListener("error",this.props.onError);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var peakMeter = null;
    const meterEl = document.getElementById("peak-meter");
    const sourceNode = audioContext.createMediaElementSource(audioEl);
    sourceNode.connect(audioContext.destination);
    peakMeter = new WebAudioPeakMeter(sourceNode,meterEl,{
      //dbRangeMin:-40,
      //dbRangeMax:40
    });
    //peakMeter  = createMeterNode(sourceNode,audioContext);
    //createMeter(meterEl,peakMeter,{})

    audioEl.addEventListener("play", () => {
      console.log("play event");
      audioContext.resume();
    });
    console.log("created new peak meter");
  
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

          <div id="peak-meter" style={{width:"400px"}} ></div>
        </div>
        <div id="footer">
          <Footer foregroundColor={this.props.foregroundColor} />
        </div>
      </div>
    );
  }
}

export default Player;
