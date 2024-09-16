import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoundary } from '../redux/playerSlice';

const ChosenBoundaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const boundaryList = useSelector((state) => state.player.boundaryList);
  const selectedBoundary = useSelector((state) => state.player.selectedBoundary);

  
  const filteredBoundaries = boundaryList.filter((boundary) =>
    boundary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleBoundarySelect = (boundary) => {
    dispatch(selectBoundary(boundary));
    navigate('/counting');
  };

  
  const handleCreateButton = () => {
    navigate('/boundaryCreate');
  };

  return (
    <div>
      <div>
        <button onClick={handleCreateButton}>Create Boundary</button>
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
              style={{
                cursor: "pointer",
                color: selectedBoundary && selectedBoundary.title === boundary.title ? "blue" : "black", // Highlight selected boundary
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