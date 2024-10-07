import axios from "axios";
import { API_GET_VIDEOURL_URL } from "./constants";
import store from "../redux/store";
import { setVideoURL } from "../redux/api/getVideoURL";
// import { useDispatch } from "react-redux";

const getVideoURL = (payload) => {
  // const dispatch = useDispatch();
  axios
    .get(API_GET_VIDEOURL_URL, { video_name: payload })
    .then(function (response) {
      // handle success
      store.dispatch(setVideoURL(response.data));
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

export default getVideoURL;
