"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import {
  avatar01,
  avatar02,
  avatar03,
  avatar05,
  avatar06,
  logo,
  logoSmall,
} from "components/imagepath";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
// import "public/assets/js/feather.min.js";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
// import "public/assets/plugins/fontawesome/js/fontawesome.min.js";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";

let user = null;

const Header = () => {
  const [task, settask] = useState(true);
  const [task1, settask1] = useState(true);
  const [dropdown, setdropdown] = useState(false);
  const [dropdown1, setdropdown1] = useState(false);

  const handletheme = () => {
    document.body.classList.toggle("darkmode");
    settask(!task);
    settask1(!task1);
  };

  // const handledropdown = () => {
  //   setdropdown(!dropdown);
  //   setdropdown1(false);
  // };

  // const handledropdown1 = () => {
  //   setdropdown1(!dropdown1);
  //   setdropdown(false);
  // };

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
  };

 useEffect(() => {
    let data = { Token: sessionStorage.getItem("SEID") };
    console.log(data);
    axios
      .post("https://irannobat.ir:8444/api/AdminUser/getUserByToken", data)
      .then(function (response) {
        console.log(response.data);
        user = response.data;
        document.getElementById("avatar").setAttribute("src", user.Avatar);
        document.getElementById("avatar").setAttribute("srcSet", user.Avatar);
        document
          .getElementById("dropdownAvatar")
          .setAttribute("src", user.Avatar);
        document
          .getElementById("dropdownAvatar")
          .setAttribute("srcSet", user.Avatar);
        document.getElementById("userName").innerHTML = user.FullName;
        if (user.Admin = true) {
          document.getElementById("role").innerHTML = "ادمین";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <div className="header-left">
          <Link href="/admin" className="logo">
            <Image src={logo} alt="Logo" />
          </Link>
          <Link href="/admin" className="logo logo-small">
            <Image src={logoSmall} alt="Logo" width={30} height={30} />
          </Link>
          <Link href="#" id="toggle_btn" onClick={handlesidebar}>
            <FeatherIcon icon="chevrons-left" />
          </Link>
        </div>
        {/* /Logo */}
        {/* Search */}
        <div className="top-nav-search">
          <div className="main">
            <form className="search" method="post" action="/admin">
              <div className="s-icon">
                <i className="fas fa-search" />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Start typing your Search..."
              />
              <ul className="results">
                <li>
                  <h6>
                    <i className="me-1">
                      {" "}
                      <FeatherIcon icon="calendar" />
                    </i>
                    Appointments
                  </h6>
                  <p>
                    No matched Appointment found.{" "}
                    <Link href="/admin/appointment-list">
                      <span>View all</span>
                    </Link>
                  </p>
                </li>
                <li>
                  <h6>
                    <i className="me-1">
                      {" "}
                      <FeatherIcon icon="calendar" />
                    </i>{" "}
                    Specialities
                  </h6>
                  <p>
                    No matched Appointment found.{" "}
                    <Link href="/admin/specialities">
                      <span>View all</span>
                    </Link>
                  </p>
                </li>
                <li>
                  <h6>
                    <i className="me-1">
                      {" "}
                      <FeatherIcon icon="user" />
                    </i>{" "}
                    Doctors
                  </h6>
                  <p>
                    No matched Appointment found.{" "}
                    <Link href="/admin/doctor-list">
                      <span>View all</span>
                    </Link>
                  </p>
                </li>
                <li>
                  <h6>
                    <i className="me-1">
                      {" "}
                      <FeatherIcon icon="user" />
                    </i>
                    Patients
                  </h6>
                  <p>
                    No matched Appointment found.{" "}
                    <Link href="/admin/patient-list">
                      <span>View all</span>
                    </Link>
                  </p>
                </li>
              </ul>
            </form>
          </div>
        </div>
        {/* /Search */}
        {/* Mobile Menu Toggle */}
        <Link
          href="#"
          className="mobile_btn"
          id="mobile_btn"
          onClick={() => handlesidebarmobilemenu()}
        >
          <i className="fas fa-bars" />
        </Link>
        {/* /Mobile Menu Toggle */}
        {/* Header Menu */}
        <ul className="nav nav-tabs user-menu">
          {/* Flag */}
          <li className="nav-item">
            <Link href="#" id="dark-mode-toggle" className="dark-mode-toggle">
              <i
                onClick={handletheme}
                className={` light-mode ${task ? "active" : ""}`}
              >
                {" "}
                <FeatherIcon icon="sun" />
              </i>
              <i
                onClick={handletheme}
                className={`dark-mode ${task1 ? "" : "active"}`}
              >
                {" "}
                <FeatherIcon icon="moon" />
              </i>
            </Link>
          </li>
          {/* /Flag */}
          {/* Notifications */}
          <li className="nav-item dropdown noti-nav">
            <Link
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <FeatherIcon icon="bell" /> <span className="badge" />
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link href="#" className="clear-noti">
                  <FeatherIcon icon="more-vertical" />
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        <span className="avatar">
                          <img className="avatar-img" alt="" src={avatar02} />
                        </span>
                        <div className="media-body">
                          <h6>
                            Travis Tremble{" "}
                            <span className="notification-time">18.30 PM</span>
                          </h6>
                          <p className="noti-details">
                            Sent a amount of $210 for his Appointment{" "}
                            <span className="noti-title">Dr.Ruby perin </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        <span className="avatar">
                          <img className="avatar-img" alt="" src={avatar05} />
                        </span>
                        <div className="media-body">
                          <h6>
                            Travis Tremble{" "}
                            <span className="notification-time">
                              12 Min Ago
                            </span>
                          </h6>
                          <p className="noti-details">
                            {" "}
                            has booked her appointment to{" "}
                            <span className="noti-title">Dr. Hendry Watt</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        <div className="avatar">
                          <img className="avatar-img" alt="" src={avatar03} />
                        </div>
                        <div className="media-body">
                          <h6>
                            Travis Tremble{" "}
                            <span className="notification-time">6 Min Ago</span>
                          </h6>
                          <p className="noti-details">
                            {" "}
                            Sent a amount $210 for his Appointment{" "}
                            <span className="noti-title">Dr.Maria Dyen</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="#">
                      <div className="media d-flex">
                        <div className="avatar avatar-sm">
                          <img className="avatar-img" alt="" src={avatar06} />
                        </div>
                        <div className="media-body">
                          <h6>
                            Travis Tremble{" "}
                            <span className="notification-time">8.30 AM</span>
                          </h6>
                          <p className="noti-details">
                            {" "}
                            Send a message to his doctor
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          {/* /Notifications */}
          {/* User Menu */}
          {/* <li className="nav-item dropdown main-drop">
            <Link
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <img src={avatar01} alt="" />
                <span className="status online" />
              </span>
            </Link>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src={avatar01}
                    alt="User Image"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>Robert Haddin</h6>
                  <p className="text-muted mb-0">Administrator</p>
                </div>
              </div>
              <Link className="dropdown-item" href="/admin/profile">
                <i className="me-1">
                  <FeatherIcon icon="user" />
                </i>
                My Profile
              </Link>
              <Link className="dropdown-item" href="/admin/profile">
                <i className="me-1">
                  <FeatherIcon icon="edit" />
                </i>{" "}
                Edit Profile
              </Link>
              <Link className="dropdown-item" href="/admin/settings">
                <i className="me-1">
                  <FeatherIcon icon="sliders" />
                </i>{" "}
                Account Settings
              </Link>
              <hr className="my-0 ms-2 me-2" />
              <Link
                className="dropdown-item"
                href="/admin/login"
                onClick={() => setIsAuth("admin")}
              >
                <i className="me-1">
                  <FeatherIcon icon="log-out" />
                </i>
                Logout
              </Link>
            </div>
          </li> */}

          {/* <!-- User Menu --> */}

          <li className="nav-item dropdown has-arrow">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <Image
                  id="avatar"
                  src={avatar01}
                  className="rounded-circle"
                  width="30"
                  height="30"
                  alt="Ryan Taylor"
                />
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <Image
                    id="dropdownAvatar"
                    src={avatar01}
                    alt="User Image"
                    className="avatar-img rounded-circle"
                    width="30"
                    height="30"
                  />
                </div>
                <div className="user-text">
                  <h6 id="userName"></h6>
                  <p id="role" className="text-muted mb-0"></p>
                </div>
              </div>
              <a className="dropdown-item" href="profile.html">
                پروفایل من
              </a>
              <a className="dropdown-item" href="settings.html">
                تنظیمات
              </a>
              <a className="dropdown-item" href="login.html">
                خروج
              </a>
            </div>
          </li>
          {/* <!-- /User Menu --> */}

          {/* /User Menu */}
        </ul>
        {/* /Header Menu */}
      </div>
      {/* /Header */}
    </>
  );
};

export default Header;
