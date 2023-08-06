"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { axiosClient } from "class/axiosConfig.js";
import Image from "next/image";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import { avatar01, headerLogo, logoSmall } from "components/imagepath";
import { ErrorAlert } from "class/AlertManage.js";

let user = null;
let centerId = null;

const Header = () => {
  let router = useRouter();
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

    if (data) {
      axiosClient
        .post("AdminUser/getUserByToken", data)
        .then(function (response) {
          user = response.data;
          let centerId = user.CenterID;
          Cookies.set("CenterID", centerId);
          console.log(response.data);
          document.getElementById("userName").innerHTML = user.FullName;
          document.getElementById("avatar").setAttribute("src", user.Avatar);
          document.getElementById("avatar").setAttribute("srcSet", user.Avatar);

          document
            .getElementById("dropdownAvatar")
            .setAttribute("src", user.Avatar);

          document
            .getElementById("dropdownAvatar")
            .setAttribute("srcSet", user.Avatar);

          if ((user.Admin = true)) {
            document.getElementById("role").innerHTML = "ادمین";
          }
        })
        .catch(function (error) {
          console.log(error);
          ErrorAlert("خطا", "ارتباط با سرور در حال حاضر امکان پذیر نمی باشد!");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        });
    }
  }, []);

  return (
    <>
      <div className="content-header">
        {/* Logo */}
        <div className="header-left">
          <Link href="/dashboard" className="logo">
            <Image
              src={headerLogo}
              alt="Logo"
              unoptimized={true}
              priority={true}
            />
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
                  alt="Admin"
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
                  <p className="mb-1" id="userName"></p>
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
