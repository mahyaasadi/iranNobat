"use client"; // This is a client component
import Header from "components/dashboard/header";
import Sidebar from "components/dashboard/sidebar";

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

import Footer from "components/dashboard/footer/indeex";
