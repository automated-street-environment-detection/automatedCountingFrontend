import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBoundary, deleteBoundary } from "../redux/playerSlice";
import { Button, Container, Grid2, TextField } from "@mui/material";
import VideoPanel from "../components/VideoPanel";
import {
  deleteCountingBoundary,
  getCountingBoundary,
  getCountingBoundaryNames,
} from "../api/boundaryApi";
import { setBoundaryList } from "../redux/playerSlice";

const ChosenBoundaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedVideo = useSelector((state) => state.player.selectedVideo); // Access selectedVideo
  // Check if selectedVideo is empty and navigate back

  const boundaryList = useSelector((state) => state.player.boundaryList);
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  const filteredBoundaries = boundaryList.filter((boundary) =>
    boundary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBoundarySelect = (boundary) => {
    const getBoundaryData = async () => {
      try {
        const payload = {
          video_name: selectedVideo.title,
          boundary_name: boundary.title,
        };

        const response = await getCountingBoundary(payload);
        // console.log(response);
        if (response.status == 1) {
          const b = {
            box: {
              start: response.body.boundary_data[0],
              end: response.body.boundary_data[1],
            },
            title: boundary.title,
          };
          dispatch(selectBoundary(b));
          navigate("/ChosenCountsPage");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getBoundaryData();
    // console.log(boundary);
    // dispatch(selectBoundary(boundary));
  };

  const handleCreateButton = () => {
    navigate("/boundaryCreate");
  };
  const handleBoundaryRightClick = (e, boundary) => {
    e.stopPropagation();
    const deleteData = async () => {
      try {
        const payload = {
          video_name: selectedVideo.title,
          boundary_name: boundary.title,
        };
        const response = await deleteCountingBoundary(payload);
        if (response.status == 1) {
          navigate("/boundary");
        }
      } catch (error) {
        console.error(error);
      }
    };
    e.preventDefault();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the boundary titled "${boundary.title}"?`
    );
    if (confirmDelete) {
      deleteData();
      dispatch(deleteBoundary(boundary.title));
    }
  };
  const handleBack = () => {
    navigate("/video");
  };

  useEffect(() => {
    const getBoundaries = async () => {
      try {
        const response = await getCountingBoundaryNames({
          video_name: selectedVideo.title,
        });
        if (response.status == 1) {
          response.body.count_boundary_names.map((boundary) => {
            return { title: boundary };
          });

          dispatch(
            setBoundaryList(
              response.body.count_boundary_names.map((boundary) => {
                return { title: boundary };
              })
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!selectedVideo) {
      navigate("/");
    } else {
      getBoundaries();
    }
  }, []);

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
