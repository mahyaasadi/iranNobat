"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
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
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";

let user = null;
let centerId = null;

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

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
  };

  useEffect(() => {
    let data = { Token: sessionStorage.getItem("SEID") };
    axios
      .post("https://irannobat.ir:8444/api/AdminUser/getUserByToken", data)
      .then(function (response) {
        user = response.data;
        let centerId = user.CenterID;
        Cookies.set("CenterID", centerId);
        document.getElementById("avatar").setAttribute("src", user.Avatar);
        document.getElementById("avatar").setAttribute("srcSet", user.Avatar);
        document
          .getElementById("dropdownAvatar")
          .setAttribute("src", user.Avatar);
        document
          .getElementById("dropdownAvatar")
          .setAttribute("srcSet", user.Avatar);
        document.getElementById("userName").innerHTML = user.FullName;
        if ((user.Admin = true)) {
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
      <div className="content-header">
        {/* Logo */}
        <div className="header-left">
          <Link href="/dashboard" className="logo">
            <Image src={logo} alt="Logo" unoptimized={true} priority={true} />
          </Link>
          <Link href="/dashboard" className="logo logo-small">
            <Image src={logoSmall} alt="Logo" width={30} height={30} />
          </Link>
          <Link href="#" id="toggle_btn" onClick={handlesidebar}>
            <FeatherIcon icon="chevrons-left" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Link
          href="#"
          className="mobile_btn"
          id="mobile_btn"
          onClick={() => handlesidebarmobilemenu()}
        >
          <i className="fas fa-bars" />
        </Link>

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
        </ul>
      </div>
    </>
  );
};

export default Header;
