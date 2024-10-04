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
    <div style={{
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%', 
      padding: '100px',
    }}>
      {/* Upload button and search input aligned horizontally */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "40px"
      }}>
        <button onClick={handleUploadClick} style={{
          padding: "15px 30px",
          fontSize: "20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "20px"
        }}>
          Upload
        </button>
    
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }} 
        />
    
        <input
          type="text"
          placeholder="Search video by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "15px",
            fontSize: "18px",
            width: "400px",
            borderRadius: "5px",
            border: "1px solid #ddd"
          }}
        />
      </div>
    
      {/* Video list in a table format */}
      <div style={{ width: "100%", maxWidth: "900px" }}>
        {filteredVideos.length > 0 ? (
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd"
          }}>
            <thead>
              <tr>
                <th style={{
                  padding: "15px",
                  fontSize: "20px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd"
                }}>
                  Video List
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((video, index) => (
                <tr key={index}>
                  <td style={{
                    padding: "15px",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: selectedVideo && selectedVideo.title === video.title ? "blue" : "black",
                    borderBottom: "1px solid #ddd"
                  }} 
                  onClick={() => handleVideoSelect(video)} 
                  onContextMenu={(e) => handleVideoRightClick(e, video)}>
                    {video.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ fontSize: "20px", textAlign: "center" }}>No videos found</p>
        )}
      </div>
    </div>
  );    
};

export default ChosenVideoPage;
