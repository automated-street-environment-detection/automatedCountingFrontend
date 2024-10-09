import VideoPlayer from "./VideoPlayer";
import CountingControl from "./CountingControls";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInstance } from "../api/instanceApi";
import { strified2OBJ } from "../redux/countsSlice";

const CountingPage = () => {
  const dispatch = useDispatch();
  const newCount = useSelector((state) => state.counts.newObj);
  const selectedVideo = useSelector((state) => state.player.selectedVideo);
  const selectedBoundary = useSelector(
    (state) => state.player.selectedBoundary
  );

  useEffect(() => {
    if (!newCount) {
      const getData = async () => {
        try {
          const payload = {
            user_id: localStorage.getItem("username"),
            video_name: selectedVideo.title,
            boundary_name: selectedBoundary.title,
          };
          const response = await getDataInstance(payload);
          console.log(response);
          if (response.status == 1) {
            dispatch(strified2OBJ(response.body.instance_data));
          }
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }
  }, []);

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
