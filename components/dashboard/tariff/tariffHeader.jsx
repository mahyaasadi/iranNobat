import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import NavLink from "./NavLink";
import TabContent from "./TabContent";

const TariffHeader = ({ data, getServices, addService }) => {
  return (
    <>
      <div className="departmentsCategory w-100">
        <div className="categoryCard">
          <div className="card-body w-100">
            <ul className="nav nav-tabs nav-tabs-solid">
              {data.map((nav, index) => {
                if (nav.Checked) {
                  return (
                    <NavLink key={index} data={nav} getServices={getServices} />
                  );
                }
              })}
            </ul>
            {/* <hr /> */}
            {/* <div className="tab-content">
              {data.map((nav) => {
                if (nav.Checked) {
                  return <TabContent data={nav} />;
                }
              })}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TariffHeader;
