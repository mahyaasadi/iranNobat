import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "components/loading/loading"
import DepartmentsList from "components/dashboard/departments/departmentsList"

const Departments = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  //get departments
  const getDepartments = () => {
    let url = "https://irannobat.ir:8444/api/Modality/getAll";
    setIsLoading(true)

    axios.get(url).then(function (response) {
      setIsLoading(false)
      setDepartmentsData(response.data);
      console.log(departmentsData)
    });
  };

  useEffect(() => {
    try {
      getDepartments();
    } catch (error) {
      console.log(error);
      setIsLoading(true)
    }
  }, []);

  return (
    <div>
      <fieldset className="checkbox-group">
        <legend className="checkbox-group-legend">
          بخش مورد نظر را انتخاب فرمائید
        </legend>
        <div className="box-container">

          {isLoading ? <Loading /> : (
            <DepartmentsList departmentsData={departmentsData} />
          )}

          {/* <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label">text</span>
              </span>
            </label>
          </div> */}

          {/* <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div> */}
        </div>

        {/*  */}
        {/* <div className="box-container">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>

          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>
        </div> */}

        {/*  */}
        {/* <div className="box-container">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>

          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>
        </div> */}

        {/*  */}
        {/* <div className="box-container">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>

          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-tile">
                <span className="checkbox-icon"></span>
                <span className="checkbox-label"></span>
              </span>
            </label>
          </div>
        </div> */}
      </fieldset>
    </div>
  );
};
export default Departments;
