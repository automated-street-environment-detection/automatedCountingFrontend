import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectVideo, uploadVideo, deleteVideo } from '../redux/playerSlice';

const ChosenVideoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const videoList = useSelector((state) => state.player.videoList);
  const selectedVideo = useSelector((state) => state.player.selectedVideo);

  const handleVideoSelect = (video) => {
    dispatch(selectVideo(video)); 
    navigate('/boundary'); 
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const newVideo = { title: selectedFile.name, url };
      dispatch(uploadVideo(newVideo)); 
      dispatch(selectVideo(newVideo)); 
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoRightClick = (e, video) => {
    e.preventDefault(); 
    const confirmDelete = window.confirm(`Are you sure you want to delete the video titled "${video.title}"?`);
    if (confirmDelete) {
      dispatch(deleteVideo(video.title)); 
    }
  };

  const filteredVideos = videoList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <button onClick={handleUploadClick}>Upload</button>
        {/* Hidden file input for video upload */}
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }} 
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search video by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <div>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <h2
              key={index}
              onClick={() => handleVideoSelect(video)} 
              onContextMenu={(e) => handleVideoRightClick(e, video)} 
              style={{
                cursor: "pointer",
                color: selectedVideo && selectedVideo.title === video.title ? "blue" : "black",
              }}
            >
              {video.title}
            </h2>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default ChosenVideoPage;
