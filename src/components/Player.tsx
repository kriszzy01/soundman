import React, { useState } from "react";

import { ReactComponent as Pause } from "../assets/pause.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Next } from "../assets/next.svg";
import { ReactComponent as Prev } from "../assets/prev.svg";

import { getPercentage, getSeconds } from "../utils";

type SongInfo = {
  currentTime: number;
  duration: number;
};

interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSongInfo: React.Dispatch<React.SetStateAction<SongInfo>>;
  songInfo: SongInfo;
}

export const Player: React.FC<PlayerProps> = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
}) => {
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
  };

  const handleSliderDrag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSongInfo({
      ...songInfo,
      currentTime: +event.target.value,
    });

    if (audioRef.current) {
      audioRef.current.currentTime = +event.target.value;
    }
  };

  const { currentTime, duration } = songInfo;

  return (
    <>
      <div>
        <span>{getSeconds(currentTime)}</span>

        <div data-type="range">
          <input
            type="range"
            id="range"
            min="0"
            max={duration}
            value={currentTime}
            list="none"
            onChange={handleSliderDrag}
          />
          <div
            style={{
              transform: `translateX(${getPercentage(currentTime, duration)}%)`,
            }}
          ></div>
        </div>

        <span>{getSeconds(duration)}</span>
      </div>

      <div>
        <button type="button">
          <Prev />
          <span className="vh">Previous Music</span>
        </button>

        <button type="button" onClick={handlePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
          <span className="vh">{isPlaying ? "Pause Music" : "Play Music"}</span>
        </button>

        <button type="button">
          <Next />
          <span className="vh">Next Music</span>
        </button>
      </div>
    </>
  );
};
