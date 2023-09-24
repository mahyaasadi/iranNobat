import { useState, useEffect } from "react";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/commonComponents/loading/loading";
import { SuccessAlert, ErrorAlert } from "class/AlertManage.js";
import DepartmentsList from "components/dashboard/departments/departmentsList";
import { getSession } from "lib/session";

export const getServerSideProps = async ({ req, res }) => {
  const result = await getSession(req, res);

  if (result) {
    const { UserData, UserRoles } = result;
    const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
    const Menus = await data.json();
    return { props: { Menus, UserData, UserRoles } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

let CenterID = null;
const Departments = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [departmentsData, setDepartmentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const SubmitFrmSetDepartment = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      .then((response) => {
        SuccessAlert("موفق !", "ذخیره اطلاعات با موفقیت انجام گردید");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ثبت بخش ها ی انتخابی با خطا مواجه گردید!");
      });
  };

  //get departments
  const getDepartments = () => {
    setIsLoading(true);
    let url = `Center/GetDepartments/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setDepartmentsData(response.data);
        } else {
          getModality();
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getModality = () => {
    let url = "Modality/getAll";

    axiosClient
      .get(url)
      .then((response) => setDepartmentsData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDepartments();
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
                <div className="submitDepartments-btn d-flex justify-center w-100">
                  <button className="btn btn-sm btn-secondary submitDepartments rounded col-lg-4 col-7">
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
