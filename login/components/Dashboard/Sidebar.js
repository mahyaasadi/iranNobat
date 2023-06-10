"use client"; //This is a client component
import "src/assets/css/bootstrap.rtl.min.css";
import "src/assets/css/font-awesome.min.css";
import "src/assets/css/feathericon.min.css";
import "src/assets/plugins/morris/morris.css";
import { useRouter } from "next/router";
import { Router, Routes } from "react-router-dom";
import "src/assets/css/style.css";

const Sidebar = () => {
  const router = useRouter();

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   router.push("/doctorsList")
  // }

  return (
    <div>
      {/* <!-- Sidebar --> */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className="active">
                <a href="index.html">
                  <i className="fe fe-home"></i>{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/DashboardContent");
                    }}
                  >
                    داشبورد
                  </span>
                </a>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="fe fe-document"></i> <span> تنظیمات مراکز</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/doctorsList");
                    }}
                  >
                    پزشکان
                  </div>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- /Sidebar --> */}
      </div>
    </div>
  );
};

export default Sidebar;
