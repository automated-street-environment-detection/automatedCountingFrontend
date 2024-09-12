import * as React from "react";
import ReactPlayer from "react-player";
import CanvasBox from "./canvasbox";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerTime } from "../redux/playerSlice";

function VideoPlayer() {
  const dispatch = useDispatch();
  const playerTime = useSelector((state) => state.player.playerTime);
  const [playbackRate, setPlaybackRate] = React.useState(1.0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  // const [playerTime, setPlayerTime] = React.useState(0); // State to track current time
  const [duration, setDuration] = React.useState(0); // State to track video duration
  const [canvasDimensions, setCanvasDimensions] = React.useState({
    width: 0,
    height: 0,
  }); // Canvas dimensions

  const playerRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (playerRef.current) {
        const videoElement = playerRef.current.getInternalPlayer();
        if (videoElement) {
          setCanvasDimensions({
            width: videoElement.offsetWidth, // Displayed width
            height: videoElement.offsetHeight, // Displayed height
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial dimensions
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReady = () => {
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
      if (videoElement) {
        setCanvasDimensions({
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
        });
      }
    }
  };

  const handleProgress = (progress) => {
    dispatch(setPlayerTime(progress.playedSeconds));
    setDuration(progress.loadedSeconds || playerRef.current.getDuration());
  };

  const handleSeekChange = (event) => {
    const newTime = parseFloat(event.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, "seconds");
      dispatch(setPlayerTime(newTime));
    }
  };

  return (
    <div
      className="player-wrapper"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        url="/TestFootage.MOV" // Replace with your video file
        width="100%"
        height="100%"
        controls={false}
        playbackRate={playbackRate}
        playing={isPlaying}
        onReady={handleReady} // Call handleReady when the video is ready
        onProgress={handleProgress} // Update the current time and duration
      />
      {canvasDimensions && <CanvasBox dimensions={canvasDimensions} />}{" "}
      {/* Render CanvasBox when dimensions are available */}
      <div className="controls">
        <button onClick={() => setPlaybackRate(0.5)}>0.5x</button>
        <button onClick={() => setPlaybackRate(1.0)}>1x</button>
        <button onClick={() => setPlaybackRate(1.5)}>1.5x</button>
        <button onClick={() => setPlaybackRate(2.0)}>2x</button>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div className="progress-bar" style={{ marginTop: "10px" }}>
          <input
            type="range"
            min={0}
            max={duration}
            step="0.1"
            value={playerTime}
            onChange={handleSeekChange}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
