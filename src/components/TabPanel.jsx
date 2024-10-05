import { Box, Typography } from "@mui/material";

const TabPanel = (props) => {
  const { children, ...other } = props;

  return (
    <Box
      sx={{
        p: 3,
        cursor: "pointer",
        border: "1px solid #ddd",
        borderRadius: "5px",
        width: "100%",
        marginLeft: 2,
        marginTop: 2,
      }}
      onClick={props.onClick} // Call onClick when the panel is clicked
      {...other}
    >
      {children}
    </Box>
  );
};

export default TabPanel;
