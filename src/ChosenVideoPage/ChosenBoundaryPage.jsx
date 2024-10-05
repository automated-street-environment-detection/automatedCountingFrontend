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
        navigate('/video'); // Adjust the route based on your actual path
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
    navigate('/video');
  }

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
      {/* Button section for creating and going back */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleCreateButton} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Create Boundary
        </button>
        <button 
          onClick={handleBack} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    
      {/* Search input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search Boundary by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
      </div>
    
      {/* Boundaries Table */}
      <div style={{ width: '100%', maxWidth: '800px' }}>
        {filteredBoundaries.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Boundary Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredBoundaries.map((boundary) => (
                <tr 
                  key={boundary.title} 
                  style={{ cursor: 'pointer', backgroundColor: selectedBoundary && selectedBoundary.title === boundary.title ? '#d1e7dd' : '#fff' }}
                  onClick={() => handleBoundarySelect(boundary)}
                  onContextMenu={(e) => handleBoundaryRightClick(e, boundary)}
                >
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {boundary.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No Boundaries Found</h2>
        )}
      </div>
    </div>    
  );
}

export default ChosenBoundaryPage;