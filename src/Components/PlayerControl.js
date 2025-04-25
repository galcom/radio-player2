import React from "react";
import "./PlayerControl.css";
//import FilePlayer from "react-player/lib/players/FilePlayer";

function PlayerControl(props) {

  //console.log("player props: ",props);
  //const filePlayer =   <FilePlayer
  //                      id="audio-wrapper"
  //                      url={props.streamUrl}
  //                      playing={props.isPlaying}
  //                      config={{
  //                        file: {
  //                          forceAudio: true,
  //                          autoplay: true,
  //                        },
  //                      }}
  //                      onReady={() => {
  //                        props.onReady();
  //                      }}
  //                      onBuffer={() => {
  //                        props.onBuffer();
  //                      }}
  //                      onError={props.onError}
  //                    />

  const noSource = "" //"javascript:void(0)"
  const filePlayer = <audio
                      src={props.streamUrl}
                      preload="auto"
                      autoPlay={true}
                     />
  const audioEl = document.querySelector("audio");

  // the 'audio' tag does not stop pulling data from source when paused.
  // So here we reset the 'src' attribute to force it to stop when play is paused,
  // then re-set it when play is resumed
  if(audioEl != null){
    const currentSrc = audioEl.getAttribute("src");
    //console.log("current src: "+currentSrc);
    if(props.isPlaying && currentSrc != props.streamUrl){
      //console.log("IS playing");
      audioEl.setAttribute("src",props.streamUrl); 
      setTimeout(() =>audioEl.load());
    }else if( ! props.isPlaying && currentSrc != noSource){
      //console.log("NOT playing");
      audioEl.setAttribute("src",noSource); //remove src value to stop streaming
      setTimeout(() =>audioEl.load());
    }
  }

  return (
    <React.Fragment>
	   <div> {props.streamUrl == null ? "No station given or station not found" :""} </div>
      <img
        id="play"
        className={props.streamUrl == null || props.isPlaying ? "hidden" : "visible"}
        src="./images/play.gif"
        alt="Play"
        onClick={() => {
          props.togglePlaying();
        }}
      />
      {/* If we will use loading-ripple, below comment could be deleted 
        <div
        id="loading"
        style={{ borderRight: "30px solid " + props.foregroundColor }}
        className={props.isPlaying && !props.isReady ? "visible" : "hidden"}
        onClick={() => {
          props.togglePlaying();
        }}
      /> */}
      <div 
        id="loading-ripple"
        className={props.isPlaying && !props.isReady ? "visible" : "hidden"}
        onClick={() => {
          props.togglePlaying();
        }}
      >
        <div
          style={{ border: "6px solid " + props.foregroundColor }}
         />
        <div
          style={{ border: "6px solid " + props.foregroundColor }}
         />
      </div>
      <img
        id="pause"
        className={props.isPlaying && props.isReady ? "visible" : "hidden"}
        src="./images/pause.gif"
        alt="Pause"
        onClick={() => {
          props.togglePlaying();
        }}
      />
        {
          //props.isPlaying ? filePlayer :null
          <>
            {filePlayer}
          </>
        }
    </React.Fragment>
  );
}

export default PlayerControl;
