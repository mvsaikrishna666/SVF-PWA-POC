import React, { useEffect, useState } from "react";
import VideoJS from "../videojs";
import "./videoScreen.css";

const VideoScreen = (props) => {
  const playerRef = React.useRef(null);
  const [player, setPlayer] = useState();

  const videoJsOptions = {
    autoplay: true,
    muted: true,
    width: window.innerWidth,
    height: window.innerHeight,
    controls: false,
    sources: [
      {
        src: props.src,
        type: props.type,
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    setPlayer(player);
    // console.log(playerRef);

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  // const changePlayerOptions = () => {
  //   // you can update the player through the Video.js player instance
  //   if (!playerRef.current) {
  //     return;
  //   }
  //   // [update player through instance's api]
  //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
  //   playerRef.current.autoplay(false);
  // };

  // const some = () =>
  //   setTimeout(() => {
  //     playerRef?.current.muted(false);
  //     playerRef.current.play();
  //   }, 500);
  // useEffect(() => {
  //   some();
  // }, []);
  useEffect(() => {
    props.index === Math.round(props.scrollIndex) &&
      console.log(props.index, Math.round(props.scrollIndex));
  }, [props.scrollIndex]);
  return (
    <div className="vid-container">
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div className="btn-wrapper">
        <button
          className="like-btn"
          onClick={() =>
            console.log("Liked at ", playerRef.current.currentTime())
          }
        >
          <i className="far fa-heart"></i>
        </button>
        <button
          className="like-btn"
          onClick={() => console.log("Open Share Window")}
        >
          <i className="fa fa-share"></i>
        </button>
        <button
          className="like-btn"
          onClick={() => console.log("Open CommentBox")}
        >
          <i className="far fa-comment"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoScreen;
