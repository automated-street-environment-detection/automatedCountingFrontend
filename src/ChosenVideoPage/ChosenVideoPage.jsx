import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectVideo, uploadVideo, deleteVideo } from "../redux/playerSlice";
import { Button, Container, Grid2, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { Grid } from "@aws-amplify/ui-react";
import VideoPanel from "../components/VideoPanel";

import { getVideoNames, getVideoURL } from "../api/videoApi";

const ChosenVideoPage = () => {
  const username = useSelector((state) => state.signIn.username);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  // if (!username) navigate("/loginpage");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [videoNames, setVideoNames] = useState([]);

  const [videoList, setvideolist] = useState([]);
  const selectedVideo = useSelector((state) => state.player.selectedVideo);

  const handleVideoSelect = (video) => {
    const awaitURL = async () => {
      try {
        const response = await getVideoURL({ video_name: video.title });
        if (response.status == 1) {
          const selectedVideo = {
            title: video.title,
            url: response.body.video_url,
          };
          dispatch(selectVideo(selectedVideo));
          // console.log("Moving to boundary");

          navigate("/boundary");
        }
      } catch (error) {
        console.log(error);
      }
    };

    awaitURL();
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

  const filteredVideos = videoList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const awaitNames = async () => {
      const response = await getVideoNames();
      if (response.status == 1) {
        setVideoNames(response.body.video_names);
        setvideolist(
          response.body.video_names.map((vid) => {
            return { title: vid };
          })
        );
      }
    };
    awaitNames();
  }, []);

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
