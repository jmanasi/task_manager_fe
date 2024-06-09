import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/global.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { addNewUser } from "../../../Redux/actions/users";

const AddUsers = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateDetails = useSelector(
    (state) => state.auth?.userDetailsAfterValidation
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loader, setLoader] = useState(false);

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setPasswordsMatch(true);
  };

  const onsubmit = () => {
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoader(true);

    const data = {
      name: name,
      email: email,
      username: username,
      password: confirmPassword,
    };

    dispatch(
      addNewUser(data, (callback) => {
        if (callback.status) {
          resetForm();
          setLoader(false);
          toast.success("User Added Successfully");
          window.location.reload();
        } else {
          // resetForm();

          setLoader(false);
          toast.error(callback.error);
          // window.location.reload();
        }
      })
    );
  };

  return (
    <div class="container">
      <div class="tab-panel">
        <div class="tab-content">
          <div class="tab-pane active" id="tabs-1" role="tabpanel">
            <div class="row d-flex justify-content-center">
              <ToastContainer />

              <div className="row">
                <div className="container-fluid vh-5 d-flex justify-content-center align-items-center">
                  <div className="col-lg-4 col-md-6 col-sm-8 text-center mt-4">
                    {/* <div className="card p-4"> */}
                    <h3>ADD NEW USER</h3>
                    {/* </div> */}
                  </div>
                  <ToastContainer />
                </div>

                <div className="col-lg-6 mt-3 mt-3">
                  <label for="formGroupExampleInput " className="form_text">
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    class="form-control mt-2 "
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-lg-6 mt-3">
                  <label
                    for="formGroupExampleInput "
                    className="form_text"
                    style={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    class="form-control mt-2"
                    type="text"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-lg-6 mt-3">
                  <label
                    for="formGroupExampleInput "
                    className="form_text"
                    style={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Username <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    class="form-control mt-2"
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="col-lg-6 mt-3 mt-3">
                  <label htmlFor="formGroupExampleInput" className="form_text">
                    Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control mt-2"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    // onChange={handlePasswordChange}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mt-3 mt-3">
                  <label htmlFor="formGroupExampleInput" className="form_text">
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control mt-2"
                    type="password"
                    placeholder="Enter Confirmed Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {!passwordsMatch && (
                    <p style={{ color: "red" }}>Password does not match</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6 mb-2 btn-lg mx-auto d-flex justify-content-center ">
                <button
                  style={{ paddingLeft: "100px", paddingRight: "100px" }}
                  type="submit"
                  className="btn btn-primary mt-5 btn-lg"
                  onClick={onsubmit}
                  disabled={
                    name === "" &&
                    email === "" &&
                    password === "" &&
                    confirmPassword === ""
                      ? true
                      : false
                  }
                  // disabled={name == "" && email == "" ? true : false}
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

export default AddUsers;
