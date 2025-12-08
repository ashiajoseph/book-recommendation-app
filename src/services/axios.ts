import axios from "axios";

const initializeAxios = () => {
  axios.defaults.baseURL = 'https://www.googleapis.com/books/v1';

  axios.defaults.headers.common = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default initializeAxios;
