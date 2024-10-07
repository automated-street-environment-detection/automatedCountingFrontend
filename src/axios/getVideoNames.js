import axios from "axios";
import { API_GET_VIDEO_NAMES_URL } from "./constants";
import store from "../redux/store";
import { setData } from "../redux/api/getVideoNames";
// import { useDispatch } from "react-redux";

const getVideoNames = () => {
  // const dispatch = useDispatch();
  axios
    .get(API_GET_VIDEO_NAMES_URL)
    .then(function (response) {
      // handle success
      store.dispatch(setData(response.data));
      // console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

export default getVideoNames;
