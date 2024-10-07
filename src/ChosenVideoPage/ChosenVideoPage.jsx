import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectVideo, uploadVideo, deleteVideo } from "../redux/playerSlice";
import { Button, Container, Grid2, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { Grid } from "@aws-amplify/ui-react";
import VideoPanel from "../components/VideoPanel";
import getVideoNames from "../axios/getVideoNames";
// import { getVideoURL } from "../api/videoApi";

const ChosenVideoPage = () => {
  const username = useSelector((state) => state.signIn.username);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  // if (!username) navigate("/loginpage");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoNames = useSelector((state) => state.getVideoNames.videoNames);

  const videoList = useSelector((state) => state.player.videoList);
  const selectedVideo = useSelector((state) => state.player.selectedVideo);

  const handleVideoSelect = (video) => {
    // console.log(video);
    const payload = { video_name: video };
    console.log(payload);
    // const res = getVideoURL(payload);
    // console.log(res);
    // dispatch(selectVideo(video));
    // navigate("/boundary");
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
    e.stopPropagation();
    e.preventDefault();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the video titled "${video}"?`
    );
    if (confirmDelete) {
      dispatch(deleteVideo(video.title));
    }
  };

  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    getVideoNames();
  }, []);

  useEffect(() => {
    // console.log(`data:`);
    console.log(videoNames);
    setFilteredVideos(videoNames);
  }, [videoNames]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            onClick={handleUploadClick}
            sx={{ padding: 2, marginLeft: 4 }}
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </Grid2>

        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Grid2>
          <TextField
            variant="outlined" // Use "filled" or "standard" for different styles
            placeholder="Search video by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid2>
      </Grid2>
      {filteredVideos.length > 0 ? (
        <VideoPanel
          videos={filteredVideos}
          handleClick={handleVideoSelect}
          handleDelete={handleVideoRightClick}
        />
      ) : (
        <div style={{ fontSize: "20px", textAlign: "center" }}>
          No videos found
        </div>
      )}
      {/* </div>
    </div> */}
    </Container>
  );
};

export default ChosenVideoPage;
