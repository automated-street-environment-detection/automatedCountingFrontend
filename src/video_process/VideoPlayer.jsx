import * as React from 'react';
import ReactPlayer from 'react-player';
function VideoPlayer() {
   const [playbackRate, setPlaybackRate] = React.useState(1.0);
   const [isPlaying, setIsPlaying] = React.useState(true);
   const [drawing, setDrawing] = React.useState(true); // State to track if drawing mode is active
   const [startX, setStartX] = React.useState(0);
   const [startY, setStartY] = React.useState(0);
   const canvasRef = React.useRef(null);
   const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
   const changePlaybackSpeed = (speed) => {
    setPlaybackRate(speed);
  };
  // // Start drawing a box
  // const startDrawing = (e) => {
  //   if (!drawing) return;
  //   console.log('Start drawing');
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   setStartX(e.clientX - rect.left);
  //   setStartY(e.clientY - rect.top);
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;
  // };

  // // Draw the box on canvas
  // const draw = (e) => {
  //   if (!drawing) return;

  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   const rect = canvas.getBoundingClientRect();
  //   const x = Math.min(startX, e.clientX - rect.left);
  //   const y = Math.min(startY, e.clientY - rect.top);
  //   const width = Math.abs(startX - e.clientX + rect.left);
  //   const height = Math.abs(startY - e.clientY + rect.top);

  //   ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
  //   ctx.strokeStyle = 'red';
  //   ctx.lineWidth = 5;
  //   ctx.strokeRect(0, 0, 20, 30);
  // };

  // // End drawing a box
  // const endDrawing = () => {
  //   if (!drawing) return;
  //   setDrawing(false);
  // };
  // const toggleDrawingMode = () => {
  //   setDrawing((prev) => !prev);
  //   console.log(`Drawing mode:${drawing} `);
  // };
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url="/test1.mov" // replace with your video file
        width="100%"
        height="100%"
        controls={false}
        playbackRate={playbackRate}
        playing={isPlaying}
        onClick={() => {} }
      />
      {/* <canvas
        ref={canvasRef}
        width="2000" // Set to the width of your video
        height="200" // Set to the height of your video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'auto', // Allow interactions with the video underneath
          zIndex: 2
        }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      />
       */}
      
      <div className="controls">
        <button onClick={() => changePlaybackSpeed(0.5)}>0.5x</button>
        <button onClick={() => changePlaybackSpeed(1.0)}>1x</button>
        <button onClick={() => changePlaybackSpeed(1.5)}>1.5x</button>
        <button onClick={() => changePlaybackSpeed(2.0)}>2x</button>
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {/* <button onClick={toggleDrawingMode}>
          {drawing ? 'Stop Drawing' : 'Start Drawing'}
        </button> */}
      </div>
    </div>
  );
}
  
  export default VideoPlayer;