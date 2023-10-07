"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Sidebar = ({ Menus, UserData, UserRoles }) => {
  const router = useRouter();
  // console.log({ Menus });

  const [openSubMenu, setOpenSubMenu] = useState(null);

  function extractPermissionIds(a) {
    let arr = [];
    a.map((role) => {
      arr.push(role.PermisionID._id);
    });
    return arr;
  }

  const UserPer = extractPermissionIds(UserRoles.PermisionsID);

  useEffect(() => {
    Menus?.forEach((menu, index) => {
      menu?.subMenu?.forEach((sub) => {
        if (router.pathname === sub.Url) {
          setOpenSubMenu(menu.Name);
        }
      });
    });
  }, [Menus, router.pathname]);

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
                menu.Permissions?.forEach((per) => {
                  if (UserPer.includes(per.PermisionID)) isInArray = true;
                });

                if (isInArray) {
                  return (
                    <li className="submenu" key={index}>
                      <a
                        href={menu.Url}
                        onClick={() =>
                          setOpenSubMenu(
                            menu.Name !== openSubMenu ? menu.Name : null
                          )
                        }
                      >
                        <FeatherIcon icon={menu.Icon} className="width-15" />
                        <span>{menu.Name}</span>
                        <span className="menu-arrow"></span>
                      </a>
                      <ul
                        className={`hiddenSidebar ${menu.Name === openSubMenu ? "d-block" : "hidden"
                          }`}
                      >
                        {menu?.subMenu?.map((sub) => {
                          let subIsInArray = false;
                          sub.Permissions?.forEach((per) => {
                            if (UserPer.includes(per.PermisionID)) {
                              subIsInArray = true;
                            }
                          });

                          if (subIsInArray) {
                            return (
                              <li
                                className={`${router.pathname == sub.Url ? "active" : ""
                                  }`}
                                key={sub._id}
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
