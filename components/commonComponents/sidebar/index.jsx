"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Sidebar = ({ Menus, UserData, UserRoles }) => {
  const router = useRouter();

  function extractPermissionIds(a) {
    let arr = [];
    a.map((role) => {
      arr.push(role.PermisionID._id);
    });
    return arr;
  }

  const UserPer = extractPermissionIds(UserRoles.PermisionsID);

  console.log({ UserPer });
  console.log({ Menus });

  const [activeSubMenu, setActiveSubMenu] = useState(null);

  useEffect(() => {
    const savedSubMenu = localStorage.getItem("activeSubMenu");
    if (savedSubMenu) {
      setActiveSubMenu(savedSubMenu);
    }
  }, []);

  function handleSubMenuClick(menuIndex) {
    setActiveSubMenu(menuIndex);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeSubMenu", menuIndex);
    }
  }

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

              {Menus?.map((menu, index) => {
                let isInArray = false;
                menu.Permissions.forEach((per) => {
                  if (UserPer.includes(per.PermisionID)) {
                    isInArray = true;
                  }
                });

                if (isInArray) {
                  return (
                    <li className="submenu" key={index}>
                      <a href={menu.Url} className="subdrop">
                        <FeatherIcon icon={menu.Icon} className="width-15" />
                        <span>{menu.Name}</span>
                        <span
                          className="menu-arrow"
                          onClick={() => handleSubMenuClick(index)}
                        ></span>
                      </a>
                      <ul className="hidden hiddenSidebar">
                        {menu?.subMenu?.map((sub) => {
                          let subIsInArray = false;
                          sub.Permissions.forEach((per) => {
                            if (UserPer.includes(per.PermisionID)) {
                              subIsInArray = true;
                            }
                          });

                          // router.pathname == `${sub.Url}` ? "active" : ""
                          if (subIsInArray) {
                            return (
                              <li
                                className={`${
                                  activeSubMenu === index
                                    ? "subMenuOpen"
                                    : "hidden" && router.pathname == sub.Url
                                    ? "active"
                                    : ""
                                }`}
                                key={index}
                              >
                                <Link href={sub.Url} className="font-12">
                                  {sub.Name}
                                </Link>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
