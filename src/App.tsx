import React, { useRef, useState } from "react";
import { Player } from "./components/Player";
import { data } from "./utils";

import { ReactComponent as Library } from "./assets/songs.svg";
import { ReactComponent as Moon } from "./assets/moon.svg";
import { ReactComponent as Sun } from "./assets/sun.svg";

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
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
    let p = selectedId ? selectedId : nowPlaying.id;

    let id = data.findIndex((data) => data.id === p);
    let nextSong = data[(id + 1) % data.length];
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
          <button type="button" data-type="toggle" role="switch">
            <span>
              <Sun />
            </span>
            <div className="toggle__thumb"></div>
            <span>
              <Moon />
            </span>
          </button>
          <button
            type="button"
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
          />
        </section>

        <aside
          data-showTracks={showTracks}
          ref={trackRef}
          id="tracks"
          aria-label="all tracks"
        >
          <ul>
            {data.map((song) => (
              <li key={song.id} onClick={() => handleNextSong("", song.id)}>
                <img src={song.cover} alt={song.alt} />
                <div>
                  <span>{song.name}</span> <br />
                  <span>{song.artist}</span>
                </div>
              </li>
            ))}
            <button type="button" onClick={() => setShowTracks(false)}>
              close
            </button>
          </ul>
        </aside>
      </main>

      <footer></footer>
    </>
  );
};

export default App;
