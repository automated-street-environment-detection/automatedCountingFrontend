import VideoPlayer from "./VideoPlayer";
import CountingControl from "./CountingControls";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

const CountingPage = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 5, md: 3 }}
      >
        <Grid size={10}>
          <VideoPlayer />
        </Grid>
        <Grid size={2}>
          <CountingControl />
        </Grid>
      </Grid>
    </>
  );
};

export default CountingPage;
