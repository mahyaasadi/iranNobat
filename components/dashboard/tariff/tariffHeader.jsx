import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import NavLink from "./NavLink";
import TabContent from "./TabContent";

const TariffHeader = ({ data, getServices, addService }) => {
  let counter = 1;
  // console.log(data);
  return (
    <>
      <div className="departmentsCategory w-100">
        <div className="categoryCard">
          <div className="card-body w-100">
            <ul className="nav nav-tabs nav-tabs-bottom nav-tabs-scroll font-14 padding-bottom-md">
              {data.map((nav, index) => {
                if (nav.Checked) {
                  if (counter++ === 1) {
                    return (
                      <NavLink
                        activeClass="active"
                        key={index}
                        data={nav}
                        getServices={getServices}
                      />
                    );
                  } else {
                    return (
                      <NavLink
                        activeClass=""
                        key={index}
                        data={nav}
                        getServices={getServices}
                      />
                    );
                  }
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
