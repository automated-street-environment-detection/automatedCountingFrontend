import axios from "axios";
import { POSTCOUNTS } from "./constants";

const postSaveButton = () => {
  axios.post(POSTCOUNTS);
};

export default postSaveButton;
