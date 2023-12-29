import { useState, useEffect } from "react";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, SuccessAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import UsersListTable from "components/dashboard/centerUsers/usersListTable";
import CenterUserModal from "components/dashboard/centerUsers/centerUserModal";
import ChatPermissionModal from "components/dashboard/centerUsers/chatPermissionModal";
import AssignRoleModal from "components/dashboard/centerUsers/assignRoleModal";
import { getSession } from "lib/session";
import { setSession } from "lib/SessionMange";
import Cookies from "js-cookie";

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

let ActiveUserID,
  CenterID = null;
const CenterUsers = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [editUserData, setEditUserData] = useState([]);
  const [password, setPassword] = useState("");
  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showModal, setShowModal] = useState(false);
  const [showValidationText1, setShowValidationText1] = useState(false);
  const [showValidationText2, setShowValidationText2] = useState(false);
  const [showValidationText3, setShowValidationText3] = useState(false);
  const [showValidationText4, setShowValidationText4] = useState(false);
  const [departmentsCheckboxStatus, setDepartmentsCheckboxStatus] = useState({
    departmentsOptions: [],
  });
  const [diseasesCheckboxStatus, setDiseasesCheckboxStatus] = useState({
    diseasesOptions: [],
  });

  const [eye, setEye] = useState(true);
  const onEyeClick = () => setEye(!eye);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleCloseModal = () => setShowModal(false);

  let userRole = "";
  const FUSelectUserRole = (role) => (userRole = role);

  // Get users data
  const getCenterUsers = () => {
    setIsLoading(true);
    let url = `AdminUser/getCenterUsers/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
      });
  };

  // Add new user
  const resetAlerts = () => {
    setShowValidationText1(false);
    setShowValidationText2(false);
    setShowValidationText3(false);
    setShowValidationText4(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
    resetAlerts();
  };

  const addUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "AdminUser/addUser";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      CenterID,
      FullName: formProps.userFullName,
      NickName: formProps.userNickName,
      NID: formProps.userNID,
      Tel: formProps.userTel,
      User: formProps.addUserName,
      Password: password,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setUserData([...userData, response.data]);

        setModalMode(false);
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // change active state
  const changeActiveUser = (id, type) => {
    let findUser = userData.find((x) => x._id === id);
    findUser.Deactive = type;
    let findIndex = userData.findIndex((x) => x._id === id);
    userData[findIndex] = findUser;
    setUserData(userData);
    getCenterUsers();
  };

  // Activate user
  const activateUser = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت غیر فعال کاربر!",
      "آیا از فعال کردن کاربر اطمینان دارید؟"
    );

    if (result) {
      let url = "AdminUser/ActiveUser";
      let data = {
        UserID: id,
      };

      await axiosClient
        .put(url, data)
        .then((response) => {
          changeActiveUser(id, false);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش وضعیت کاربر با خطا مواجه گردید!");
        });
    }
  };

  // Deactivate user
  const deActivateUser = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت فعال کاربر!",
      "آیا از غیر فعال کردن کاربر اطمینان دارید؟"
    );

    if (result) {
      let url = "AdminUser/deActiveUser";
      let data = {
        UserID: id,
      };

      await axiosClient
        .put(url, data)
        .then((response) => {
          changeActiveUser(id, true);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش وضعیت کاربر با خطا مواجه گردید!");
        });
    }
  };

  //edit user info
  const editUserInfo = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    ActiveUserID = formProps.editUserId;

    let url = "AdminUser/updateUser";
    let data = {
      CenterID,
      UserID: ActiveUserID,
      FullName: formProps.editUserFullName,
      NickName: formProps.editUserNickName,
      NID: formProps.editUserNID,
      Tel: formProps.userTel,
      User: formProps.editUserName,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateItem(formProps.editUserId, {
          FullName: formProps.editUserFullName,
          NickName: formProps.editUserNickName,
          NID: formProps.userNID,
          Tel: formProps.userTel,
          User: formProps.editUserName,
        });

        setModalMode(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateItem = (id, newArr) => {
    let index = userData.findIndex((x) => x._id === id);
    let g = userData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setUserData([
        ...userData.slice(0, index),
        g,
        ...userData.slice(index + 1),
      ]);
  };

  const updateUserInfo = (data) => {
    setModalMode("edit");
    setEditUserData(data);
    setShowModal(true);
    resetAlerts();
  };

  const userPermissionOpenModal = () => $("#userPermissionModal").modal("show");

  const assignRoleModal = (id) => {
    ActiveUserID = id;
    $("#assignRoleToUserModal").modal("show");
  };

  const assignRole = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "/AdminUser/setUserRoles";
    let data = {
      CenterID: CenterID,
      UserID: ActiveUserID,
      roleID: formProps.assignUserRole,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        SuccessAlert("موفق", "نقش کاربر با موفقیت ثبت گردید!");
        $("#assignRoleToUserModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // ------ chatPermission ---------

  const chatPermissionOpenModal = (id, depPer, diseasePer) => {
    $("#chatPermissionModal").modal("show");
    ActiveUserID = id;
    setDepartmentsCheckboxStatus({ departmentsOptions: depPer });
    setDiseasesCheckboxStatus({ diseasesOptions: diseasePer });
  };

  const handleCheckedDepChatPermission = (e) => {
    const { value, checked } = e.target;
    const { departmentsOptions } = departmentsCheckboxStatus;

    // console.log(`${value} is ${checked}`);

    checked
      ? setDepartmentsCheckboxStatus((prevState) => ({
        departmentsOptions: [...prevState.departmentsOptions, value],
      }))
      : setDepartmentsCheckboxStatus((prevState) => ({
        departmentsOptions: prevState.departmentsOptions.filter(
          (e) => e !== value
        ),
      }));
  };

  const handleCheckedDiseaseChatPermission = (e) => {
    const { value, checked } = e.target;
    const { diseasesOptions } = diseasesCheckboxStatus;

    console.log(`${value} is ${checked}`);

    checked
      ? setDiseasesCheckboxStatus({
        diseasesOptions: [...diseasesOptions, value],
      })
      : setDiseasesCheckboxStatus({
        diseasesOptions: diseasesOptions.filter((e) => e !== value),
      });
  };

  const submitChatPermissions = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "AdminUser/SetUserChatPermision";
    let data = {
      UserID: ActiveUserID,
      DepIDs: departmentsCheckboxStatus.departmentsOptions,
      SpecialDiseasesPer: diseasesCheckboxStatus.diseasesOptions,
    };

    console.log({ data });

    axiosClient
      .post(url, data)
      .then((response) => {
        const selectedDepIds = response.data.DepIDs;
        const selectedDiseaseIds = response.data.SpecialDiseasesPer;
        setDepartmentsCheckboxStatus({ departmentsOptions: selectedDepIds });
        setDiseasesCheckboxStatus({ diseasesOptions: selectedDiseaseIds });

        getCenterUsers();
        $("#chatPermissionModal").modal("hide");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCenterUsers();
  }, []);

  return (
    <>
      <Head>
        <title>کاربران مرکز</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end">
                  <button
                    onClick={openAddModal}
                    className="btn btn-primary btn-add font-14 media-font-12"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    اضافه کردن
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست کاربران</h5>
                      </div>

                      <div className="col-auto d-flex flex-wrap">
                        <div className="form-custom me-2">
                          <div
                            id="tableSearch"
                            className="dataTables_wrapper"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <UsersListTable
                    data={userData}
                    updateUserInfo={updateUserInfo}
                    activateUser={activateUser}
                    deActivateUser={deActivateUser}
                    chatPermissionOpenModal={chatPermissionOpenModal}
                    userPermissionOpenModal={userPermissionOpenModal}
                    assignRoleModal={assignRoleModal}
                    assignRole={assignRole}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <CenterUserModal
          mode={modalMode}
          show={showModal}
          onHide={handleCloseModal}
          isLoading={isLoading}
          data={editUserData}
          onSubmit={modalMode == "add" ? addUser : editUserInfo}
          password={password}
          handlePassword={handlePassword}
          eye={eye}
          onEyeClick={onEyeClick}
          showValidationText1={showValidationText1}
          showValidationText2={showValidationText2}
          showValidationText3={showValidationText3}
          showValidationText4={showValidationText4}
          setShowValidationText1={setShowValidationText1}
          setShowValidationText2={setShowValidationText2}
          setShowValidationText3={setShowValidationText3}
          setShowValidationText4={setShowValidationText4}
        />

        <ChatPermissionModal
          CenterID={CenterID}
          submitChatPermissions={submitChatPermissions}
          checkedDepartments={departmentsCheckboxStatus.departmentsOptions}
          checkedDiseases={diseasesCheckboxStatus.diseasesOptions}
          handleCheckedDepChatPermission={handleCheckedDepChatPermission}
          handleCheckedDiseaseChatPermission={
            handleCheckedDiseaseChatPermission
          }
        />

        <AssignRoleModal
          FUSelectUserRole={FUSelectUserRole}
          assignRole={assignRole}
          CenterID={CenterID}
        />
      </div>
    </>
  );
};

export default CenterUsers;
