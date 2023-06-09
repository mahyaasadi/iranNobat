import Image from "next/image";
import logo from "../../src/assets/img/logo.png";
import logoSmall from "../../src/assets/img/logo-small.png";

const Header = () => {
  return (
    <div>
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
  )
};

export default Header;
