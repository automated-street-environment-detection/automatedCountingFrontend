import { useEffect, useState } from "react";
import ChosenCountsPage from "../ChosenCountsPage/ChosenCountsPage";
import { getVideoNames } from "../api/videoApi";
import ChosenVideoPage from "./ChosenVideoPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBoundaryList } from "../redux/playerSlice";

const Home = () => {
  const [videoList, setVideoList] = useState([]);

  const signedIn = useSelector((state) => state.signIn.loggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (signedIn) {
      dispatch(setBoundaryList([]));
      awaitNames();
    } else {
      navigate("/");
    }
  }, []);

  return <ChosenVideoPage videoList={videoList} />;
};

export default Home;
