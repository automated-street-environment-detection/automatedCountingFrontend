import React, { useRef, useState, useEffect } from 'react';
import VideoPlayer from '../video_process/VideoPlayerNoBox';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBoundary } from '../redux/playerSlice';
const CreateBoundary = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [box, setBox] = useState(null);
    const [title, setTitle] = useState('');
    const canvasRef = useRef(null);
    const videoContainerRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const videoSrc = useSelector((state) => state.player.selectedVideo.src);
    const videoSrc = "./test1.mov";
    
    // Handle mouse events to draw the box
    const handleMouseDown = (e) => {
        const rect = videoContainerRef.current.getBoundingClientRect();
        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const rect = videoContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous drawings

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, x - startX, y - startY);

        //adjust here base on the boundary object call
        setBox({
            x: startX / canvasRef.current.width,
            y: startY / canvasRef.current.height,
            width: (x - startX) / canvasRef.current.width,
            height: (y - startY) / canvasRef.current.height,
        });
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const videoContainer = videoContainerRef.current;

        if (canvas && videoContainer) {
            const { offsetWidth, offsetHeight } = videoContainer;
            canvas.width = offsetWidth;
            canvas.height = offsetHeight;
        }

        // Update canvas size on window resize
        const handleResize = () => {
            if (canvas && videoContainer) {
                const { offsetWidth, offsetHeight } = videoContainer;
                canvas.width = offsetWidth;
                canvas.height = offsetHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => window.removeEventListener('resize', handleResize);
    }, [videoSrc]);

    const saveBoundary = () => {
        if (title.trim() === '') {
            alert('Please enter a title for the boundary.');
            return;
        }
        if(box){
            dispatch(addBoundary({ title, box }));
            setTitle('');
            setBox(null);
        }
        navigate('/boundary');
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <div
                ref={videoContainerRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <VideoPlayer />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // Make sure canvas does not block mouse events
                    }}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '950px',
                    left: '10px',
                }}
            >
                <input 
                    type="text" 
                    placeholder="Enter title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={saveBoundary}>Save Boundary</button>
            </div>
        </div>
       
    );
};

export default CreateBoundary;