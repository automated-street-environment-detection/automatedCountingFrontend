import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavDrawer from "./NavDrawer";
import { Drawer } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.signIn.loggedIn);
  const username = localStorage.getItem("username");

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => {
    console.log("drawerClick");
    setDrawerOpen(newOpen);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onClick = () => {
    if (loggedIn) {
      console.log("Login");
    } else {
      navigate("/");
    }
  };

  return (
    <Box elevation={5}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Counting Software
          </Typography>
          <Button color="inherit" onClick={onClick}>
            {loggedIn ? username : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        <NavDrawer handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </Box>
  );
}
