import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {selectBoundary} from '../redux/playerSlice';
const CanvasBox = ({ dimensions }) => {
  const canvasRef = useRef(null);
  const  box = useSelector((state) => state.player.selectedBoundary);
  useEffect(() => {
    if (dimensions && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
   
      // what ever from the previous boundry set up could be lines or boxes
      const boxWidth = 100;
      const boxHeight = 100;

      const x = (canvas.width - boxWidth) / 2;
      const y = (canvas.height - boxHeight) / 2;

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);
    }
  }, [dimensions]); // Re-run the effect whenever dimensions change

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Prevent mouse events on the canvas
        width: dimensions.width, 
        height: dimensions.height, 
      }}
    />
  );
};

export default CanvasBox;
