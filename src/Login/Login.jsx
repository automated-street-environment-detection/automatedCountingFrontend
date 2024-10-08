// import { Authenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
// import "@aws-amplify/ui-react/styles.css";
// import outputs from "../amplify_outputs.json";

import { Box, Button, Grid2, Paper, TextField } from "@mui/material";
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
    if (username.length > 0) {
      dispatch(login(username));
      localStorage.setItem("username", username);
      console.log("Logged");
      navigate("/video  ");
    }
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
      <Paper elevation={6}>
        <Grid2 container spacing={4} style={{ padding: 25 }}>
          <form onSubmit={onClick}>
            <Grid2 size={12}>
              <TextField
                label="Username"
                color="secondary"
                value={username}
                onChange={handleChange}
                style={{ marginBottom: 10 }}
              />
            </Grid2>
            <Grid2 size={12}>
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: 5 }}
              >
                Sign In
              </Button>
            </Grid2>
          </form>
        </Grid2>
      </Paper>
    </Box>
  );
}
