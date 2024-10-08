import React, { useRef, useState, useEffect } from "react";
import VideoPlayerNoBox from "../video_process/VideoPlayerNoBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBoundary } from "../redux/playerSlice";
import { postCountingBoundary } from "../api/boundaryApi";

const CreateBoundary = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [box, setBox] = useState(null);
  const [title, setTitle] = useState("");
  const canvasRef = useRef(null);
  const videoContainerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videoName = useSelector((state) => state.player.selectedVideo);

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

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY - scrollYRef.current, x - startX, y - startY);

    setBox({
      start: [
        startX / canvasRef.current.width,
        startY / canvasRef.current.height,
      ],
      end: [x / canvasRef.current.width, y / canvasRef.current.height],
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const scrollYRef = useRef(0); // Use ref for scrollY

  const handleScroll = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    scrollYRef.current = window.scrollY; // Update the ref
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.top = `${scrollYRef.current}px`; // Adjust canvas top position based on scroll
    }
  };

  useEffect(() => {
    // Add event listener for scroll events
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const saveBoundary = () => {
    const postBoundary = async () => {
      try {
        const payload = {
          boundary_name: title,
          boundary_data: [box.start, box.end],
          video_name: videoName.title,
        };
        // console.log(payload);
        const response = await postCountingBoundary(payload);

        setTitle("");
        setBox(null);
        navigate("/boundary");
      } catch (error) {
        console.error(error);
      }
    };
    if (title.trim() === "") {
      alert("Please enter a title for the boundary.");
      return;
    }
    if (box) {
      // console.log({
      //   boundary_name: title,
      //   boundary_data: [box.start, box.end],
      // });
      // dispatch(addBoundary({ title, box }));
      postBoundary();
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={videoContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <VideoPlayerNoBox
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
      <div
        style={{
          position: "relative", // This makes the parent a reference point for positioning
          top: "600px",
        }}
      >
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={saveBoundary}>Save Boundary</button>
        <button onClick={() => navigate("/boundary")}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateBoundary;
