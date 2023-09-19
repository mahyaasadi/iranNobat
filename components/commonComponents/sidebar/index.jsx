"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Sidebar = ({ Menus, UserData, UserRoles }) => {
  const router = useRouter();

  const [menuList, setMenuList] = useState(Menus);

  function transpose(a) {
    let arr = [];
    a.map((role) => {
      arr.push(role.PermisionID._id);
    });
    return arr;
  }

  const UserPer = transpose(UserRoles.PermisionsID);

  console.log({ UserPer });
  console.log({ Menus });

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

              {menuList?.map((menu, index) => {
                let isInArray = false;
                menu.Permissions.forEach((per) => {
                  if (UserPer.includes(per.PermisionID)) {
                    isInArray = true;
                  }
                });

                if (isInArray) {
                  return (
                    <li className="submenu" key={index}>
                      <a href={menu.Url}>
                        <FeatherIcon icon={menu.Icon} className="width-15" />
                        <span>{menu.Name}</span>
                        <span className="menu-arrow"></span>
                      </a>
                      <ul className="hidden hiddenSidebar">
                        {menu?.subMenu?.map((sub, index) => {
                          let subIsInArray = false;
                          sub.Permissions.forEach((per) => {
                            if (UserPer.includes(per.PermisionID)) {
                              subIsInArray = true;
                            }
                          });

                          if (subIsInArray) {
                            return (
                              <li
                                key={index}
                                className={
                                  router.pathname == `${sub.Url}`
                                    ? "active"
                                    : ""
                                }
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
