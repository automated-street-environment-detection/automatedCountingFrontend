import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoPlayerNoBox from './VideoPlayerNoBox'; 
import { KCFTracker } from 'path-to-your-kcf-tracker'; // Import KCF tracking library

const VideoPlayer = () => {
  const videoContainerRef = useRef(null); 
  const canvasRef = useRef(null);
  const [vehicleBoxes, setVehicleBoxes] = useState([]); // State to track moving vehicle boxes
  const [tracking, setTracking] = useState(false); // State to determine if tracking is active

  const box = useSelector((state) => state.player.selectedBoundary); 

  useEffect(() => {
    if (canvasRef.current && box) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the stationary box
      const [startX, startY] = box.box.start;
      const [endX, endY] = box.box.end;

      const boxWidth = (endX - startX) * canvas.width;
      const boxHeight = (endY - startY) * canvas.height;

      const x = startX * canvas.width;
      const y = startY * canvas.height;

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);

      // Draw moving vehicle boxes
      vehicleBoxes.forEach(vehicle => {
        const { x, y, width, height } = vehicle; // Assuming each vehicle has these properties
        ctx.strokeStyle = 'blue'; // Different color for vehicles
        ctx.strokeRect(x, y, width, height);
      });
    }
  }, [box, vehicleBoxes]);

  const handleMouseDown = (event) => {
    if (tracking) return; // Prevent adding boxes while tracking

    const { offsetX, offsetY } = event.nativeEvent;
    // Convert to canvas coordinates
    const x = offsetX;
    const y = offsetY;

    // Create a new bounding box
    const newBox = { x, y, width: 100, height: 50 }; // Example dimensions, adjust as needed
    setVehicleBoxes([...vehicleBoxes, newBox]);

    // Start tracking this box using KCF
    const kcfTracker = new KCFTracker();
    kcfTracker.init([x, y, 100, 50]); // Initial position for KCF
    // Store tracker if you want to track multiple vehicles
    // You can add a unique ID for each vehicle box for tracking
  };

  const handleResumeTracking = () => {
    setTracking(false); // Set tracking state to false to allow adding boxes again
  };

  const handlePauseTracking = () => {
    setTracking(true); // Set tracking state to true to prevent adding boxes
  };

  // Update vehicle positions (call this function in an interval or during a video frame update)
  const updateVehiclePositions = () => {
    vehicleBoxes.forEach((vehicle, index) => {
      const tracker = new KCFTracker();
      // Get updated position from the tracker
      const updatedPosition = tracker.update(vehicle); // Assuming KCF returns the updated position
      if (updatedPosition) {
        const { x, y, width, height } = updatedPosition; // Update vehicle position
        setVehicleBoxes(prevBoxes => {
          const newBoxes = [...prevBoxes];
          newBoxes[index] = { ...newBoxes[index], x, y, width, height };
          return newBoxes;
        });
      }
    });
  };

  return (
    <div
      ref={videoContainerRef} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      onMouseDown={handleMouseDown} // Handle mouse down event for drawing boxes
    >
      <VideoPlayerNoBox 
          style={{
           position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
          }}
        />

      {/* Canvas overlay to draw the boundary boxes */}
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
      
      {/* Control buttons */}
      <button onClick={handlePauseTracking}>Pause Tracking</button>
      <button onClick={handleResumeTracking}>Resume Tracking</button>
    </div>
  );
};

export default VideoPlayer;
