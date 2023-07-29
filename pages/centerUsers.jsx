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

let CenterID = Cookies.get("CenterID");
let ActiveUserID = null;

const CenterUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [editedUserData, setEditedUserData] = useState([]);
  // const [activeState, setActiveState] = useState("active");
  // const toggleActivate = () => {
  //   setActiveState(!active);
  // };
  const [eye, setEye] = useState(true);

  const onEyeClick = () => setEye(!eye);

  // Get users data
  const getCenterUsers = () => {
    let url = `AdminUser/getCenterUsers/${CenterID}`;
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add new user
  const addUser = (e) => {
    e.preventDefault();

    let url = "AdminUser/addUser";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    let data = {
      CenterID,
      FullName: formProps.userFullName,
      NickName: formProps.userNickName,
      NID: formProps.userNID,
      Tel: formProps.userTel,
      User: formProps.addUserName,
      // Password: formProps.addUserPassword,
      // repeat: ? formProps.repeatUserPassword,
      Admin: formProps.adminRole,
      Secretary: formProps.secretaryRole,
    };
    setIsLoading(true);
    console.log(data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);

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
  const activateUser = async () => {
    let result = await QuestionAlert(
      "فعال سازی کاربر!",
      "؟آیا از فعال سازی کاربر مطمئن هستید"
    );

    if (result) {
      let url = "AdminUser/ActiveUser";
      // let data = {
      //   UserID: ActiveUserID,
      // };

      setIsLoading(true);

      await axiosClient
        .put(url, data)
        .then((response) => {
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Deactivate user
  const deActivateUser = async () => {
    let result = await QuestionAlert(
      "غیر فعال سازی کاربر!",
      "؟آیا از غیر فعال سازی کاربر مطمئن هستید"
    );

    if (result) {
      let url = "AdminUser/deActiveUser";
      // let data = {
      //   UserID: ActiveUserID,
      // };

      setIsLoading(true);

      await axiosClient
        .put(url, data)
        .then((response) => {
          console.log(response.data);
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
      // Password: formProps.editUserPassword,
      // repeat: ? formProps.editRepaetUserPassword
      Admin: formProps.adminRole,
      Secretary: formProps.secretaryRole,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        updateItem(formProps.editUserId, response.data);
        $("#editDiscountModal").modal("hide");
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
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <UsersListTable
                    data={userData}
                    updateUserInfo={updateUserInfo}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddUserModal eye={eye} onEyeClick={onEyeClick} addUser={addUser} />

        <EditUserModal data={editedUserData} editUserInfo={editUserInfo} eye={eye} onEyeClick={onEyeClick}/>
      </div>
    </>
  );
};

export default CenterUsers;
