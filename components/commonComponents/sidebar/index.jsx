"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Sidebar = ({ Menus, UserData, UserRoles }) => {
  // console.log("menus in sidebar", Menus);
  const router = useRouter();

  const [menuList, setMenuList] = useState(Menus);

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
                  <FeatherIcon icon="home" />
                  <span>داشبورد</span>
                </Link>
              </li>
              {menuList?.map((menu, index) => (
                <li className="submenu" key={index}>
                  <a href={menu.Url}>
                    <FeatherIcon icon={menu.Icon} className="width-15" />
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
