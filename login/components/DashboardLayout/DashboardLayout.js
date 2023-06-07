"use client"; // This is a client component
// import Header from "../Header";
// import Sidebar from "../Sidebar";
// import Content from "../Content";
import Image from "next/image";
import "../../src/assets/img/favicon.png";
import "../../src/assets/css/bootstrap.rtl.min.css";
import "../../src/assets/css/font-awesome.min.css";
import "../../src/assets/css/feathericon.min.css";
import "../../src/assets/plugins/morris/morris.css";
import "../../src/assets/css/style.css";
import logo from "../../src/assets/img/logo.png";
import logoSmall from "../../src/assets/img/logo-small.png";

export default function DashboardLayout() {
  return (
    <div class="main-wrapper">
      {/* <!-- Header --> */}
      <div class="header">
        {/* <!-- Logo --> */}
        <div class="header-left">
          <a href="index.html" class="logo">
            <Image src={logo} alt="Logo" width="80" height="80" />
          </a>
          <a href="index.html" class="logo logo-small">
            <Image src={logoSmall} alt="Logo" width="30" height="30" />
          </a>
        </div>
        {/* <!-- /Logo --> */}

        {/* <Header />
      <Content>
        <Sidebar />
      </Content> */}
      </div>
    </div>
  );
}
