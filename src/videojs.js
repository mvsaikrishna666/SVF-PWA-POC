import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;
  const [togglePlay, setTogglePlay] = React.useState(true);

  React.useEffect(() => {
    let IntOptions = {
      rootMargin: "0px",
      threshold: 0.75,
    };
    const videoElement = videoRef.current;

    const player = (playerRef.current = videojs(videoElement, options, () => {
      console.log("player is ready");
      onReady && onReady(player);
    }));
    let handlePlay = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onReady && onReady(player);
          playerRef.current.play();
        } else {
          playerRef.current.pause();
        }
      });
    };

    let observer = new IntersectionObserver(handlePlay, IntOptions);

    observer.observe(videoRef.current);
  }, []);

  // React.useEffect(() => {
  //   // make sure Video.js player is only initialized once
  //   if (!playerRef.current) {
  //     const videoElement = videoRef.current;
  //     if (!videoElement) return;

  //     const player = (playerRef.current = videojs(videoElement, options, () => {
  //       console.log("player is ready");
  //       onReady && onReady(player);
  //     }));
  //   } else {
  //     // you can update player here [update player through props]
  //     // const player = playerRef.current;
  //     // player.autoplay(options.autoplay);
  //     // player.src(options.sources);
  //   }
  // }, [options, videoRef, playerRef]);

  const TogglePlay = () => {
    if (togglePlay) {
      playerRef.current.pause();
      setTogglePlay(false);
    } else {
      playerRef.current.play();
      setTogglePlay(true);
    }
  };

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        onClick={() => TogglePlay()}
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
};

export default VideoJS;
