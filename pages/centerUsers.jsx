import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosClient } from "class/axiosConfig.js";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/loading/loading";
import UsersListTable from "components/dashboard/centerUsers/usersListTable/usersListTable";
import AddUserModal from "components/dashboard/centerUsers/addUserModal/addUserModal";
import EditUserModal from "components/dashboard/centerUsers/editUserModal/editUserModal";
import ChatPermissionModal from "components/dashboard/centerUsers/chatPermissionModal/chatPermissionModal";
import UserPermissionModal from "components/dashboard/centerUsers/userPermissionModal/userPermissionModal";

let CenterID = Cookies.get("CenterID");
let ActiveUserID = null;

const CenterUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [editedUserData, setEditedUserData] = useState([]);
  const [password, setPassword] = useState("");

  const [eye, setEye] = useState(true);
  const onEyeClick = () => setEye(!eye);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Get users data
  const getCenterUsers = () => {
    let url = `AdminUser/getCenterUsers/${CenterID}`;
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        // setActiveState(response.data.Deactive);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const enableSubmit = (e) => {
    e.preventDefault();

    let countUpperCase = 0;
    let countLowerCase = 0;
    let countDigit = 0;

    let formData = new FormData(document.getElementById("addUserFrm"));
    const formProps = Object.fromEntries(formData);
    let passValue = $("#addUserPassword").val();
    let confpassValue = $("#confirmPassword").val();

    for (let i = 0; i < password.length; i++) {
      if (!isNaN(password[i] * 1)) {
        // this means that the character is a digit, so increment countDigit
        countDigit++;
      } else {
        if (password[i] == password[i].toUpperCase()) {
          // this means that the character is an upper case character, so increment countUpperCase
          countUpperCase++;
        }
        if (password[i] == password[i].toLowerCase()) {
          // this means that the character is lowercase, so increment countUpperCase
          countLowerCase++;
        }
      }
    }

    // password length
    if (password.length < 8) {
      $("#formValidationText").show();
      $("#submitUserBtn").attr("disabled", true);
      return;
    } else {
      $("#formValidationText").hide();
      $("#submitUserBtn").attr("disabled", false);
    }
    // lower and uppercase letters included
    if (countLowerCase == 0 || countUpperCase == 0 || countDigit == 0) {
      $("#formValidationText1").show();
      $("#submitUserBtn").attr("disabled", true);
      return;
    } else {
      $("#formValidationText1").hide();
      $("#submitUserBtn").attr("disabled", false);
    }
    // confirm password validation
    if (passValue !== confpassValue) {
      $("#formValidationText2").show();
      $("#submitUserBtn").attr("disabled", true);
    } else {
      $("#formValidationText2").hide();
      $("#submitUserBtn").attr("disabled", false);
    }
  };

  // Add new user
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
      // ConfirmPassword: formProps.confirmPassword,
      // Admin: formProps.adminRole,
      // Secretary: formProps.secretaryRole,
    };

    console.log(data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setUserData([...userData, response.data]);

        $("#addUserModal").modal("hide");
        setIsLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // change active state
  const ChangeActiveUser = (id, type) => {
    let findUser = userData.find((x) => x._id === id);
    findUser.Deactive = type;
    let findIndex = userData.findIndex((x) => x._id === id);
    userData[findIndex] = findUser;
    setUserData(userData);
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

      console.log(data);
      setIsLoading(true);

      await axiosClient
        .put(url, data)
        .then((response) => {
          console.log(response.data);
          ChangeActiveUser(id, false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
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

      setIsLoading(true);
      console.log(data);

      await axiosClient
        .put(url, data)
        .then((response) => {
          ChangeActiveUser(id, true);

          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  //edit user info
  const editUserInfo = (e) => {
    e.preventDefault();

    let url = "AdminUser/updateUser";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    ActiveUserID = formProps.editUserId;

    let data = {
      CenterID,
      UserID: ActiveUserID,
      FullName: formProps.editUserFullName,
      NickName: formProps.editUserNickName,
      NID: formProps.editUserNID,
      Tel: formProps.editUserTel,
      User: formProps.editUserName,
      // Admin: formProps.editAdminRole,
      // Secretary: formProps.editSecretaryRole,
      // Password: formProps.editUserPassword,
      // repeat: ? formProps.editRepaetUserPassword
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        updateItem(formProps.editUserId, {
          FullName: formProps.editUserFullName,
          NickName: formProps.editUserNickName,
          NID: formProps.editUserNID,
          Tel: formProps.editUserTel,
          User: formProps.editUserName,
        });
        $("#editUserModal").modal("hide");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateItem = (id, newArr) => {
    let index = userData.findIndex((x) => x._id === id);

    let g = userData[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setUserData([
        ...userData.slice(0, index),
        g,
        ...userData.slice(index + 1),
      ]);
  };

  const updateUserInfo = (data) => {
    setEditedUserData(data);
    $("#editUserModal").modal("show");
  };

  const chatPermissionOpenModal = () => {
    $("#chatPermissionModal").modal("show");
  };

  const userPermissionOpenModal = () => {
    $("#userPermissionModal").modal("show");
  };

  useEffect(() => {
    getCenterUsers();
    $("#formValidationText").hide();
    $("#formValidationText1").hide();
    $("#formValidationText2").hide();
  }, []);

  return (
    <>
      <Head>
        <title>کاربران مرکز</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addUserModal"
                  className="btn btn-primary btn-add font-14 media-font-12"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
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

                {isLoading ? (
                  <Loading />
                ) : (
                  <UsersListTable
                    data={userData}
                    updateUserInfo={updateUserInfo}
                    activateUser={activateUser}
                    deActivateUser={deActivateUser}
                    chatPermissionOpenModal={chatPermissionOpenModal}
                    userPermissionOpenModal={userPermissionOpenModal}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
        <AddUserModal
          eye={eye}
          onEyeClick={onEyeClick}
          addUser={addUser}
          password={password}
          handlePassword={handlePassword}
          enableSubmit={enableSubmit}
        />
        <EditUserModal
          data={editedUserData}
          editUserInfo={editUserInfo}
          eye={eye}
          onEyeClick={onEyeClick}
        />

        <ChatPermissionModal />

        <UserPermissionModal />
      </div>
    </>
  );
};

export default CenterUsers;
