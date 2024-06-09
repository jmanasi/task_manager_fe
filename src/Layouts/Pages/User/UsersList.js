import React, { useState, useEffect } from "react";
import "../../../assets/Lists.css";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
// import "../../../assets/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Form } from "react-bootstrap";
import more from "../../../assets/Images/more.png";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  updateUser,
  deleteUsers,
} from "../../../Redux/actions/users";
import moment from "moment";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const [loading, setLoading] = useState(true);
  const todayDate = moment().format("YYYY-MM-DD");
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showViewMoreModal, setShowViewMoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Added state for delete modal
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [deleteUserRef, setDeleteUserRef] = useState(null);

  const filterUsersList = (value) => {
    if (value?.trim() == "") {
      fetchUsers();
    } else {
      const lowerCaseQuery = value.toLowerCase();
      const filtered = usersList?.filter(
        (item) =>
          item?.name?.toLowerCase()?.includes(lowerCaseQuery) ||
          item?.email?.toLowerCase()?.includes(lowerCaseQuery)
      );
      setFilteredUsersList(filtered);
    }
  };
  const fetchUsers = () => {
    dispatch(
      getAllUsers(loginDetails?.logindata?.token, (callback) => {
        if (callback.status) {
          setLoading(false);
          setUsersList(callback?.response?.Details);
          setFilteredUsersList(callback?.response?.Details);
        } else {
          console.log("fetchUsers error", callback.error);
          toast.error(callback.error);
        }
      })
    );
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);
  const handleViewMore = (Details) => {
    setUserDetails(Details);
  };
  useEffect(() => {
    if (userDetails != null) {
      setShowViewMoreModal(true);
    }
  }, [userDetails]);
  const handleCloseViewMore = () => {
    setShowViewMoreModal(false);
    setUserDetails(null);
  };

  const updateUserDetailsFn = () => {
    setLoader(true);

    const updateUserDetails = {
      userRef: userDetails?.reference,
      name: name != "" ? name : userDetails?.name,
      username: username != "" ? username : userDetails?.username,
      password: userDetails?.password,
    };

    dispatch(
      updateUser(
        loginDetails?.logindata?.token,
        updateUserDetails,
        (callback) => {
          if (callback.status) {
            setLoader(false);
            toast.success("Updated Successfully");
            setShowViewMoreModal(false);
            fetchUsers();
          } else {
            toast.error(callback.error);
            setShowViewMoreModal(false);
            fetchUsers();
          }
        }
      )
    );
  };

  const handleDeleteUser = (reference) => {
    setDeleteUserRef(reference);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Call API to delete user
    dispatch(
      deleteUsers(loginDetails?.logindata?.token, deleteUserRef, (callback) => {
        if (callback.status) {
          toast.success("User deleted successfully");
          setShowDeleteModal(false);
          fetchUsers();
        } else {
          toast.error(callback.error);
          setShowDeleteModal(false);
        }
      })
    );
  };

  return (
    <div>
      <ToastContainer />
      <h3 className="mb-4">User List</h3>
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
                  filterUsersList(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-4 d-flex justify-content-end mb-3">
            <button className="btn btn-primary">
              <Link
                to="/AddUsers"
                state={{ userType: "4" }}
                className="addLinks"
              >
                Add New User
              </Link>
            </button>
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col" className="text-center table_heading">
              Name
            </th>
            <th scope="col" className="text-center table_heading">
              Email
            </th>
            <th scope="col" className="text-center table_heading">
              Delete
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
          ) : filteredUsersList.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No data found.
              </td>
            </tr>
          ) : (
            filteredUsersList?.map((item) => (
              <tr key={item.id}>
                <td className="manager-list ">{item.name}</td>
                <td className="manager-list ">{item.email}</td>
                <td className="manager-list">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(item.reference)}
                  >
                    Delete
                  </button>
                </td>
                <td
                  className="manager-list"
                  onClick={() => handleViewMore(item)}
                >
                  <img src={more} className="more_img" alt="" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
      <Modal show={showViewMoreModal} onHide={handleCloseViewMore} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="form_text">Name</label>
            <input
              type="text"
              className="form-control mt-2"
              defaultValue={userDetails?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="form_text">Email</label>
            <input
              type="text"
              className="form-control mt-2"
              defaultValue={userDetails?.email}
              disabled={true}
            />
          </div>

          <div>
            <label className="form_text">Username</label>
            <input
              type="text"
              className="form-control mt-2"
              defaultValue={userDetails?.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="col-lg-6 mb-2 btn-lg mx-auto d-flex justify-content-center ">
            <button
              style={{ paddingLeft: "100px", paddingRight: "100px" }}
              className="btn btn-primary mt-5 btn-lg"
              onClick={updateUserDetailsFn}
            >
              {!loader ? (
                "Update User"
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UsersList;
