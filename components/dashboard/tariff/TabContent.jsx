import FeatherIcon from "feather-icons-react";
import Image from "next/image";

const TabContent = ({ data }) => {
  return (
    <>
      <div className="tab-pane" id={"Tab" + data._id}>
        {data.PerFullName}
      </div>
    </>
  );
};

export default TabContent;
