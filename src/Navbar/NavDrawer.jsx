import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/signInSlice";

const NavDrawer = ({ handleDrawerClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
    {
      text: "Home",
      onClick: () => {
        navigate("/video");
      },
    },
    {
      text: "Logout",
      onClick: () => {
        localStorage.setItem("username", "");
        dispatch(signOut());
        navigate("/");
      },
    },
  ];

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerClose}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavDrawer;
