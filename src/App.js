import React, { useEffect } from "react";
import VideoScreen from "./components/videoScreen";
import "./App.css";
import { useState } from "react";
const App = () => {
  let myRef = React.createRef();
  const [scrollTop, setScrollTop] = useState(0);
  const [position, setPosition] = useState(0);
  const List = [
    {
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      type: "video/mp4",
      index: 1,
    },
    {
      src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      type: "application/x-mpegURL",
      index: 2,
    },
    {
      src: "//vjs.zencdn.net/v/oceans.mp4",
      type: "video/mp4",
      index: 3,
    },
  ];

  const onScroll = () => {
    // const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
    setScrollTop(myRef.current.scrollTop);
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setPosition(scrollTop);
    }, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [scrollTop]);
  return (
    <div className="container" ref={myRef} onScroll={onScroll}>
      {List.map((item) => (
        <VideoScreen
          scrollIndex={position / window.innerHeight + 1}
          src={item.src}
          key={item.src}
          type={item.type}
          index={item.index}
        />
      ))}
    </div>
  );
};

export default App;
