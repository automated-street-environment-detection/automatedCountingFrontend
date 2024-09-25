import React, { useState,useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoundary,deleteBoundary } from '../redux/playerSlice';

const ChosenBoundaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedVideo = useSelector((state) => state.player.selectedVideo); // Access selectedVideo
  // Check if selectedVideo is empty and navigate back
  useEffect(() => {
    if (!selectedVideo || !selectedVideo.title) {
        navigate("/"); // Adjust the route based on your actual path
    }
}, [selectedVideo, navigate]);

  const boundaryList = useSelector((state) => state.player.boundaryList);
  const selectedBoundary = useSelector((state) => state.player.selectedBoundary);

  
  const filteredBoundaries = boundaryList.filter((boundary) =>
    boundary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleBoundarySelect = (boundary) => {
    dispatch(selectBoundary(boundary));
    navigate('/ChosenCountsPage');
  };

  
  const handleCreateButton = () => {
    navigate('/boundaryCreate');
  };
  const handleBoundaryRightClick = (e, boundary) => {
    e.preventDefault(); 
    const confirmDelete = window.confirm(`Are you sure you want to delete the boundary titled "${boundary.title}"?`);
    if (confirmDelete) {
      dispatch(deleteBoundary(boundary.title)); 
    }
  };
  const handleBack = () => {
    navigate('/');
  }

  return (
    <div>
      <div>
        <button onClick={handleCreateButton}>Create Boundary</button>
        <button onClick={handleBack}>Back</button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Boundary by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {filteredBoundaries.length > 0 ? (
          filteredBoundaries.map((boundary) => (
            <h2
              key={boundary.title}
              onClick={() => handleBoundarySelect(boundary)}
              onContextMenu={(e) => handleBoundaryRightClick(e, boundary)} 
              style={{
                cursor: "pointer",
                color: selectedBoundary && selectedBoundary.title === boundary.title ? "blue" : "black", 
              }}
            >
              {boundary.title}
            </h2>
          ))
        ) : (
          <h2>No Boundaries Found</h2>
        )}
      </div>
    </div>
  );
}

export default ChosenBoundaryPage;