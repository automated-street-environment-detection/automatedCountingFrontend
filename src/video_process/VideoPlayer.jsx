import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox';
import {
  Button
} from "@mui/material";
const VideoPlayer = () => {
  const videoContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const box = useSelector((state) => state.player.selectedBoundary);

  //draw the object tracking box for model
  const [userBoxes, setUserBoxes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [isPointerActive, setIsPointerActive] = useState(true); // Track pointer activation within bounds
  //resize the canvas(optional for now not sure working well or not)
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && videoContainerRef.current) {
        canvasRef.current.width = videoContainerRef.current.offsetWidth;
        canvasRef.current.height = videoContainerRef.current.offsetHeight;
        const ctx = canvasRef.current.getContext('2d');
       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
       drawBoundaryBox(ctx);
      }
    };
    
    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(videoContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const drawBoundaryBox = (ctx) => {
    // Draw the boundary box
    if (box) {
      const [startX, startY] = box.box.start;
      const [endX, endY] = box.box.end;
      const boxWidth = (endX - startX) * canvasRef.current.width;
      const boxHeight = (endY - startY) * canvasRef.current.height;
      const x = startX * canvasRef.current.width;
      const y = startY * canvasRef.current.height;

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);
    }
  };
  
  //limit the draw area(improve from the original version)
  const DRAW_HEIGHT_LIMIT = 500; 
  const DRAW_WIDTH_LIMIT = 900;
  useEffect(() => {
    const handleMousePosition = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const currentY = e.clientY - rect.top;
      const currentX = e.clientX - rect.left;
      if (currentY <= DRAW_HEIGHT_LIMIT&& currentX <= DRAW_WIDTH_LIMIT) {
        setIsPointerActive(true); // Activate pointer within bounds
      } else {
        setIsPointerActive(false); // Deactivate pointer outside bounds
      }
    };
    window.addEventListener('mousemove', handleMousePosition);
    return () => window.removeEventListener('mousemove', handleMousePosition);
  }, []);

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
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //boundary box 
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
    
    //object tracking box
    userBoxes.forEach(({ startX, startY, endX, endY }) => {
      const boxWidth = endX - startX;
      const boxHeight = endY - startY;
      const x = startX;
      const y = startY;
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);
    });
  }, [box, userBoxes]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    if (startY <= DRAW_HEIGHT_LIMIT&& startX <= DRAW_WIDTH_LIMIT) {
      setStartPoint({ startX, startY });
      setIsDrawing(true);
      setIsPointerActive(true);
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    if (currentY <= DRAW_HEIGHT_LIMIT && currentX <= DRAW_WIDTH_LIMIT) {
      if (!isPointerActive) setIsPointerActive(true);
    } else {
      setIsPointerActive(false);
      return; // Exit early if out of bounds
    }

    if (!isDrawing || !startPoint || !isPointerActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    userBoxes.forEach(({ startX, startY, endX, endY }) => {
      const boxWidth = endX - startX;
      const boxHeight = endY - startY;
      const x = startX;
      const y = startY;
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);
    });

    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      startPoint.startX,
      startPoint.startY,
      currentX - startPoint.startX,
      currentY - startPoint.startY
    );
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || !startPoint) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    setUserBoxes([...userBoxes, { startX: startPoint.startX, startY: startPoint.startY, endX, endY }]);
    setIsDrawing(false);
    setStartPoint(null);
  };
  const clearUserBoxes = () => {
    setUserBoxes([]); };

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
          pointerEvents: isPointerActive ? 'auto' : 'none', // Toggle pointer events based on position
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <Button variant="outlined"
        onClick={clearUserBoxes}
       
      >
        Clear All Boxes
      </Button>
    </div>
  );
};

export default VideoPlayer;
