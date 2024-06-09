import api from "../../Service/api";

export const addNewTask = (token, data, callback) => async (dispatch) => {
  api.CORE_PORT.post("/core/addTask", data, {
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
export const updateTask = (token, data, callback) => async (dispatch) => {
  api.CORE_PORT.put("/core/editTask", data, {
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
export const getAllTasks = (token, callback) => async (dispatch) => {
  api.CORE_PORT.get(`/core/getTasks`, {
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
export const deleteTask = (token, data, callback) => async (dispatch) => {
  api.CORE_PORT.delete(`/core/deleteTask?taskRef=${data.taskRef}`, {
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
