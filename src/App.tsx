import React, { useRef, useState } from "react";
import { Player } from "./components/Player";
import { data, getRandomNumber } from "./utils";

import { ReactComponent as Library } from "./assets/songs.svg";
import { ToggleButton } from "./components/ToggleButton";
import { Song } from "./types";

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(data[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMetaData = (event: any) => {
    setSongInfo({
      duration: event.target.duration || 0,
      currentTime: event.target.currentTime,
    });
  };

  const handleNextSong = async (_: any, selectedId?: string) => {
    let songId = selectedId ? selectedId : nowPlaying.id;

    let id = data.findIndex((data) => data.id === songId);

    let nextSong: Song;
    if (selectedId) {
      nextSong = data[id]; //set now playing to the selected song
    } else if (shuffle && !selectedId) {
      nextSong = data[getRandomNumber(data.length)]; //Set the now playing to a randomly chosen song
    } else {
      nextSong = data[(id + 1) % data.length]; //Set now playing to the next song on the list
    }

    await setNowPlaying(nextSong);

    if (isPlaying) audioRef.current?.play();

    if (!isPlaying && selectedId) {
      setIsPlaying(true);
      audioRef.current?.play();
    }
  };

  const trackRef = useRef<HTMLElement>(null);

  return (
    <>
      <header>
        <h1>SoundMan</h1>
        <nav>
          <ToggleButton />

          <button
            type="button"
            aria-label="view library"
            aria-controls="tracks"
            aria-expanded={showTracks}
            onClick={() => {
              setShowTracks(true);
              trackRef.current?.focus();
            }}
          >
            <Library />
          </button>
        </nav>
      </header>

      <main>
        <section className="player">
          <audio
            src={nowPlaying.audio}
            ref={audioRef}
            onLoadedMetadata={handleMetaData}
            onTimeUpdate={handleMetaData}
            onEnded={handleNextSong}
          ></audio>

          <Player
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            setNowPlaying={setNowPlaying}
            currentSongId={nowPlaying.id}
            nowPlaying={nowPlaying}
            setShuffle={setShuffle}
            shuffle={shuffle}
          />
        </section>

        <aside
          data-showtracks={showTracks}
          ref={trackRef}
          id="tracks"
          aria-label="all tracks"
          onClick={() => setShowTracks(!showTracks)}
        >
          <ul>
            {data.map((song) => (
              <li
                key={song.id}
                onClick={() => handleNextSong("", song.id)}
                className={nowPlaying.id === song.id ? "selected" : ""}
              >
                <img src={song.cover} alt={song.alt} />
                <div>
                  <span>{song.name}</span> <br />
                  <span>{song.artist}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      <footer></footer>
    </>
  );
};

export default App;
