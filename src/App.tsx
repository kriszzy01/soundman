import React, { useRef, useState } from "react";
import { Player } from "./components/Player";
import { data } from "./utils";

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMetaData = (event: any) => {
    setSongInfo({
      duration: event.target.duration,
      currentTime: event.target.currentTime,
    });
  };

  return (
    <>
      <p>Hello</p>

      <audio
        src={data[0].audio}
        ref={audioRef}
        onLoadedMetadata={handleMetaData}
        onTimeUpdate={handleMetaData}
      ></audio>

      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
    </>
  );
};

export default App;
