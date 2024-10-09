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
  const counts = useSelector((state) => state.counts.counts);

  const [title1, setTitle1] = useState("");
  const [open, setOpen] = useState(false);

  const onClick = () => {
    // Open the dialog only if the selectedCount.title is null
    if (selectedCount.title == null) {
      setOpen(true); // Open the dialog
    } else {
      const updatedCount = {
        ...selectedCount,
        timestamps: [...timestamps1], // Use spread to create a new array
      };
      dispatch(updateCountInList(updatedCount));
      console.log(updatedCount);
      const setData = async () => {
        try {
          const payload = {
            user_email: localStorage.getItem("username"),
            video_name: selectedVideo.title,
            boundary_name: selectedBoundary.title,
            instance_data: JSON.stringify(counts),
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
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    setTitle1(""); // Reset input value when closing
  };

  const handleSave = () => {
    if (title1.trim() === "") {
      alert("Please enter a title for the Count.");
      return;
    }

    const updatedCount = {
      ...selectedCount,
      title: title1,
      timestamps: timestamps1,
    };
    dispatch(addCounttoCountList(updatedCount));
    handleClose();
    console.log(updatedCount);
    Navigate("/ChosenCountsPage");
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      Save
    </Button>
  );
};

export default SaveButton;
