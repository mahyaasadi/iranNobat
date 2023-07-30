import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/loading/loading";
import { SuccessAlert } from "class/AlertManage.js";
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

    let url = "Center/SetDepartments";
    let PostData = {
      CenterID: CenterID,
      Departments: departmentsData,
    };

    axiosClient
      .post(url, PostData)
      .then((response) =>
        SuccessAlert("موفق !", "ذخیره اطلاعات با موفقیت انجام گردید")
      )
      .catch((error) => {
        console.log(error);
      });
    // console.log("departmentsData", departmentsData);
  };

  //get departments
  const getDepartments = () => {
    let UrlGetDep = `Center/GetDepartments/${CenterID}`;
    axiosClient.get(UrlGetDep).then(function (response) {
      if (response.data) {
        setIsLoading(false);
        console.log(response.data)
        setDepartmentsData(response.data);
      } else {
        getModality();
      }
    });
  };

  function getModality() {
    let url = "Modality/getAll";
    setIsLoading(true);
    axiosClient.get(url).then(function (response) {
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
    <>
      <Head>
        <title>انتخاب بخش</title>
      </Head>
      <div className="page-wrapper font-13">
        <div className="content container-fluid">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="departments-container">
              <div className="checkbox-group-legend">
                بخش مورد نظر را انتخاب نمایید
              </div>

              <form
                className="SubmitDepartmentForm"
                onSubmit={SubmitFrmSetDepartment}
              >
                <div className="box-container">
                  <DepartmentsList departmentsData={departmentsData} />
                </div>
                <div className="submitDepartments-btn">
                  <button className="btn btn-primary submitDepartments">
                    ثبت
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Departments;
