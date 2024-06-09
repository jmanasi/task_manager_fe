import api from "../../Service/api";
import { saveLoginData } from "../reducers/auth";
import { saveValidateData } from "../reducers/auth";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const today = moment().format("YYYY-MM-DD");

export const Login = (data, callback) => async (dispatch) => {
  api.AUTH_PORT.post("/auth/validateuser", data)
    .then((response) => {
      if (response.data?.Details) {
        dispatch(saveValidateData(response.data));
        api.AUTH_PORT.post("/auth/login", {
          UserId: response.data?.Details?.id,
        })
          .then((response) => {
            dispatch(saveLoginData(response.data));
            callback({
              status: true,
              response: response?.data,
            });
          })
          .catch((err) => {
            {
              console.log("error", err);
            }
          });
      } else if (response.data?.Error) {
        callback({ status: false, error: response.data?.Error?.ErrorMessage });
      }
    })
    .catch((err) => {
      {
        console.log("error", err);
      }
    });
};

export const Logout = (data, token, callback) => async (dispatch) => {
  api.AUTH_PORT.post("/auth/logout", data, {
    headers: {
      AuthToken: token,
    },
  })
    .then((response) => {
      if (response.data?.Details) {
        callback({ status: true, res: response.data?.Details });
      } else if (response.data?.Error?.ErrorMessage) {
        callback({ status: false, res: response.data?.Error?.ErrorMessage });
      }
    })
    .catch((err) => {
      callback({ status: true, res: err });
    });
};

export const Signup = (data, callback) => async (dispatch) => {
  api.CORE_PORT.post("/core/addUser", data)
    .then((response) => {
      if (response.data?.Details) {
        dispatch(saveValidateData(response.data));
        api.AUTH_PORT.post("/auth/login", {
          UserId: response.data?.Details?.id,
        })
          .then((response) => {
            dispatch(saveLoginData(response.data));
            callback({
              status: true,
              response: response?.data,
            });
          })
          .catch((err) => {
            {
              console.log("error", err);
            }
          });
      } else if (response.data?.Error) {
        callback({ status: false, error: response.data?.Error?.ErrorMessage });
      }
    })
    .catch((err) => {
      {
        console.log("error", err);
      }
    });
};
