import React from "react";
import "../../assets/LoginPage.css";
import SideNav from "../Pages/SideNav";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="layout-container">
        <SideNav />

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
