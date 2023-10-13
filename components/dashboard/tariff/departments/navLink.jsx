import { useEffect } from "react";

const NavLink = ({ data, getServices, activeClass }) => {
  useEffect(() => {
    if (activeClass == "active") {
      getServices(data._id, data.PerFullName);
    }
  }, [activeClass]);

  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link ServiceNav " + activeClass}
          data-bs-toggle="tab"
          data-bs-target={"#Tab" + data._id}
          onClick={() => getServices(data._id, data.PerFullName)}
        >
          {data.PerFullName}
        </a>
      </li>
    </>
  );
};

export default NavLink;
