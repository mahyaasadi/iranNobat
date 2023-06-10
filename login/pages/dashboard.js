"use client"; // This is a client component
import DashboardContent from "components/Content/DashboardContent";
import Header from "components/Header/Header"
import Sidebar from "components/Sidebar/Sidebar"

export default function Dashboard() {
  return (
    <div>
      <DashboardContent />
    </div>
  );
}

Dashboard.getLayout = function getLayout(content) {
  return (
    <div>
      <Header />{content}<Sidebar />
    </div>
  )
}