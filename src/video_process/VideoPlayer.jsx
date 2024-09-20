import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox';  // Import VideoPlayer component


const VideoPlayer = () => {
  const canvasRef = useRef(null);
  const box = useSelector((state) => state.player.selectedBoundary);
  const dimensions = useSelector((state) => state.player.canvasDimensions);
  useEffect(() => {
    if (dimensions && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a box or boundary (for demonstration)
      const boxWidth = box.box.width * canvas.width;
      const boxHeight = box.box.height * canvas.height;

      const x = box.box.x * canvas.width;
      const y = box.box.y * canvas.height;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);
    }
  }, [dimensions]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Render VideoPlayer component */}
      <VideoPlayerNoBox />

      {/* Canvas positioned on top of the VideoPlayer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', // Positioned on top
          top: 0,
          left: 0,
          pointerEvents: 'none', // Prevent mouse events on the canvas
          zIndex: 1, // Ensure the canvas is above the video player
          width: dimensions.width,
          height: dimensions.height,
        }}
      />
    </div>
  );
};

export default VideoPlayer;