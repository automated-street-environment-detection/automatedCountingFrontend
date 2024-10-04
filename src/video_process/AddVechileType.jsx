import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Dialog,
} from "@mui/material";
import React from "react";

const AddVechileType = ({ values }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const category = formJson.category;
            values.push(category);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add a new category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new category add the name of the category here
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddVechileType;
