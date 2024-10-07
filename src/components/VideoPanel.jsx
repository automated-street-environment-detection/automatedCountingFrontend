import { Box, Button, Grid2, Typography } from "@mui/material";
import TabPanel from "./TabPanel";

const VideoPanel = ({ videos, handleClick, handleDelete }) => {
  return (
    <>
      {videos.map((video, index) => (
        <Box key={index} sx={{ width: "100%" }}>
          <TabPanel onClick={() => handleClick(video)}>
            <Grid2 container spacing={2}>
              <Grid2 size={11}>
                <Typography variant="h1" component="h1" gutterBottom>
                  {video}
                </Typography>
              </Grid2>
              <Grid2 size={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(e) => handleDelete(e, video)}
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

export default VideoPanel;
