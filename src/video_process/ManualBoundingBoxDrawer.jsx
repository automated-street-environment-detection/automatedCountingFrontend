import React, { useEffect, useRef, useState } from 'react';

const ManualBoundingBoxDrawer = ({ canvasRef }) => {
  const [boxes, setBoxes] = useState([]);
  const isDrawing = useRef(false);
  const startCoords = useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    startCoords.current = {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || !startCoords.current) return;

    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    const endCoords = {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    };

    const newBox = {
      start: startCoords.current,
      end: endCoords,
    };

    setBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      updatedBoxes[updatedBoxes.length - 1] = newBox; // Update the last box
      return updatedBoxes;
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    startCoords.current = null;
  };

  const updateBoxes = () => {
    setBoxes((prevBoxes) => {
      return prevBoxes.filter((box) => {
        const [startX, startY] = box.start;
        const [endX, endY] = box.end;
        return (
          startX < 1 && startY < 1 && endX > 0 && endY > 0 // Keep boxes within canvas bounds
        );
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    const interval = setInterval(updateBoxes, 100); // Update boxes every 100ms

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, [canvasRef]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const draw = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      boxes.forEach((box) => {
        const [startX, startY] = box.start;
        const [endX, endY] = box.end;

        const boxWidth = (endX - startX) * canvasRef.current.width;
        const boxHeight = (endY - startY) * canvasRef.current.height;
        const x = startX * canvasRef.current.width;
        const y = startY * canvasRef.current.height;

        ctx.strokeStyle = 'blue'; // Color for manual boxes
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, boxWidth, boxHeight);
      });
    };

    const interval = setInterval(draw, 100); // Redraw boxes every 100ms

    return () => clearInterval(interval);
  }, [boxes, canvasRef]);

  return null; // This component does not need to render anything
};

export default ManualBoundingBoxDrawer;
