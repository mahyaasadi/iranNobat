"use client";
import Header from "components/commonComponents/header";
import Sidebar from "components/commonComponents/sidebar";

export default function DashboardLayout({
  children,
  Menus,
  UserData,
  UserRoles,
}) {
  return (
    <div>
      <Header UserData={UserData} className="pb-2" />
      <Sidebar Menus={Menus} UserData={UserData} UserRoles={UserRoles} />
      {children}
      <Footer />
    </div>
  );
}

import Footer from "components/commonComponents/footer";
