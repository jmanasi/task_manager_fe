import React, { useState } from "react";
import { Sidenav, Nav, Toggle } from "rsuite";
import PageIcon from "@rsuite/icons/Page";
import ExitIcon from "@rsuite/icons/Exit";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../Redux/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "../../assets/NavBar.css";

const SideNav = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");
  const [isModalVisible, setModalVisibility] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const logoutFn = () => {
    const data = {
      userId: loginDetails?.logindata?.user_id,
    };

    dispatch(
      Logout(data, loginDetails?.logindata?.token, (callback) => {
        if (callback.status) {
          setModalVisibility(false);
          navigate("/");
        } else {
          toast.error("Invalid credentials");
          setModalVisibility(false);
        }
      })
    );
  };

  const openModal = () => {
    setModalVisibility(true);
  };
  const closeModal = () => setModalVisibility(false);

  const gotTonewBooking = () => {
    navigate("/UsersList");
  };
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <hr />
      <Sidenav expanded={expanded} defaultOpenKeys="3">
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              eventKey="1"
              icon={<PageIcon />}
              onClick={gotTonewBooking}
            >
              <Link to="/UsersList" className="links">
                Users
              </Link>
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<PageIcon />}>
              <Link to="/TasksList" className="links">
                Tasks
              </Link>
            </Nav.Item>

            <Nav.Item eventKey="6" icon={<ExitIcon />} onClick={openModal}>
              Logout
            </Nav.Item>
          </Nav>
          <ToastContainer />
        </Sidenav.Body>
        <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        />
      </Sidenav>
      <Modal show={isModalVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>

          <Button variant="danger" onClick={logoutFn}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SideNav;
