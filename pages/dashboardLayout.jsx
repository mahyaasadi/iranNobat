"use client"; // This is a client component
import Header from "components/commonComponents/header";
import MenusInfo from "src/app/menusInfo";

export default function DashboardLayout({ children, Menus }) {
  return (
    <div>
      <Header className="pb-2" />
      <MenusInfo />
      {children}
      <Footer />
    </div>
  );
}

import Footer from "components/commonComponents/footer";
