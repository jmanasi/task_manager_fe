import api from "../../Service/api";

export const getAllUsers = (token, callback) => async (dispatch) => {
  api.CORE_PORT.get(`/core/getUsers`, {
    headers: { AuthToken: token },
  })
    .then((response) => {
      if (response.data?.Details) {
        callback({
          status: true,
          response: response?.data,
        });
      } else if (response.data?.Error) {
        callback({
          status: false,
          error: response.data?.Error?.ErrorMessage,
        });
      }
    })
    .catch((err) => {
      {
        console.log("error", err);
      }
    });
};

export const updateUser = (token, data, callback) => async (dispatch) => {
  api.CORE_PORT.put("/core/editUser", data, {
    headers: { AuthToken: token },
  })
    .then((response) => {
      if (response.data?.Details) {
        callback({
          status: true,
          response: response?.data,
        });
      } else if (response.data?.Error) {
        callback({
          status: false,
          error: response.data?.Error?.ErrorMessage,
        });
      }
    })
    .catch((err) => {
      {
        console.log("error", err);
      }
    });
};
export const addNewUser = (data, callback) => async (dispatch) => {
  api.CORE_PORT.post("/core/addUser", data, {
    // headers: { AuthToken: token },
  })
    .then((response) => {
      if (response.data?.Details) {
        callback({
          status: true,
          response: response?.data,
        });
      } else if (response.data?.Error) {
        callback({
          status: false,
          error: response.data?.Error?.ErrorMessage,
        });
      }
    })
    .catch((err) => {
      {
        console.log("error", err);
      }
    });
};
export const deleteUsers = (token, data, callback) => async (dispatch) => {
  api.CORE_PORT.delete(`/core/deleteUser?userRef=${data}`, {
    headers: { AuthToken: token },
  })
    .then((response) => {
      if (response.data?.Details) {
        callback({
          status: true,
          response: response?.data,
        });
      } else if (response.data?.Error) {
        callback({
          status: false,
          error: response.data?.Error?.ErrorMessage,
        });
      }
    })
    .catch((err) => {
      {
        console.log("error", err);
      }
    });
};
