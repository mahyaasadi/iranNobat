import FeatherIcon from "feather-icons-react";
import Image from "next/image";

const NavLink = ({ data, getServices }) => {
  return (
    <>
      <li className="nav-item">
        <a
          className="nav-link"
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
