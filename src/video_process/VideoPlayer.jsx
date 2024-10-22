import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox';  

const VideoPlayer = () => {
  const videoContainerRef = useRef(null); 
  const canvasRef = useRef(null);
  
  const box = useSelector((state) => state.player.selectedBoundary); 
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [manualBoxes, setManualBoxes] = useState([]);
  const [tempBox, setTempBox] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set actual pixel dimensions
      const updateCanvasSize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      };
      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);

      // Drawing function
      const drawAllBoxes = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the box from Redux state
        if (box) {
          const [startX, startY] = box.box.start;
          const [endX, endY] = box.box.end;
          const boxWidth = (endX - startX) * canvas.width;
          const boxHeight = (endY - startY) * canvas.height;
          const x = startX * canvas.width;
          const y = startY * canvas.height;
          
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, boxWidth, boxHeight);
        }

        // Draw all manual boxes
        manualBoxes.forEach(manualBox => {
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.strokeRect(manualBox.x, manualBox.y, manualBox.width, manualBox.height);
        });

        // Draw temporary box while drawing
        if (tempBox) {
          ctx.strokeStyle = 'yellow';
          ctx.lineWidth = 2;
          ctx.strokeRect(tempBox.x, tempBox.y, tempBox.width, tempBox.height);
        }
      };

      // Set up animation loop
      const animate = () => {
        drawAllBoxes();
        requestAnimationFrame(animate);
      };
      animate();

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
      };
    }
  }, [box, manualBoxes, tempBox]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPoint({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setTempBox({
      x: Math.min(startPoint.x, currentX),
      y: Math.min(startPoint.y, currentY),
      width: Math.abs(currentX - startPoint.x),
      height: Math.abs(currentY - startPoint.y)
    });
  };

  const handleMouseUp = () => {
    if (tempBox && tempBox.width > 10 && tempBox.height > 10) {
      setManualBoxes(prev => [...prev, tempBox]);
    }
    
    setIsDrawing(false);
    setTempBox(null);
  };

  return (
    <div
      ref={videoContainerRef} 
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <VideoPlayerNoBox 
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%'
        }}
      />

      <canvas
        ref={canvasRef} 
        style={{
          position: 'absolute', 
          top: 0,
          left: 0,
          zIndex: 1, 
          width:'100%', 
          height:'100%', 
          cursor: 'crosshair'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default VideoPlayer;