import React, { useEffect, useRef, useState } from 'react';

const ManualBoundingBoxDrawer = ({ videoElement, onBoxesChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [activeBoxes, setActiveBoxes] = useState([]);
  const [tempBox, setTempBox] = useState(null);
  const frameRef = useRef();
  const trackingContextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    trackingContextRef.current = ctx;

    // Set canvas size to match video dimensions
    const resizeCanvas = () => {
      if (videoElement) {
        canvas.width = videoElement.clientWidth;
        canvas.height = videoElement.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation loop
    const animate = () => {
      updateBoxPositions();
      drawBoxes();
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameRef.current);
    };
  }, [videoElement]);

  const updateBoxPositions = () => {
    if (!videoElement || !trackingContextRef.current) return;

    const ctx = trackingContextRef.current;
    setActiveBoxes(prevBoxes => 
      prevBoxes.filter(box => {
        // Simple motion tracking using pixel difference
        const imageData = ctx.getImageData(
          box.x, 
          box.y, 
          box.width, 
          box.height
        );
        
        // Check if box is still within canvas
        if (box.x < 0 || box.y < 0 || 
            box.x + box.width > videoElement.clientWidth || 
            box.y + box.height > videoElement.clientHeight) {
          return false;
        }

        // Update box position based on motion detection
        const pixelDiff = detectMotion(imageData, box.lastImageData);
        if (pixelDiff) {
          box.x += pixelDiff.dx;
          box.y += pixelDiff.dy;
        }

        box.lastImageData = imageData;
        return true;
      })
    );
  };

  const detectMotion = (currentFrame, lastFrame) => {
    if (!lastFrame) return null;

    // Simple center of mass tracking
    let dx = 0;
    let dy = 0;
    const threshold = 30;
    
    const current = currentFrame.data;
    const last = lastFrame.data;
    
    for (let i = 0; i < current.length; i += 4) {
      const diff = Math.abs(current[i] - last[i]) +
                  Math.abs(current[i + 1] - last[i + 1]) +
                  Math.abs(current[i + 2] - last[i + 2]);
                  
      if (diff > threshold) {
        const pixel = i / 4;
        const x = pixel % currentFrame.width;
        const y = Math.floor(pixel / currentFrame.width);
        
        dx += x;
        dy += y;
      }
    }
    
    return {
      dx: Math.min(Math.max(dx * 0.01, -5), 5),
      dy: Math.min(Math.max(dy * 0.01, -5), 5)
    };
  };

  const drawBoxes = () => {
    const ctx = trackingContextRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw active boxes
    activeBoxes.forEach(box => {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
    });

    // Draw temp box while drawing
    if (tempBox) {
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        tempBox.x,
        tempBox.y,
        tempBox.width,
        tempBox.height
      );
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setStartPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    setTempBox({
      x: Math.min(startPoint.x, currentPoint.x),
      y: Math.min(startPoint.y, currentPoint.y),
      width: Math.abs(currentPoint.x - startPoint.x),
      height: Math.abs(currentPoint.y - startPoint.y)
    });
  };

  const handleMouseUp = () => {
    if (tempBox && tempBox.width > 10 && tempBox.height > 10) {
      setActiveBoxes(prev => [...prev, {
        ...tempBox,
        lastImageData: trackingContextRef.current.getImageData(
          tempBox.x,
          tempBox.y,
          tempBox.width,
          tempBox.height
        )
      }]);
    }
    
    setIsDrawing(false);
    setTempBox(null);
    if (onBoxesChange) {
      onBoxesChange(activeBoxes);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100%',
        height: '100%',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default ManualBoundingBoxDrawer;