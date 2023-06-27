import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import Loading from "components/loading/loading";
import DepartmentsList from "components/dashboard/departments/departmentsList";

let CenterID = Cookies.get("CenterID");

const Departments = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const SubmitFrmSetDepartment = (e) => {
    e.preventDefault();

    let data = $(".checkbox-input:checked").serialize();
    data = data.split("&");
    let selectedDepartments = [];

    data.map((dep) => {
      let depId = dep.replace("Dep=", "");
      var foundIndex = departmentsData.findIndex((x) => x._id == depId);
      selectedDepartments.push(foundIndex);
      let arr = departmentsData[foundIndex];
      arr.Checked = 1;
      departmentsData[foundIndex] = arr;
    });

    departmentsData.forEach((dep, index) => {
      if (!selectedDepartments.includes(index)) {
        let arr = departmentsData[index];
        arr.Checked = 0;
        departmentsData[index] = arr;
      }
    });

    console.log("selectedDepartments", selectedDepartments);

    let url = "https://irannobat.ir:8444/api/Center/SetDepartments";
    let PostData = {
      CenterID: CenterID,
      Departments: departmentsData,
    };

    axios
      .post(url, PostData)
      .then((response) => {
        Swal.fire({
          title: " موفق !",
          text: "ذخیره اطلاعات با موفقیت انجام گردید",
          icon: "success",
          confirmButtonColor: "#0db1ca",
          confirmButtonText: "تایید",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("departmentsData", departmentsData);
  };

  //get departments
  const getDepartments = () => {
    let UrlGetDep = `https://irannobat.ir:8444/api/Center/GetDepartments/${CenterID}`;
    axios.get(UrlGetDep).then(function (response) {
      if (response.data) {
        setIsLoading(false);
        setDepartmentsData(response.data);
      } else {
        getModality();
      }
    });
  };

  function getModality() {
    let url = "https://irannobat.ir:8444/api/Modality/getAll";
    setIsLoading(true);
    axios.get(url).then(function (response) {
      setIsLoading(false);
      setDepartmentsData(response.data);
    });
  }

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
          <form
            className="SubmitDepartmentForm"
            onSubmit={SubmitFrmSetDepartment}
          >
            <div className="box-container">
              {isLoading ? (
                <Loading />
              ) : (
                <DepartmentsList departmentsData={departmentsData} />
              )}
            </div>
            <div className="submitDepartments-btn">
              <button className="btn btn-primary submitDepartments">ثبت</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Departments;
