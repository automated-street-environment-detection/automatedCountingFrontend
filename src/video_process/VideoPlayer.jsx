import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox';  

const VideoPlayer = () => {
  const videoContainerRef = useRef(null); 
  const canvasRef = useRef(null);
  
  const box = useSelector((state) => state.player.selectedBoundary); 

  useEffect(() => {
    if (canvasRef.current && box) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const [startX, startY] = box.box.start;
      const [endX, endY] = box.box.end;
   
     
      const boxWidth = (endX - startX)*canvas.width;
      const boxHeight = (endY - startY)*canvas.height;
        
      const x = startX * canvas.width;
      const y = startY * canvas.height;
      
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);
    }
  }, [box]); 

  return (
    <div
      ref={videoContainerRef} 
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
