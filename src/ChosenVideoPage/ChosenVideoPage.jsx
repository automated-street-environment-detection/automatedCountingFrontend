import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectVideo } from '../redux/playerSlice';

const ChosenVideoPage = () => {
  const videolist = [
    { title: "Video 1", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 2", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 3", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 4", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
    { title: "Video 5", url: "https://www.youtube.com/embed/6n3pFFPSlW4" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedVideo = useSelector((state) => state.player.selectedVideo); // Get the selected video from Redux state

  const handleVideoSelect = (video) => {
    dispatch(selectVideo(video));
    navigate('/counting');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newVideo = { title: file.name, url };
      dispatch(selectVideo(newVideo)); 
      navigate('/counting');
    }
  };

  const filteredVideos = videolist.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const videosToDisplay = searchTerm === "" ? videolist : filteredVideos;

  return (
    <div>
      <div>
        <button>filter</button>
        <button>upload</button>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange} // Handle file input change
        />
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