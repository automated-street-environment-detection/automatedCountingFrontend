import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Assuming this is the correct action
import { patchDataInstance } from "../api/instanceApi";

const SaveButton = () => {
  const Navigate = useNavigate();
  const title = useSelector((state) => state.counts.title);
  const timestamps = useSelector((state) => state.counts.timestamps);
  const objects = useSelector((state) => state.counts.objects);
  const counts = useSelector((state) => state.counts.counts);
  const selectedVideo = useSelector((state) => state.player.selectedVideo);
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  const onClick = () => {
    // Open the dialog only if the selectedCount.title is null

    const setData = async () => {
      try {
        const instanceData = { title, timestamps, objects, counts };
        const payload = {
          user_email: localStorage.getItem("username"),
          video_name: selectedVideo.title,
          boundary_name: selectedBoundary.title,
          instance_data: JSON.stringify(instanceData),
        };
        const response = await patchDataInstance(payload);
        if (response.status === 1) {
          Navigate("/ChosenCountsPage");
        }
      } catch (error) {
        console.error(error);
      }
    };
    setData();
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      Save
    </Button>
  );
};

export default SaveButton;
