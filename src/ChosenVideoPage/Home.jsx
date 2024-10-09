import { useEffect, useState } from "react";
import ChosenCountsPage from "../ChosenCountsPage/ChosenCountsPage";
import { getVideoNames } from "../api/videoApi";
import ChosenVideoPage from "./ChosenVideoPage";

const Home = () => {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    const awaitNames = async () => {
      const response = await getVideoNames();
      if (response.status == 1) {
        // setVideoNames(response.body.video_names);
        setVideoList(
          response.body.video_names.map((vid) => {
            return { title: vid };
          })
        );
      }
    };
    console.log("update");
    awaitNames();
  }, []);

  return <ChosenVideoPage videoList={videoList} />;
};

export default Home;
