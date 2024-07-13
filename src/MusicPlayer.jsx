import  { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './MusicPlayer.css';

function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chart');
      const data = await response.json();
      setSongs(data.tracks.data);
      setCurrentSong(data.tracks.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleSongChange = (song) => {
    setCurrentSong(song);
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="music-player">
      <div className="player">
        {currentSong && (
          <ReactPlayer
            ref={playerRef}
            url={currentSong.preview}
            controls
            playing
            width="100%"
            height="50px"
          />
        )}
      </div>
      <div className="song-list">
        {songs.map((song, index) => (
          <div
            key={index}
            className={`song-item ${song.id === currentSong.id ? 'active' : ''}`}
            onClick={() => handleSongChange(song)}
          >
            {song.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicPlayer;
