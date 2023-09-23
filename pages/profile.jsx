import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig";
import { getSession } from "lib/session";

export const getServerSideProps = async ({ req, res }) => {
  const result = getSession(req, res);

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

const Profile = ({ Menus, UserData, UserRoles }) => {
  console.log({ UserData });
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);

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
        setUserInfo(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card profileCard p-4">
            <div className="card-body">
              <div className="profile-info">
                <p className="font-17 text-secondary fw-bold ">پروفایل من</p>
                <hr className="marginb-md1" />
                <div className="profile-list">
                  <div className="profile-detail">
                    <label className="avatar profile-cover-avatar">
                      <img
                        className="avatar-img"
                        src={UserData.Avatar}
                        alt="Profile Image"
                      />
                    </label>
                    <div className="pro-name">
                      <p>{UserData.FullName}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h6 className="pro-title text-secondary">اطلاعات حساب</h6>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h5>نام و نام خانوادگی</h5>
                      <p>{UserData.FullName}</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h5>نام کاربری</h5>
                      <p>{userInfo.User}</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h5>نام مستعار</h5>
                      <p>{userInfo.NickName}</p>
                    </div>
                    <div className="col-md-12">
                      <h6 className="pro-title text-secondary">اطلاعات شخصی</h6>
                    </div>
                    <div className="col-md-4">
                      <h5>شماره همراه</h5>
                      <p>{userInfo.Tel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
