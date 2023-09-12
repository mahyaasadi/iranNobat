import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useEffect } from "react";

const NavLink = ({ data, getServices, activeClass }) => {
  console.log({ activeClass });

  // useEffect(() => {
  //   if (activeClass == "active") {
  //     getServices(data._id, data.PerFullName);
  //   }
  // }, [activeClass]);

  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link ServiceNav " + activeClass}
          href={"#Tab" + data._id}
          data-bs-toggle="tab"
          onClick={() => getServices(data._id, data.PerFullName)}
        >
          {data.PerFullName}
        </a>
      </li>
    </>
  );
};

export default NavLink;
