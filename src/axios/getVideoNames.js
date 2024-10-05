import axios from "axios";
import { API_GET_VIDEO_NAMES_URL } from "./constants";
import { useDispatch } from "react-redux";

export default getVideoNames = () => {
  const dispatch = useDispatch();
  axios.get(API_GET_VIDEO_NAMES_URL).then(dis);
};
