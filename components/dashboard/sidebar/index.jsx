"use client"; //This is a client component
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/feathericon.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";

const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>اصلی</span>
              </li>
              <li className={router.pathname == "/dashboard" ? "active" : ""}>
                <Link href="/dashboard">
                  <i className="fe fe-home"></i>
                  <span>داشبورد</span>
                </Link>
              </li>

              <li className="submenu">
                <a href="#">
                  <i className="fe fe-document"></i> <span> تنظیمات مرکز</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/doctorsList" ? "active" : ""
                    }
                  >
                    <Link href="/doctorsList">پزشکان</Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/specializedWorks" ? "active" : ""
                    }
                  >
                    <Link href="/specializedWorks">کارهای تخصصی </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/certifications" ? "active" : ""
                    }
                  >
                    <Link href="/certifications">مجوزها</Link>
                  </li>
                  <li
                    className={router.pathname == "/insurances" ? "active" : ""}
                  >
                    <Link href="/insurances"> بیمه های تحت پوشش </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/imagesGallery" ? "active" : ""
                    }
                  >
                    <Link href="/imagesGallery">گالری تصاویر</Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i className="fe fe-document"></i> <span> تنظیمات پذیرش</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={router.pathname == "/discounts" ? "active" : ""}
                  >
                    <Link href="/discounts">تخفیفات</Link>
                  </li>
                  <li className={router.pathname == "/tariff" ? "active" : ""}>
                    <Link href="/tariff">تعرفه بخش ها</Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i className="fe fe-document"></i>
                  <span> تنظیمات سیستم اینو</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/cannedMessages" ? "active" : ""
                    }
                  >
                    <Link href="/cannedMessages">پیام های پیش فرض</Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i className="fe fe-document"></i>
                  <span>تنظیمات نوبت دهی </span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/departments" ? "active" : ""
                    }
                  >
                    <Link href="/departments">انتخاب بخش</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
