import * as React from 'react';
import ReactPlayer from 'react-player';

//improve：sperate the canvas and the video player!!
//video dimension may vary in different video files and there might be some issue on video player(different video path)
function VideoPlayer() {
  const [playbackRate, setPlaybackRate] = React.useState(1.0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [playerTime, setPlayerTime] = React.useState(0); // State to track current time
  const [duration, setDuration] = React.useState(0); // State to track video duration
  const canvasRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const startXRef = React.useRef(0);
  const startYRef = React.useRef(0);
  const contextRef = React.useRef(null);

  const handleReady = () => {
    const videoElement = playerRef.current.getInternalPlayer();
    const videoWidth = videoElement.videoWidth;
    const videoHeight = videoElement.videoHeight;

    const canvas = canvasRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    canvas.style.width = `${videoWidth}px`;
    canvas.style.height = `${videoHeight}px`;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    contextRef.current = ctx; // Store the context in a ref for later use
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const changePlaybackSpeed = (speed) => {
    setPlaybackRate(speed);
  };

  const handleMouseDown = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    startXRef.current = event.clientX - rect.left;
    startYRef.current = event.clientY - rect.top;
  };

  const handleMouseUp = (event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    const rect = canvas.getBoundingClientRect();
    const endX = event.clientX - rect.left;
    const endY = event.clientY - rect.top;

    // Draw a straight line from the start point to the end point
    ctx.beginPath();
    ctx.moveTo(startXRef.current, startYRef.current);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
  };

  const toggleDrawingMode = () => {
    setIsDrawing((prev) => !prev); // Toggle drawing mode
  };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
  };

  const handleProgress = (progress) => {
    setPlayerTime(progress.playedSeconds); // Update the current time of the video
    setDuration(progress.loadedSeconds || playerRef.current.getDuration()); // Update the total duration of the video
  };

  const handleSeekChange = (event) => {
    const newTime = parseFloat(event.target.value);
    playerRef.current.seekTo(newTime, 'seconds');
    setPlayerTime(newTime); // Update player time state
  };

  return (
    <div className="player-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactPlayer
        ref={playerRef} // **Reference to the ReactPlayer component
        className="react-player"
        url="/test1.mov" // Replace with your video file
        width="100%"
        height="100%"
        controls={false}
        playbackRate={playbackRate}
        playing={isPlaying}
        onReady={handleReady} // **Call handleReady when the video is ready
        onProgress={handleProgress} // **Update the current time and duration
      />

      <canvas
        ref={canvasRef}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          pointerEvents: 'auto', // Enable mouse events
          zIndex: 10 // Ensure canvas is on top
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

      <div className="controls">
        <button onClick={() => changePlaybackSpeed(0.5)}>0.5x</button>
        <button onClick={() => changePlaybackSpeed(1.0)}>1x</button>
        <button onClick={() => changePlaybackSpeed(1.5)}>1.5x</button>
        <button onClick={() => changePlaybackSpeed(2.0)}>2x</button>
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={toggleDrawingMode}>
          {isDrawing ? 'Disable Drawing' : 'Enable Drawing'}
        </button>
        <button onClick={clearDrawing}>Clear Drawing</button>

        <div className="progress-bar" style={{ marginTop: '10px' }}>
          <input
            type="range"
            min={0}
            max={duration}
            step="0.1"
            value={playerTime}
            onChange={handleSeekChange}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;