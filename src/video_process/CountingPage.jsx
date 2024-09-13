import VideoPlayer from "./VideoPlayer";
import CountingControl from "./CountingControls";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

const CountingPage = () => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid size={9}>
          <VideoPlayer />
        </Grid>
        <Grid size={3}>
          <CountingControl />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CountingPage;
