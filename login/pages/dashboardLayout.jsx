"use client"; // This is a client component
import Header from "components/Dashboard/Header";
import Sidebar from "components/Dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header className="pb-12" />
      {children}
      <Sidebar />
      <Footer />
    </div>
  );
}

import Footer from "components/Dashboard/Footer";