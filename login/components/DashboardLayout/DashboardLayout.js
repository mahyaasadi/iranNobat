"use client"; // This is a client component
import Header from "../Header/Header";
// import Sidebar from "../Sidebar";
// import Content from "../Content";
import "../../src/assets/img/favicon.png";
import "../../src/assets/css/bootstrap.rtl.min.css";
import "../../src/assets/css/font-awesome.min.css";
import "../../src/assets/css/feathericon.min.css";
import "../../src/assets/plugins/morris/morris.css";
import "../../src/assets/css/style.css";

export default function DashboardLayout() {
  return (
    <div class="main-wrapper">
      <Header />
    </div>
  );
}
