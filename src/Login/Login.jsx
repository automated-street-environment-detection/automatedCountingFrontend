// import { Authenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
// import "@aws-amplify/ui-react/styles.css";
// import outputs from "../amplify_outputs.json";

import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../redux/signInSlice";

// Amplify.configure(outputs);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const onClick = (e) => {
    e.preventDefault();
    dispatch(login(username));
    console.log("Logged");
    navigate("/video");
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center" // Center horizontally
      alignItems="center" // Center vertically
      height="100vh" // Full viewport height
    >
      <Paper elevation={3}>
        <Box
          sx={{
            width: 300, // Example width
            height: 200, // Example height
            // Example background color
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form onSubmit={onClick}>
            <TextField
              label="Username"
              color="secondary"
              value={username}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
