import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox';

const VideoPlayer = () => {
  const videoContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const box = useSelector((state) => state.player.selectedBoundary);
  
  // State for tracking multiple objects
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [trackers, setTrackers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  
  // State for temporary box while drawing
  const [tempBox, setTempBox] = useState(null);

  useEffect(() => {
    // Initialize OpenCV.js
    const loadOpenCV = async () => {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://docs.opencv.org/master/opencv.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };
    
    loadOpenCV();
  }, []);

  // Handle original static box drawing
  useEffect(() => {
    if (canvasRef.current && box) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear only the portion where the static box was
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
  }, [box]);

  // Handle mouse events for drawing new boxes
  const handleMouseDown = (e) => {
    if (!isPaused) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPoint({ x, y });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !isPaused) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    setTempBox({
      x: startPoint.x,
      y: startPoint.y,
      width: currentX - startPoint.x,
      height: currentY - startPoint.y,
    });
  };

  const handleMouseUp = async (e) => {
    if (!isDrawing || !isPaused) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    
    // Create new tracker
    const newTracker = {
      id: Date.now(),
      box: {
        x: Math.min(startPoint.x, endX),
        y: Math.min(startPoint.y, endY),
        width: Math.abs(endX - startPoint.x),
        height: Math.abs(endY - startPoint.y),
      },
      tracker: new cv.TrackerKCF(),
    };
    
    // Initialize tracker with current frame
    const frame = captureVideoFrame();
    const bbox = new cv.Rect(
      newTracker.box.x,
      newTracker.box.y,
      newTracker.box.width,
      newTracker.box.height
    );
    newTracker.tracker.init(frame, bbox);
    
    setTrackers([...trackers, newTracker]);
    setIsDrawing(false);
    setTempBox(null);
  };

  // Capture current video frame for tracking
  const captureVideoFrame = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    const frame = new cv.Mat();
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    frame.data.set(imgData.data);
    return frame;
  };

  // Update trackers on each frame
  const updateTrackers = () => {
    if (isPaused) return;
    
    const frame = captureVideoFrame();
    const updatedTrackers = trackers.filter(tracker => {
      const success = tracker.tracker.update(frame);
      if (success) {
        const newBox = tracker.tracker.getBoundingBox();
        tracker.box = {
          x: newBox.x,
          y: newBox.y,
          width: newBox.width,
          height: newBox.height,
        };
        return true;
      }
      return false; // Remove tracker if tracking failed
    });
    
    setTrackers(updatedTrackers);
    frame.delete();
  };

  // Draw all boxes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw original static box
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
    
    // Draw tracked boxes
    trackers.forEach(tracker => {
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        tracker.box.x,
        tracker.box.y,
        tracker.box.width,
        tracker.box.height
      );
    });
    
    // Draw temporary box while drawing
    if (tempBox) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        tempBox.x,
        tempBox.y,
        tempBox.width,
        tempBox.height
      );
    }
  }, [box, trackers, tempBox]);

  return (
    <div
      ref={videoContainerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <VideoPlayerNoBox
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default VideoPlayer;