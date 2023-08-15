"use client"; // This is a client component
import Header from "components/commonComponents/header";
import Sidebar from "components/commonComponents/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header className="pb-2" />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}

import Footer from "components/commonComponents/footer";
