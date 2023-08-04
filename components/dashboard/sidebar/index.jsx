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
                    className={
                      router.pathname == "/specialDiseases" ? "active" : ""
                    }
                  >
                    <Link href="/specialDiseases" className="font-12">
                      بیماری های خاص
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
                    <Link
                      href="/imagesGallery"
                      className={
                        router.pathname == "/imagesGallery"
                          ? "subdrop font-12"
                          : "font-12"
                      }
                    >
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
                  <li
                    className={
                      router.pathname == "/monthlySchedule" ? "active" : ""
                    }
                  >
                    <Link href="/monthlySchedule" className="font-12">
                      برنامه ماهیانه
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/serviceGroupDetails" ? "active" : ""
                    }
                  >
                    <Link href="/serviceGroupDetails" className="font-12">
                      گروه بندی سرویس ها
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="submenu">
                <a href="#">
                  <i>
                    <FeatherIcon icon="users" className="width-15" />
                  </i>{" "}
                  <span>مدیریت کاربران مرکز </span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/centerUsers" ? "active" : ""
                    }
                  >
                    <Link href="/centerUsers" className="font-12">
                      کاربران مرکز
                    </Link>
                  </li>
                  <li className={router.pathname == "/roles" ? "active" : ""}>
                    <Link href="/roles" className="font-12">
                      تنظیمات دسترسی
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

              <li className="submenu">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="chatIconSize"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>

                  <span>پنل پیامک </span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={
                      router.pathname == "/receptionSms" ? "active" : ""
                    }
                  >
                    <Link href="/receptionSms" className="font-12">
                      ارسال پیامک
                    </Link>
                  </li>

                  <li
                    className={
                      router.pathname == "/smsPanelSettings" ? "active" : ""
                    }
                  >
                    <Link href="/smsPanelSettings" className="font-12">
                      تنظیمات پنل پیامک
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
