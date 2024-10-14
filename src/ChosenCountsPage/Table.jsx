import { Box, Button, Grid2, Typography } from "@mui/material";
import TabPanel from "../components/TabPanel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTitle } from "../redux/countsSlice";
import ExportToCSV from "./ExportToCSV";

const Table = ({ countsList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (c) => {
    dispatch(setTitle(c.title));
    // console.log(c.title);
    navigate("/counting");
  };

  const handleDelete = (e, c) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("WIP");
  };

  return (
    <>
      {countsList.map((count, index) => (
        <Box key={index} sx={{ width: "100%" }}>
          <TabPanel onClick={() => handleClick(count)}>
            <Grid2 container spacing={2}>
              <Grid2 size={10}>
                <Typography variant="h1" component="h1" gutterBottom>
                  {count.title}
                </Typography>
              </Grid2>
              <Grid2 size={1}>
                <ExportToCSV />
              </Grid2>
              <Grid2 size={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(e) => handleDelete(e, count)}
                >
                  Delete
                </Button>
              </Grid2>
            </Grid2>
          </TabPanel>
        </Box>
      ))}
    </>
  );
};

export default Table;
