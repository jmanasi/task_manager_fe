import React, { useState, useEffect } from "react";
import "../../../assets/Lists.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import "../../../assets/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Form } from "react-bootstrap";
import more from "../../../assets/Images/more.png";
import { useNavigate } from "react-router-dom";
import {
  getAllTasks,
  updateTask,
  deleteTask,
} from "../../../Redux/actions/tasks";
import moment from "moment";

const TasksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const [loading, setLoading] = useState(true);
  const todayDate = moment().format("YYYY-MM-DD");
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const [tasksList, setTaskList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showViewMoreModal, setShowViewMoreModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1); // Default to "Pending"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteTaskRef, setDeleteTaskRef] = useState(null);

  const filterTasksList = (value) => {
    if (value?.trim() == "") {
      fetchTasks();
    } else {
      const lowerCaseQuery = value.toLowerCase();
      const filtered = tasksList?.filter(
        (item) =>
          item?.title?.toLowerCase()?.includes(lowerCaseQuery) ||
          item?.email?.toLowerCase()?.includes(lowerCaseQuery)
      );
      setFilteredTasksList(filtered);
    }
  };

  const fetchTasks = () => {
    dispatch(
      getAllTasks(loginDetails?.logindata?.token, (callback) => {
        if (callback.status) {
          setLoading(false);

          setTaskList(callback?.response?.Details);
          setFilteredTasksList(callback?.response?.Details);
        } else {
          console.log("fetchTasks error", callback.error);
          toast.error(callback.error);
        }
      })
    );
  };

  useEffect(() => {
    fetchTasks();
  }, [dispatch]);

  const handleViewMore = (Details) => {
    setTaskDetails(Details);
    setStatus(Details.status); // Set the initial status based on the task details
  };

  useEffect(() => {
    if (taskDetails != null) {
      setShowViewMoreModal(true);
    }
  }, [taskDetails]);

  const handleCloseViewMore = () => {
    setShowViewMoreModal(false);
    setTaskDetails(null);
  };

  const updateTaskDetailsFn = () => {
    setLoader(true);

    const updateUserDetails = {
      taskRef: taskDetails?.reference,
      description: description !== "" ? description : taskDetails.description,
      status: status, // Use the state value for status
    };

    dispatch(
      updateTask(
        loginDetails?.logindata?.token,
        updateUserDetails,
        (callback) => {
          if (callback.status) {
            setLoader(false);
            toast.success("Updated Successfully");
            setShowViewMoreModal(false);
            fetchTasks();
          } else {
            toast.error(callback.error);
            setShowViewMoreModal(false);
            fetchTasks();
          }
        }
      )
    );
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 150) {
      setDescription(e.target.value);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "text-danger";
      case 2:
        return "text-primary";
      case 3:
        return "text-success";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Pending";
      case 2:
        return "In-Progress";
      case 3:
        return "Complete";
      default:
        return "";
    }
  };

  const handleDeleteClick = (reference) => {
    setDeleteTaskRef(reference);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const deleteTaskFn = () => {
    if (deleteTaskRef) {
      dispatch(
        deleteTask(
          loginDetails?.logindata?.token,
          { taskRef: deleteTaskRef },
          (callback) => {
            if (callback.status) {
              toast.success("Task deleted successfully");
              fetchTasks();
            } else {
              toast.error(callback.error);
            }
          }
        )
      );
    }
    setIsModalVisible(false);
  };

  return (
    <div>
      <ToastContainer />
      <h3 className="mb-4">Task List</h3>
      <div>
        <div className="row">
          <div className="col-md-6 col-lg-6 mb-3 justify-content-start">
            <p style={{ fontWeight: "bold" }}>Search </p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => {
                  filterTasksList(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-4 d-flex justify-content-end mb-3">
            <button className="btn btn-primary">
              <Link
                to="/AddTasks"
                state={{ userType: "4" }}
                className="addLinks"
              >
                Add New Task
              </Link>
            </button>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-center table_heading">
              Title
            </th>
            <th scope="col" className="text-center table_heading">
              Status
            </th>
            <th scope="col" className="text-center table_heading">
              Actions
            </th>
            <th scope="col" className="text-center table_heading">
              View more
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Oval
                    height={80}
                    width={50}
                    color="#4fa94d"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              </td>
            </tr>
          ) : filteredTasksList.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No data found.
              </td>
            </tr>
          ) : (
            filteredTasksList?.map((item) => (
              <tr key={item.id}>
                <td className="manager-list ">{item.title}</td>
                <td className={`manager-list ${getStatusClass(item.status)}`}>
                  {getStatusText(item.status)}
                </td>
                <td className="manager-list">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(item.reference)}
                  >
                    Delete
                  </button>
                </td>
                <td
                  className="manager-list"
                  onClick={() => handleViewMore(item)}
                >
                  <img src={more} className="more_img" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />

      <Modal show={showViewMoreModal} onHide={handleCloseViewMore} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="form_text">Title</label>
            <input
              type="text"
              className="form-control mt-2"
              defaultValue={taskDetails?.title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={true}
            />
          </div>

          <div>
            <label htmlFor="formGroupExampleInput" className="form_text">
              Description <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              className="form-control mt-2"
              placeholder="Description"
              defaultValue={taskDetails?.description}
              rows={3}
              onInput={handleDescriptionChange}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="statusDropdown" className="form_text">
              Status <span style={{ color: "red" }}>*</span>
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

          <div className="col-lg-6 mb-2 btn-lg mx-auto d-flex justify-content-center">
            <button
              style={{ paddingLeft: "100px", paddingRight: "100px" }}
              className="btn btn-primary mt-5 btn-lg"
              onClick={updateTaskDetailsFn}
            >
              {!loader ? (
                "Update Task"
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
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={isModalVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
          <Button variant="danger" onClick={deleteTaskFn}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TasksList;
