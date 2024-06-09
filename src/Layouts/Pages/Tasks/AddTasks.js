import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Oval } from "react-loader-spinner";
import { addNewTask } from "../../../Redux/actions/tasks";

const AddTasks = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1); // Default to "Pending"
  const [loader, setLoader] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus(1);
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 150) {
      setDescription(e.target.value);
    }
  };

  const onsubmit = () => {
    setLoader(true);

    const data = {
      title: title,
      description: description,
      status: status,
    };

    dispatch(
      addNewTask(loginDetails?.logindata?.token, data, (callback) => {
        setLoader(false);
        if (callback.status) {
          resetForm();
          toast.success("Task Added Successfully");
          window.location.reload();
        } else {
          toast.error(callback.error);
        }
      })
    );
  };

  return (
    <div className="container">
      <div className="tab-panel">
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <div className="row d-flex justify-content-center">
              <ToastContainer />

              <div className="row">
                <div className="container-fluid vh-5 d-flex justify-content-center align-items-center">
                  <div className="col-12 text-center mt-4">
                    <h3>ADD NEW TASK</h3>
                  </div>
                  <ToastContainer />
                </div>

                <div className="col-12 mt-3">
                  <label htmlFor="formGroupExampleInput" className="form_text">
                    Task Title <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control mt-2"
                    type="text"
                    placeholder="Enter the Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-12 mt-3">
                  <label htmlFor="formGroupExampleInput" className="form_text">
                    Task Description <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    className="form-control mt-2"
                    placeholder="Description"
                    value={description}
                    rows={3}
                    onInput={handleDescriptionChange}
                  />
                </div>

                <div className="col-12 mt-3">
                  <label htmlFor="statusDropdown" className="form_text">
                    Task Status <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="statusDropdown"
                    className="form-control mt-2"
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                  >
                    <option value={1}>Pending</option>
                    <option value={2}>In-Progress</option>
                    <option value={3}>Complete</option>
                  </select>
                </div>
              </div>

              <div className="col-12 mb-2 btn-lg mx-auto d-flex justify-content-center">
                <button
                  style={{ paddingLeft: "100px", paddingRight: "100px" }}
                  type="submit"
                  className="btn btn-primary mt-5 btn-lg"
                  onClick={onsubmit}
                  disabled={title === "" || description === ""}
                >
                  {!loader ? (
                    "Confirm"
                  ) : (
                    <Oval
                      height={20}
                      width={20}
                      color="black"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="black"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTasks;
