import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig";
import { SuccessAlert, ErrorAlert } from "class/AlertManage"
import PasswordSettings from "components/adminProfile/passwordSettings";
import AvatarSettings from "components/adminProfile/avatarSettings";
import GeneralUserInfoSettings from "components/adminProfile/generalUserInfoSettings"

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

const ProfileSettings = ({ Menus, UserData, UserRoles }) => {
  console.log({ UserData, UserRoles });

  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const handleNewPassword = (e) => setNewPassword(e.target.value);

  const getUserById = () => {
    setIsLoading(true);

    let url = "AdminUser/getUserById";
    let data = {
      UserID: UserData._id,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log("userInfo", response.data);
        setUserInfo(response.data)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const editGeneralUserInfo = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    ActiveUserID = formProps.userId;

    let url = "AdminUser/updateUser";
    let data = {
      CenterID: formProps.centerId,
      UserID: formProps.userId,
      FullName: formProps.editUserFullName,
      NickName: formProps.editUserNickName,
      Tel: formProps.editUserTel,
      User: formProps.editUserName,
    };

    console.log({ data });

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        setUserInfo({
          FullName: response.data.FullName,
          NickName: response.data.NickName,
          Tel: response.data.Tel,
          User: formProps.editUserName,
        })

        SuccessAlert("موفق", "ویرایش اطلاعات با موفقیت انجام گرفت!")
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!")
      });
  }

  const editUserPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "UserAdmin/ChangePassword";
    let data = {
      UserID: formProps.userId,
      Password: formProps.currentPassword,
      NewPassword: newPassword,
    }

    console.log({ data });

    axiosClient.put(url, data)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        SuccessAlert("موفق", "رمز عبور با موفقیت تغییر پیدا کرد!")
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "تغییر رمز عبور با خطا مواجه گردید!")
      })
  }

  // Convert imageUrl to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  // Upload new avatar
  // let newAvatar = null;
  // const changeUserAvatar = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   let formData = new FormData(e.target);
  //   const formProps = Object.fromEntries(formData);

  //   if (formProps.editUserAvatar && formProps.editUserAvatar.size != 0) {
  //     newAvatar = await convertBase64(formProps.editUserAvatar);

  //     let url = "AdminUser/ChangeAvaatar";
  //     let data = {
  //       // CenterID: CenterID,
  //       UserID: formProps.userId,
  //       Avatar: newAvatar,
  //     };

  //     console.log({ data });

  //     axiosClient.put(url, data)
  //       .then((response) => {
  //         console.log(response.data);
  //         setIsLoading(false)
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setIsLoading(false)
  //       })
  //   }
  // }


  let changeUserAvatar = async (formData) => {
    setIsLoading(true);

    const formProps = Object.fromEntries(formData);

    if (formProps.editUserAvatar) {
      let avatarBlob;
      // if (typeof formProps.editUserAvatar === 'string') { // Check if it's a Base64 string
      avatarBlob = await convertBase64(formProps.editUserAvatar);
      // } else {
      //   avatarBlob = formProps.editUserAvatar;  // It's a blob
      // }

      let url = "AdminUser/ChangeAvatar";
      let data = {
        // CenterID: CenterID,
        UserID: formProps.userId,
        Avatar: avatarBlob,
      };

      console.log({ data });

      axiosClient.put(url, data)
        .then((response) => {
          console.log(response.data);
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        })
    }
  }


  useEffect(() => {
    $("#newPassValidationText1").hide();
    $("#newPassValidationText2").hide();
    getUserById();
  }, []);
  2
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body padding-2">
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-17 text-secondary marginb-md1">تنظیمات پروفایل</p>
                  </div>
                </div>
              </div>

              <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#solid-rounded-tab1"
                    data-bs-toggle="tab"
                  >
                    اطلاعات حساب
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#solid-rounded-tab2"
                    data-bs-toggle="tab"
                  >
                    رمز عبور
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane show active"
                  id="solid-rounded-tab1"
                >
                  <div className="row">

                    <GeneralUserInfoSettings userInfo={userInfo} UserData={UserData} editGeneralUserInfo={editGeneralUserInfo} isLoading={isLoading} />
                    <AvatarSettings UserData={UserData} changeUserAvatar={changeUserAvatar} isLoading={isLoading} />
                  </div>

                </div>
                <div className="tab-pane" id="solid-rounded-tab2">
                  <PasswordSettings
                    newPassword={newPassword}
                    handleNewPassword={handleNewPassword}
                    editUserPassword={editUserPassword}
                    userInfo={userInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
