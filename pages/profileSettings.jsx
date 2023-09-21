import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig";
import PasswordSettings from "components/adminProfile/passwordSettings";
import AvatarSettings from "components/adminProfile/avatarSettings";

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
        destination: `/login`,
      },
    };
  }
};

const ProfileSettings = ({ Menus, UserData, UserRoles }) => {
  console.log({ UserData, UserRoles });

  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");

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
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    $("#newPassValidationText1").hide();
    $("#newPassValidationText2").hide();
    getUserById();
  }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-6">
                <h4 className="page-title">تنظیمات پروفایل</h4>
              </div>
            </div>
          </div>
          <div className="settings-menu-links">
            <ul className="nav nav-tabs menu-tabs">
              <li className="nav-item active">
                <Link className="nav-link" href="/admin/settings">
                  تنظیمات اطلاعات حساب
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/email-settings">
                  Email Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Settings Menu */}
          <div className="row">
            <AvatarSettings UserData={UserData} />
            <PasswordSettings
              newPassword={newPassword}
              handleNewPassword={handleNewPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileSettings;
