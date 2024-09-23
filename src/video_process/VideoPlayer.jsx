import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox';  

const VideoPlayer = () => {
  const videoContainerRef = useRef(null); 
  const canvasRef = useRef(null);
  
  const box = useSelector((state) => state.player.selectedBoundary);  // Video source

  // Effect to draw the boundary box on the canvas when dimensions or box changes
  useEffect(() => {
    if (canvasRef.current && box) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate box dimensions and position
      const boxWidth = box.box.width * canvas.width;
      const boxHeight = box.box.height * canvas.height;
      const x = box.box.x * canvas.width;
      const y = box.box.y * canvas.height;
      console.log("2",x,y);

      // Draw the red boundary box
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);
    }
  }, [box]); // Re-run when dimensions or box changes

  return (
    <div
      ref={videoContainerRef} // Video container ref
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <VideoPlayerNoBox 
          style={{
           position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
          }}
        />

      {/* Canvas overlay to draw the boundary box */}
      <canvas
        ref={canvasRef} 
        style={{
          position: 'absolute', 
          top: 0,
          left: 0,
          pointerEvents: 'none', 
          zIndex: 1, 
          width:'100%', 
          height:'100%', 
        }}
      />
    </div>
  );
};

export default VideoPlayer;
