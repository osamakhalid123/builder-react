import axios from "axios";
import { API_HOST } from "../api";

const checkConnection = async () => {
  await axios
    .get(`${API_HOST}users/`)
    .then((res) => {
      if (res) {
        return true;
      }
    })
    .catch((err) => {
      if (err) {
        return false;
      }
    });
};

export default checkConnection;
