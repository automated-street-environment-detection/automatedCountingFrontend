import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addCounttoCountList,updateCountInList } from "../redux/countsSlice"; // Assuming this is the correct action

const SaveButton = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const selectedCount = useSelector((state) => state.counts.counts);
  const timestamps1 = useSelector((state) => state.counts.timestamps);
  
  const [title1, setTitle1] = useState('');
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
      Navigate('/ChosenCountsPage');
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    setTitle1(''); // Reset input value when closing
  };

  const handleSave = () => {
    if (title1.trim() === '') {
      alert('Please enter a title for the Count.');
      return;
    }

    const updatedCount = { ...selectedCount, title: title1,timestamps:timestamps1};
    dispatch(addCounttoCountList(updatedCount));
    handleClose(); 
    console.log(updatedCount);
    Navigate('/ChosenCountsPage');
  };

  return (
    <>
      <Button variant="outlined" onClick={onClick}>
        Save
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveButton;
