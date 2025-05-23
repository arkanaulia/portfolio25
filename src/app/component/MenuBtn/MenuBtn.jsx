import React from "react";
import "./MenuBtn.css";

const MenuBtn = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`menu-toggle ${isOpen ? "opened" : "closed"} z-50`}
      onClick={toggleMenu}
    >
      <div className="menu-toggle-icon bg-orange-500">
        <div className="hamburger">
          <div className="menu-bar" data-position="top"></div>
          <div className="menu-bar" data-position="bottom"></div>
        </div>
      </div>
      <div className="menu-copy">
        <p>Menu</p>
      </div>
    </div>
  );
};

export default MenuBtn;
