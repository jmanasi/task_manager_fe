import axios from "axios";
const api = {
  CORE_PORT: axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_CORE_PORT}/api`,
    headers: {
      Authorization: process.env.REACT_APP_AUTHORIZATION,
    },
  }),

  AUTH_PORT: axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AUTH_PORT}/api`,
    headers: {
      Authorization: process.env.REACT_APP_AUTHORIZATION,
    },
  }),
};

export default api;
