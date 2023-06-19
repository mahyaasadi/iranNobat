"use client"; //This is a client component
// import "public/assets/css/bootstrap.rtl.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/feathericon.min.css";
// import "public/assets/plugins/morris/morris.css";
import { useRouter } from "next/router";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";

import Link from "next/link";
const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>اصلی</span>
              </li>
              <li className="active">
                <Link href="index.html">
                  <i className="fe fe-home"></i>{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/dashboard");
                    }}
                  >
                    داشبورد
                  </span>
                </Link>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="fe fe-document"></i> <span> تنظیمات مراکز</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden">
                  <li>
                    <Link href="/doctorsList">پزشکان</Link>
                  </li>
                  <li>
                    <Link href="/specializedWorks">کارهای تخصصی مرکز</Link>
                  </li>
                  <li>
                    <Link href="/certifications">دریافت مجوزها</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- /Sidebar --> */}
      </div>
    </>
  );
};

export default Sidebar;
