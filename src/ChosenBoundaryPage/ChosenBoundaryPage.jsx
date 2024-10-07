import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBoundary, deleteBoundary } from "../redux/playerSlice";
import { Button, Container, Grid2, TextField } from "@mui/material";
import VideoPanel from "../components/VideoPanel";

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
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  const filteredBoundaries = boundaryList.filter((boundary) =>
    boundary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBoundarySelect = (boundary) => {
    dispatch(selectBoundary(boundary));
    navigate("/ChosenCountsPage");
  };

  const handleCreateButton = () => {
    navigate("/boundaryCreate");
  };
  const handleBoundaryRightClick = (e, boundary) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the boundary titled "${boundary.title}"?`
    );
    if (confirmDelete) {
      dispatch(deleteBoundary(boundary.title));
    }
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      {/* Button section for creating and going back */}
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            onClick={handleCreateButton}
            sx={{ padding: 2 }}
            variant="outlined"
          >
            Create Boundary
          </Button>
        </Grid2>
        <Grid2>
          <Button onClick={handleBack} sx={{ padding: 2 }} variant="outlined">
            Back
          </Button>
        </Grid2>
        {/* Search input */}
        <Grid2>
          <TextField
            type="text"
            placeholder="Search Boundary by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid2>
      </Grid2>

      {/* Boundaries Table */}

      {filteredBoundaries.length > 0 ? (
        <VideoPanel
          videos={filteredBoundaries}
          handleClick={handleBoundarySelect}
          handleDelete={handleBoundaryRightClick}
        />
      ) : (
        <h2>No Boundaries Found</h2>
      )}
    </Container>
  );
};

export default ChosenBoundaryPage;
