import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCountsSlice, setTitle } from "../redux/countsSlice";
import { deleteDataInstance, getDataInstanceNames } from "../api/instanceApi";
import CreateCountsButton from "./CreateCountsButton";
import { Button, Container, TextField } from "@mui/material";
import Table from "./Table";

const ChosenCountsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedCount = useSelector((state) => state.counts.counts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [countsList, setCountsList] = useState([]);
  const selectedVideo = useSelector((state) => state.player.selectedVideo);
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  const filteredCounts = countsList.filter((count) =>
    count.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountRightClick = (e, count) => {
    const deleteCounts = async () => {
      try {
        const payload = {
          user_email: localStorage.getItem("username"),
          video_name: selectedVideo.title,
          boundary_name: selectedBoundary.title,
          instance_name: count.title,
        };
        console.log(payload);
        const response = await deleteDataInstance(payload);
        navigate("/ChosenCountsPage");
      } catch (err) {
        console.error(err);
      }
    };

    e.preventDefault();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the count titled "${count.title}"?`
    );
    if (confirmDelete) {
      // dispatch(clearCountsList());
      deleteCounts();
    }
  };
  const handleBack = () => {
    navigate("/video");
  };

  useEffect(() => {
    const getCounts = async () => {
      try {
        const payload = {
          user_id: localStorage.getItem("username"),
          video_name: selectedVideo.title,
          boundary_name: selectedBoundary.title,
        };
        dispatch(resetCountsSlice());
        // console.log(payload);
        const response = await getDataInstanceNames(payload);
        // console.log(response);
        if (response.status == 1) {
          // console.log(response);
          const countsList = response.body.instance_name.map((ins) => {
            return { title: ins };
          });
          // console.log(countsList);
          setCountsList(countsList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCounts();
  }, []);

  return (
    <Container style={{ marginTop: "100px" }}>
      <CreateCountsButton />
      <Button onClick={handleBack}>Back</Button>
      <TextField
        type="text"
        placeholder="Search Boundary by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCounts.length > 0 ? (
        <Table countsList={filteredCounts} />
      ) : (
        <div>NO DATA FOUND</div>
      )}
    </Container>
  );
};

export default ChosenCountsPage;
