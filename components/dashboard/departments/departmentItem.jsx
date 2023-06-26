import Image from "next/image";

const DepartmentItem = ({ data }) => {
  return (
    <div className="checkbox">
      <label className="checkbox-wrapper">
        <input type="checkbox" className="checkbox-input" />
        <div className="checkbox-tile">
          <span className="checkbox-icon"></span>

            <div className="checkbox-items">
                <img
                    src={"https://irannobat.ir/admin/assets/img/" + data.Icon}
                    alt=""
                    width="50px"
                    height="50px"
                />
                <span className="checkbox-label">{data.PerFullName}</span>
            </div>
            
        </div>
      </label>
    </div>
  );
};
export default DepartmentItem;
