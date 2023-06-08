"use client"; //This is a client component
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import logo from "../../src/assets/img/logo.png";
import logoSmall from "../../src/assets/img/logo-small.png";
import doctorThumb from "../../src/assets/img/doctors/doctor-thumb-01.jpg";
import patient1 from "../../src/assets/img/patients/patient1.jpg";
import patient2 from "../../src/assets/img/patients/patient2.jpg";
import patient3 from "../../src/assets/img/patients/patient3.jpg";
import avatar from "../../src/assets/img/profiles/avatar-01.jpg";
import "../../src/assets/css/bootstrap.rtl.min.css";
import "../../src/assets/css/font-awesome.min.css";
import "../../src/assets/css/feathericon.min.css";
import "../../src/assets/plugins/morris/morris.css";
import "../../src/assets/css/style.css";
import { json } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", () => {
    let data = { Token: sessionStorage.getItem("SEID") };
    console.log(data);
    axios
      .post("https://irannobat.ir:8444/api/AdminUser/getUserByToken", data)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // });
  }, []);

  return (
    <div>
      {/* <!-- Header --> */}
      <div className="header">
        {/* <!-- Logo --> */}
        <div className="header-left">
          <a href="index.html" className="logo">
            <Image src={logo} alt="Logo" width="30px" height="50px" />
          </a>
          <a href="index.html" className="logo logo-small">
            <Image src={logoSmall} alt="Logo" width="20px" height="20px" />
          </a>
        </div>
      </div>

      <a href="javascript:void(0);" id="toggle_btn">
        <i className="fe fe-text-align-left"></i>
      </a>

      <div className="top-nav-search">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
          ></input>
          <button className="btn" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      {/* <!-- Mobile Menu Toggle --> */}
      <a className="mobile_btn" id="mobile_btn">
        <i className="fa fa-bars"></i>
      </a>
      {/* <!-- /Mobile Menu Toggle --> */}

      {/* <!-- Header Right Menu --> */}
      <ul className="nav user-menu">
        {/* <!-- Notifications --> */}
        <li className="nav-item dropdown noti-dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <i className="fe fe-bell"></i>{" "}
            <span className="badge rounded-pill">3</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="javascript:void(0)" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <Image
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src={doctorThumb}
                          width="30"
                          height="30"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                          Schedule{" "}
                          <span className="noti-title">her appointment</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <Image
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src={patient1}
                          width="30"
                          height="30"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Charlene Reed</span> has
                          booked her appointment to{" "}
                          <span className="noti-title">Dr. Ruby Perrin</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <Image
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src={patient2}
                          width="30"
                          height="30"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Travis Trimble</span>{" "}
                          sent a amount of $210 for his{" "}
                          <span className="noti-title">appointment</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <Image
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src={patient3}
                          width="30"
                          height="30"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Carl Kelly</span> send a
                          message{" "}
                          <span className="noti-title"> to his doctor</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="#">View all Notifications</a>
            </div>
          </div>
        </li>
        {/* <!-- /Notifications --> */}

        {/* <!-- User Menu --> */}
        <li className="nav-item dropdown has-arrow">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <span className="user-img">
              <Image
                className="rounded-circle"
                src={avatar}
                width="51"
                height="50"
                alt="Ryan Taylor"
              />
            </span>
          </a>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <Image
                  src={avatar}
                  alt="User Image"
                  className="avatar-img rounded-circle"
                  width="50"
                  height="50"
                />
              </div>
              <div className="user-text">
                <h6>Ryan Taylor</h6>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>
            <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <a className="dropdown-item" href="login.html">
              Logout
            </a>
          </div>
        </li>
        {/* <!-- /User Menu --> */}
      </ul>
      {/* <!-- /Header Right Menu --> */}
    </div>
  );
};

export default Header;
