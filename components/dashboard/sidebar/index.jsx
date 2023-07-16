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
import FeatherIcon from "feather-icons-react";

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
                  <i>
                    <FeatherIcon icon="home" />
                  </i>
                  <span>داشبورد</span>
                </Link>
              </li>

              <li className="submenu">
                <a href="#">
                  <i>
                    <FeatherIcon icon="settings" className="width-15" />
                  </i>
                  <span> تنظیمات مرکز</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/doctorsList" ? "active" : ""
                    }
                  >
                    <Link href="/doctorsList" className="font-12">
                      پزشکان
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/specializedWorks" ? "active" : ""
                    }
                  >
                    <Link href="/specializedWorks" className="font-12">
                      کارهای تخصصی{" "}
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/certifications" ? "active" : ""
                    }
                  >
                    <Link href="/certifications" className="font-12">
                      مجوزها
                    </Link>
                  </li>
                  <li
                    className={router.pathname == "/insurances" ? "active" : ""}
                  >
                    <Link href="/insurances" className="font-12">
                      {" "}
                      بیمه های تحت پوشش{" "}
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/imagesGallery" ? "active" : ""
                    }
                  >
                    <Link href="/imagesGallery" className="font-12">
                      گالری تصاویر
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i>
                    <FeatherIcon icon="clipboard" className="width-15" />
                  </i>{" "}
                  <span> تنظیمات پذیرش</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={router.pathname == "/discounts" ? "active" : ""}
                  >
                    <Link href="/discounts" className="font-12">
                      تخفیفات
                    </Link>
                  </li>
                  <li className={router.pathname == "/tariff" ? "active" : ""}>
                    <Link href="/tariff" className="font-12">
                      تعرفه بخش ها
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i>
                    <FeatherIcon icon="message-circle" className="width-15" />
                  </i>
                  <span> تنظیمات سیستم اینو</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/cannedMessages" ? "active" : ""
                    }
                  >
                    <Link href="/cannedMessages" className="font-12">
                      پیام های پیش فرض
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i>
                    <FeatherIcon icon="check-square" className="width-15" />
                  </i>
                  <span>تنظیمات نوبت دهی </span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/departments" ? "active" : ""
                    }
                  >
                    <Link href="/departments" className="font-12">
                      انتخاب بخش
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i>
                    <FeatherIcon icon="file" className="width-15" />
                  </i>
                  <span>نسخه نویسی</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/prescription" ? "active" : ""
                    }
                  >
                    <Link href="/prescription" className="font-12">
                      نسخه نویسی
                    </Link>
                  </li>

                  <li
                    className={
                      router.pathname == "/prescriptionHistory" ? "active" : ""
                    }
                  >
                    <Link href="/prescriptionHistory" className="font-12">
                      سوابق نسخه
                    </Link>
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
