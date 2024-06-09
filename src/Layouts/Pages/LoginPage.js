import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "../../Redux/actions/auth";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onsubmit = () => {
    setLoading(true);
    const data = {
      username: username,
      password: password,
    };

    dispatch(
      Login(data, (callback) => {
        if (callback.status) {
          toast.success("Welcome Back");
          navigate("UsersList");
          setLoading(false);
        } else {
          toast.error(callback.error);
          setLoading(false);
        }
      })
    );
  };

  const isButtonDisabled = !username || !password;

  return (
    <div>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-8 text-center">
          <h2 className="text-center title mb-4">WELCOME BACK</h2>
          <div className="p-4 bg-light rounded">
            <h2 className="text-center subtitle mb-2">LOGIN TO THE APP</h2>

            <div className="form-group">
              <input
                type="text"
                className="form-control mb-4"
                id="username"
                placeholder="Enter your Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control mb-4"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <button
                disabled={isButtonDisabled}
                type="button"
                className="btn btn-dark btn-block btn-md w-100"
                onClick={onsubmit}
              >
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Oval
                      height={30}
                      width={30}
                      color="#4fa94d"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
          <Link to="/SignUp" className="text-decoration-none">
            Don't have an account? Sign Up
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
export default LoginPage;
