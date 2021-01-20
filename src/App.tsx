import React, { useRef, useState } from "react";
import { Player } from "./components/Player";
import { data } from "./utils";

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
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

  const handleSongEnd = async () => {
    let id = data.findIndex((data) => data.id === nowPlaying.id);
    let nextSong = data[(id + 1) % data.length];
    await setNowPlaying(nextSong);
    if (isPlaying) audioRef.current?.play();
  };

  return (
    <>
      <header>
        <h1>SoundMan</h1>
        <nav>
          <button>Music List</button>
          <button>Dark Mode</button>
        </nav>
      </header>

      <main>
        <section className="player">
          <audio
            src={nowPlaying.audio}
            ref={audioRef}
            onLoadedMetadata={handleMetaData}
            onTimeUpdate={handleMetaData}
            onEnded={handleSongEnd}
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

        <aside>
          <ul>
            {data.map((song) => (
              <li>
                <img src={nowPlaying.cover} alt={nowPlaying.alt} />
                <div>
                  <span>{song.name}</span>
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
