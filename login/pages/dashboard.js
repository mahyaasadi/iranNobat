"use client"; // This is a client component
import DashboardContent from "pages/DashboardContent";
import Header from "components/Dashboard/Header";
import Sidebar from "components/Dashboard/Sidebar";
export default function Dashboard({ children }) {
  return (
    <div>
      {/* <DashboardContent /> */}
      <Header className="pb-12" />
      {children}
      <Sidebar />
      <Footer />
    </div>
  );
}

// Dashboard.getLayout = function getLayout(content) {
//   return (
//     <div>
//       <Header className="pb-12" />
//       {content}
//       <Sidebar />
//       <Footer />
//     </div>
//   );
// };

import Footer from "components/Dashboard/Footer";
