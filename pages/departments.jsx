import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loading from "components/loading/loading";
import DepartmentsList from "components/dashboard/departments/departmentsList";

const Departments = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get departments
  const getDepartments = () => {
    let url = "https://irannobat.ir:8444/api/Modality/getAll";
    setIsLoading(true);

    axios.get(url).then(function (response) {
      setIsLoading(false);
      setDepartmentsData(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    try {
      getDepartments();
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }, []);

  return (
    <div className="departments-container">
      <div className="checkbox-group">
        <div className="submitHeader">
          <div className="checkbox-group-legend">
            بخش مورد نظر را انتخاب نمایید
          </div>
          <div>
            <Link href="#" className="btn btn-primary submitDepartments">
              ثبت
            </Link>
          </div>
        </div>

        <div className="box-container">
          {isLoading ? (
            <Loading />
          ) : (
            <DepartmentsList departmentsData={departmentsData} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Departments;
