import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox';

const VideoPlayer = () => {
  const videoContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [trackedBoxes, setTrackedBoxes] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // Original box from Redux
  const box = useSelector((state) => state.player.selectedBoundary);

  // Store previous frame data for motion estimation
  const prevFrameRef = useRef(null);
  
  const getCanvasPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / canvas.width,
      y: (e.clientY - rect.top) / canvas.height
    };
  };

  const handleMouseDown = (e) => {
    const point = getCanvasPoint(e);
    setIsDrawing(true);
    setStartPoint(point);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const currentPoint = getCanvasPoint(e);

    // Clear and redraw all boxes
    drawAllBoxes();

    // Draw the current box being created
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    const width = (currentPoint.x - startPoint.x) * canvas.width;
    const height = (currentPoint.y - startPoint.y) * canvas.height;
    ctx.strokeRect(
      startPoint.x * canvas.width,
      startPoint.y * canvas.height,
      width,
      height
    );
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    
    const endPoint = getCanvasPoint(e);
    
    // Add new tracked box
    const newBox = {
      id: Date.now(),
      start: { x: startPoint.x, y: startPoint.y },
      end: { x: endPoint.x, y: endPoint.y },
      color: `hsl(${Math.random() * 360}, 100%, 50%)` // Random color for each box
    };
    
    setTrackedBoxes([...trackedBoxes, newBox]);
    setIsDrawing(false);
    setStartPoint(null);
  };

  const drawAllBoxes = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw original box if exists
    if (box) {
      const [startX, startY] = box.box.start;
      const [endX, endY] = box.box.end;
      const boxWidth = (endX - startX) * canvas.width;
      const boxHeight = (endY - startY) * canvas.height;
      
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        startX * canvas.width,
        startY * canvas.height,
        boxWidth,
        boxHeight
      );
    }

    // Draw all tracked boxes
    trackedBoxes.forEach(box => {
      ctx.strokeStyle = box.color;
      ctx.lineWidth = 2;
      const width = (box.end.x - box.start.x) * canvas.width;
      const height = (box.end.y - box.start.y) * canvas.height;
      ctx.strokeRect(
        box.start.x * canvas.width,
        box.start.y * canvas.height,
        width,
        height
      );
    });
  };

  // Update tracking on each frame
  const updateTracking = () => {
    if (!canvasRef.current || trackedBoxes.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const videoElement = videoContainerRef.current.querySelector('video');
    
    if (!videoElement || videoElement.paused) return;

    // Create a temporary canvas to analyze the current frame
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    const currentFrameData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    
    if (prevFrameRef.current) {
      // Update box positions based on motion estimation
      setTrackedBoxes(boxes => boxes.map(box => {
        const updatedBox = estimateMotion(
          box,
          prevFrameRef.current,
          currentFrameData,
          canvas.width,
          canvas.height
        );
        return updatedBox;
      }));
    }
    
    prevFrameRef.current = currentFrameData;
    setCurrentFrame(prev => prev + 1);
    requestAnimationFrame(updateTracking);
  };

  // Simple motion estimation function
  const estimateMotion = (box, prevFrame, currentFrame, width, height) => {
    // Convert normalized coordinates to pixel coordinates
    const boxX = Math.floor(box.start.x * width);
    const boxY = Math.floor(box.start.y * height);
    const boxWidth = Math.floor((box.end.x - box.start.x) * width);
    const boxHeight = Math.floor((box.end.y - box.start.y) * height);
    
    // Search area for motion
    const searchRadius = 10;
    let bestDx = 0;
    let bestDy = 0;
    let smallestDiff = Infinity;

    // Simple sum of absolute differences (SAD) based motion estimation
    for (let dy = -searchRadius; dy <= searchRadius; dy++) {
      for (let dx = -searchRadius; dx <= searchRadius; dx++) {
        let diff = 0;
        
        // Compare pixels in the box region
        for (let y = 0; y < boxHeight; y++) {
          for (let x = 0; x < boxWidth; x++) {
            const px = boxX + x;
            const py = boxY + y;
            const idx = (py * width + px) * 4;
            
            const newPx = px + dx;
            const newPy = py + dy;
            const newIdx = (newPy * width + newPx) * 4;
            
            if (newIdx >= 0 && newIdx < currentFrame.data.length - 3) {
              diff += Math.abs(currentFrame.data[newIdx] - prevFrame.data[idx]);
              diff += Math.abs(currentFrame.data[newIdx + 1] - prevFrame.data[idx + 1]);
              diff += Math.abs(currentFrame.data[newIdx + 2] - prevFrame.data[idx + 2]);
            }
          }
        }
        
        if (diff < smallestDiff) {
          smallestDiff = diff;
          bestDx = dx;
          bestDy = dy;
        }
      }
    }
    
    // Update box position based on estimated motion
    return {
      ...box,
      start: {
        x: box.start.x + bestDx / width,
        y: box.start.y + bestDy / height
      },
      end: {
        x: box.end.x + bestDx / width,
        y: box.end.y + bestDy / height
      }
    };
  };

  useEffect(() => {
    drawAllBoxes();
  }, [box, trackedBoxes]);

  useEffect(() => {
    updateTracking();
  }, []);

  return (
    <div
      ref={videoContainerRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
          pointerEvents: 'auto', // Changed to 'auto' to enable mouse events
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDrawing(false)}
      />
    </div>
  );
};

export default VideoPlayer;