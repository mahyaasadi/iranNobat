"use client"; //This is a client component
import { axiosClient } from "class/axiosConfig.js";
import { useState, useEffect } from "react";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/feathericon.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Sidebar = () => {
  const router = useRouter();

  const [menuList, setMenuList] = useState([]);
  // get menu list
  const getMenuData = () => {
    let url = "InoMenu/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        setMenuList(response.data);
        console.log("menuList", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMenuData();
  }, []);

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

              {menuList?.map((menu, index) => (
                <li className="submenu" key={index}>
                  <a href={menu.Url}>
                    <i>
                      <FeatherIcon icon={menu.Icon} className="width-15" />
                    </i>
                    <span>{menu.Name}</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul className="hidden hiddenSidebar">
                    {menu?.subMenu?.map((sub, index) => (
                      <li
                        key={index}
                        className={
                          router.pathname == `${sub.Url}` ? "active" : ""
                        }
                      >
                        <Link href={sub.Url} className="font-12">
                          {sub.Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

{
  /* <li className="submenu">
                <a href="#">
                  <i>
                    <FeatherIcon icon="settings" className="width-15" />
                  </i>
                  <span>تنظیمات مرکز</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li className={router.pathname == "/doctors" ? "active" : ""}>
                    <Link href="/doctors" className="font-12">
                      پزشکان
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/specializedWorks" ? "active" : ""
                    }
                  >
                    <Link href="/specializedWorks" className="font-12">
                      کارهای تخصصی
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
                      بیمه های تحت پوشش
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
                  </i>
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
                  <span>تنظیمات سیستم اینو</span>
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
                  <span>تنظیمات نوبت دهی</span>
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
                  <span>مدیریت کاربران مرکز</span>
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
                  <i>
                    <FeatherIcon icon="message-square" className="width-15" />
                  </i>
                  <span>پنل پیامک</span>
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
              </li> */
}
