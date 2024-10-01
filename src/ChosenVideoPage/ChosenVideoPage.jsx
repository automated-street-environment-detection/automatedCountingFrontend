import { getCountingBoundaryNames, postCountingBoundary, deleteCountingBoundary } from "../api/boundaryApi";
import { getDataInstanceNames, postDataInstance, patchDataInstance, deleteDataInstance } from "../api/instanceApi";
import { getVideoNames, deleteVideo, getBucketId } from "../api/videoApi";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ChosenVideoPage = () => {

  // will be replaced with API call to get video list
  const videolist = [
    { title: "Video 1", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 2", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 3", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 4", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 5", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
  ];

  
  
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleVideoSelect = (video) => {
    setSelectedVideo(video); 
    navigate('/counting');
  };

  const filteredVideos = videolist.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display all videos if no search term, otherwise show filtered results
  const videosToDisplay = searchTerm === "" ? videolist : filteredVideos;

  const testAPI1 = async () => {
    const payload = {};
    const response = await getVideoNames();
    console.log(response);
  };
  const testAPI2 = async () => {
    const payload = {
      video_name : "test_file.png"
    };
    const response = await deleteVideo(payload);
    console.log(response);
  };
  const testAPI3 = async () => {
    const payload = {};
    const response = await getVideoNames();
    console.log(response);
  };
  const testAPI4 = async () => {
    const payload = {};
    const response = await getVideoNames();
    console.log(response);
  };

  console.log("4:32PM");
  return (
    <div>
      <div>
        <button>filter</button>
        <button>upload</button>
        <button>work on local</button>
        <button onClick={testAPI1}>test api 1</button>
        <button onClick={testAPI2}>test api 2</button>
        <button onClick={testAPI3}>test api 3</button>
        <button onClick={testAPI4}>test api 4</button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search video by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
        />
      </div>
      <div>
        {videosToDisplay.length > 0 ? (
          videosToDisplay.map((video, index) => (
            <h2
              key={index}
              onClick={() => handleVideoSelect(video)} // Set the selected video when clicked
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