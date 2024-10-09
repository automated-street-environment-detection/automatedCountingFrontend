import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postDataInstance } from "../api/instanceApi";
import { setNewObj, setTitle } from "../redux/countsSlice";

const CreateCountsButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const selectedVideo = useSelector((state) => state.player.selectedVideo);
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreateButton = (t) => {
    dispatch(selectCount({ title: t }));
    navigate("/counting");
  };

  return (
    <>
      <Button onClick={handleOpen}>Create New Count</Button>
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
            console.log(category);
            const postNewCount = async () => {
              try {
                const payload = {
                  user_email: localStorage.getItem("username"),
                  video_name: selectedVideo.title,
                  boundary_name: selectedBoundary.title,
                  instance_name: category,
                };
                // console.log(payload);
                const response = await postDataInstance(payload);

                if (response.status == 1) {
                  dispatch(setNewObj(true));
                  handleCreateButton(category);
                  handleClose();
                }
              } catch (error) {
                console.error(error);
              }
            };
            postNewCount();
          },
        }}
      >
        <DialogTitle>Add a new Count</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new count add the name of the count here
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
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCountsButton;
