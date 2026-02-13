import React from "react";
import "./Player.css";
import Logo from "./Logo";
import Footer from "./Footer";
import PlayerControl from "./PlayerControl";
import { WebAudioPeakMeter} from "web-audio-peak-meter";

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.audioContext = null;
    this.audioElement = null;
  }

  componentDidMount(){
    console.log("Player mount, setting event listeners")
    const audioEl = document.getElementById("the-audio");
    const meterEl = document.getElementById("peak_meter");

    if (!audioEl) {
      console.warn("Audio element not found: #the-audio");
      return;
    }

    this.audioElement = audioEl;

    audioEl.addEventListener("waiting",this.props.onBuffer);
    //audioEl.addEventListener("canplay",this.props.onReady);
    audioEl.addEventListener("error",this.props.onError);

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const sourceNode = this.audioContext.createMediaElementSource(audioEl);
    sourceNode.connect(this.audioContext.destination);

    if (meterEl && this.audioContext.audioWorklet && typeof this.audioContext.audioWorklet.addModule === "function") {
      this.peakMeter = new WebAudioPeakMeter(sourceNode, meterEl);
    } else if (!meterEl) {
      console.warn("Peak meter element not found: #peak_meter");
    } else {
      console.warn("AudioWorklet not supported in this browser; peak meter disabled.");
    }

    audioEl.addEventListener("play", () => {
      console.log("play event fired");
      if (this.audioContext && this.audioContext.state === 'suspended') {
        console.log("Resuming suspended audio context");
        this.audioContext.resume();
      }
    });

    audioEl.addEventListener("playing", () => {
      console.log("playing event fired - audio is actually playing");
      this.props.onReady();
    });

    console.log("Audio setup complete");
  }

  componentDidUpdate(prevProps) {
    // When play is requested, ensure audio plays
    if (this.props.isPlaying && !prevProps.isPlaying) {
      console.log("Play requested - ensuring playback starts");
      
      // Resume AudioContext if suspended (must be done on user gesture)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        console.log("Resuming suspended AudioContext");
        this.audioContext.resume().then(() => {
          console.log("AudioContext resumed successfully");
        });
      }
      
      // Only call play() if autoPlay didn't work and audio is still paused
      // Use a small delay to let the src change and autoPlay attempt to work first
      setTimeout(() => {
        if (this.audioElement && this.audioElement.paused && this.props.isPlaying) {
          console.log("AutoPlay didn't work, calling play() manually");
          const playPromise = this.audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.warn("Failed to play audio:", err);
              // If play fails, reset to paused state so play button shows
              if (this.props.onError) {
                this.props.onError(err);
              }
            });
          }
        }
      }, 100);
    }
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
        <button className="btn btn-secondary m-5 collapse show  meter-set" type="button" data-toggle="collapse" data-target=".meter-set">Show Meter</button>
        <div id="peak_meter" className="meter-bar collapse mt-5 mx-5 meter-set " ></div>
        <button className="btn btn-secondary m-5 collapse meter-set " type="button" data-toggle="collapse" data-target=".meter-set">Hide Meter</button>
        <div id="footer">
          <Footer foregroundColor={this.props.foregroundColor} />
        </div>
      </div>
    );
  }
}

export default Player;
