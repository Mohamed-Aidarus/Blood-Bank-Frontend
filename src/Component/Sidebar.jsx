import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUserPlus,
  FaProcedures,
  FaDonate,
  FaFileMedical,
  FaHistory,
  FaWarehouse,
  FaPlusCircle,
  FaHeart

} from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

function Sidebar({ children }) {
  const [isOpen, SetIsOpen] = useState(false);
  const toggle = () => SetIsOpen(!isOpen);


  // Custom Blood Donation Icon Component
  const BloodDonationIcon = () => {
    return (
      <>
        <FaHeart size={24} /> {/* Heart icon */}
        <FaPlusCircle
          size={24}
          style={{ marginLeft: "-10px", marginTop: "-15px" }}
        />{" "}
        {/* Plus Circle icon */}
      </>
    );
  };

  const MenuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/donor",
      name: "Donor",
      icon: <FaUserPlus />,
    },
    {
      path: "/patient",
      name: "Patient",
      icon: <FaProcedures />,
    },
    {
      path: "/donation",
      name: "Donation",
      icon: <BloodDonationIcon />,
    },
    {
      path: "/bloodRequest",
      name: "Blood Requests",
      icon: <FaFileMedical />,
    },
    {
      path: "/requestHistory",
      name: "Request History",
      icon: <FaHistory />,
    },
    {
      path: "/bloodStock",
      name: "Blood Stock",
      icon: <FaWarehouse />,
    },
  ];
  return (
    <div>
      <header className="bg-[#ede0d4] shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <div className="header-logo">
            <Link to="/home" className="text-2xl font-bold text-red-500">
              Blood Bank System
            </Link>
          </div>
          <div className="header-logout">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>
      <div className="container">
        <div style={{ width: isOpen ? "320px" : "60px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              Dashboard
            </h1>
            <div
              style={{ marginLeft: isOpen ? "10px" : "6px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {MenuItem.map((item, index) => (
            // Hadii iconka lataabto ama magaca ama link laguyimaado asiga le raac
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="linktext"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        {/* isku xiraha */}
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Sidebar;
