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

let CenterID = Cookies.get("CenterID");
let ActiveUserID = null;

const CenterUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [editedUserData, setEditedUserData] = useState([]);
  const [activeState, setActiveState] = useState(null);
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

  function validateForm() {
    if (password.length < 8) {
      alert(
        "Invalid Form, Password must contain greater than or equal to 8 characters."
      );
      return;
    }

    // variable to count upper case characters in the password.
    let countUpperCase = 0;
    // variable to count lowercase characters in the password.
    let countLowerCase = 0;
    // variable to count digit characters in the password.
    let countDigit = 0;
    // variable to count special characters in the password.
    let countSpecialCharacters = 0;

    for (let i = 0; i < password.length; i++) {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "[",
        "{",
        "]",
        "}",
        ":",
        ";",
        "<",
        ">",
      ];

      if (specialChars.includes(password[i])) {
        // this means that the character is special, so increment countSpecialCharacters
        countSpecialCharacters++;
      } else if (!isNaN(password[i] * 1)) {
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

    if (countLowerCase == 0) {
      // invalid form, 0 lowercase characters
      alert("Invalid Form, 0 lower case characters in password");
      return;
    }

    if (countUpperCase == 0) {
      // invalid form, 0 upper case characters
      alert("Invalid Form, 0 upper case characters in password");
      return;
    }

    if (countDigit == 0) {
      // invalid form, 0 digit characters
      alert("Invalid Form, 0 digit characters in password");
      return;
    }

    if (countSpecialCharacters == 0) {
      // invalid form, 0 special characters characters
      alert("Invalid Form, 0 special characters in password");
      return;
    }

    alert("Form is valid");
  }

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
      Password: formProps.addUserPassword,
      // ConfirmPassword: formProps.confirmPassword,
      // Admin: formProps.adminRole,
      // Secretary: formProps.secretaryRole,
    };

    let passValue = $("#addUserPassword").val();
    let confpassValue = $("#confirmPassword").val();

    if (passValue !== confpassValue) {
      window.alert("رمز عبور باید در هر دو فیلد تطابق داشته باشد!");
    }

    console.log(data);
    validateForm();

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

  const ChangeActiveUser = (id, type) => {
    let findUser = userData.find((x) => x._id === id);
    findUser.Deactive = type;
    let findIndex = userData.findIndex((x) => x._id === id);
    userData[findIndex] = findUser;
    setUserData(userData);
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
      Deactive: activeState,
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
          Deactive: activeState,
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
                    activeState={activeState}
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
        />
        <EditUserModal
          data={editedUserData}
          editUserInfo={editUserInfo}
          eye={eye}
          onEyeClick={onEyeClick}
        />

        <ChatPermissionModal />
      </div>
    </>
  );
};

export default CenterUsers;
