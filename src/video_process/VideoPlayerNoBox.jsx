import * as React from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPlayerTime } from "../redux/playerSlice";

function VideoPlayerNoBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playerTime = useSelector((state) => state.player.playerTime);
  const [playbackRate, setPlaybackRate] = React.useState(1.0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [duration, setDuration] = React.useState(0);
  const video = useSelector((state) => state.player.selectedVideo);
  useEffect(() => {
    if (!video || !video.title) {
      navigate("/video");
    }
  }, [video, navigate]);
  const videoSrc = video?.url || "";

  const playerRef = React.useRef(null);
  const videoContainerRef = React.useRef(null);

  const handleReady = () => {
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
    }
  };

  const handleProgress = (progress) => {
    dispatch(setPlayerTime(progress.playedSeconds));
    setDuration(playerRef.current.getDuration());
  };

  const handleSeekChange = (event) => {
    const newTime = parseFloat(event.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, "seconds");
      dispatch(setPlayerTime(newTime));
    }
  };
  const handleKeyDown = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      setIsPlaying((prev) => !prev);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerTime, "seconds");
    }
  }, [playerTime]);

  return (
    <div ref={videoContainerRef} className="player-wrapper">
      {/* Adjust the ReactPlayer to take 70% of the container */}
      <div
        style={{
          width: "70%",
          height: "70%",
          position: "relative",
          top: 0,
          left: 0,
        }}
      >
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          url={videoSrc}
          width="100%"
          height="100%"
          controls={false}
          playbackRate={playbackRate}
          playing={isPlaying}
          onReady={handleReady}
          onProgress={handleProgress}
          loop={false}
        />
      </div>

      {/* Control buttons below or to the side of ReactPlayer */}
      <div
        className="controls"
        style={{ marginTop: "10px", width: "70%", position: "relative" }}
      >
        <button onClick={() => setPlaybackRate(0.5)}>0.5x</button>
        <button onClick={() => setPlaybackRate(1.0)}>1x</button>
        <button onClick={() => setPlaybackRate(1.5)}>1.5x</button>
        <button onClick={() => setPlaybackRate(2.0)}>2x</button>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div
          className="progress-bar"
          style={{
            marginTop: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            {Math.floor(playerTime)} seconds
          </span>
          <input
            type="range"
            min={0}
            max={duration}
            step="0.1"
            value={playerTime}
            onChange={handleSeekChange}
            style={{ flexGrow: 1 }} // Make the input take the available space
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerNoBox;
