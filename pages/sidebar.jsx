// import { axiosClient } from "class/axiosConfig.js";
// import { useState, useEffect } from "react";
// import "public/assets/css/font-awesome.min.css";
// import "public/assets/css/feathericon.min.css";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import FeatherIcon from "feather-icons-react";

// // export const getServerSideProps = async () => {
// //   const res = await fetch("https://api.irannobat.ir/InoMenu/getAll");
// //   const initialMenus = await res.json();
// //   return { props: { initialMenus: [] } };
// // };

// const Sidebar = ({ initialMenus }) => {
//   const router = useRouter();

//   const [menuList, setMenuList] = useState(initialMenus);
//   console.log({ initialMenus });

//   // get menu list
//   // const getMenuData = () => {
//   //   let url = "InoMenu/getAll";

//   //   axiosClient
//   //     .get(url)
//   //     .then((response) => {
//   //       setMenuList(response.data);
//   //       console.log("menuList", response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };

//   // const getMenuData = async () => {
//   //   // let url = "";

//   //   await fetch("https://api.irannobat.ir/InoMenu/getAll")
//   //     // Handle success
//   //     .then((response) => response.json())
//   //     .then((json) => {
//   //       console.log({ json });
//   //       setMenuList(json);
//   //       setTimeout(() => {
//   //         init();

//   //       }, 100);
//   // })
//   //     .catch((err) => console.log(err));
//   // };

//   // useEffect(() => {
//   //   getMenuData();
//   // }, []);

//   return (
//     <>
//       <div className="sidebar" id="sidebar">
//         <div className="sidebar-inner slimscroll">
//           <div id="sidebar-menu" className="sidebar-menu">
//             <ul>
//               <li className="menu-title">
//                 <span>اصلی</span>
//               </li>
//               <li className={router.pathname == "/dashboard" ? "active" : ""}>
//                 <Link href="/dashboard">
//                   <i>
//                     <FeatherIcon icon="home" />
//                   </i>
//                   <span>داشبورد</span>
//                 </Link>
//               </li>

//               <li className="submenu">
//                 <a href="#">
//                   <i>
//                     <FeatherIcon icon="settings" className="width-15" />
//                   </i>
//                   <span>تنظیمات مرکز</span>
//                   <span className="menu-arrow"></span>
//                 </a>
//                 <ul className="hidden hiddenSidebar">
//                   <li className={router.pathname == "/doctors" ? "active" : ""}>
//                     <Link href="/doctors" className="font-12">
//                       پزشکان
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               {menuList?.map((menu, index) => (
//                 <li className="submenu" key={index}>
//                   <a href={menu.Url}>
//                     <i>
//                       <FeatherIcon icon={menu.Icon} className="width-15" />
//                     </i>
//                     <span>{menu.Name}</span>
//                     <span className="menu-arrow"></span>
//                   </a>
//                   <ul className="hidden hiddenSidebar">
//                     {menu?.subMenu?.map((sub, index) => (
//                       <li
//                         key={index}
//                         className={
//                           router.pathname == `${sub.Url}` ? "active" : ""
//                         }
//                       >
//                         <Link href={sub.Url} className="font-12">
//                           {sub.Name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
