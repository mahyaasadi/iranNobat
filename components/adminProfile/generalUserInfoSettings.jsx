import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const GenralUserInfoSettings = ({
  userInfo,
  UserData,
  editGeneralUserInfo,
  isLoading,
}) => {
  const router = useRouter();

  const handleCancelBtn = (e) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <>
      <div className="col-xl-6 col-12">
        <div className="card">
          <div className="card-body p-4">
            <div className="card-header">
              <p className="font-16 fw-bold text-secondary">اطلاعات شخصی</p>
            </div>
            <form onSubmit={editGeneralUserInfo}>
              <div className="form-group mt-4">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="centerId"
                  value={UserData.CenterID}
                />

                <input
                  type="hidden"
                  className="form-control floating"
                  name="userId"
                  value={userInfo._id}
                />

                <label className="lblAbs font-12">
                  نام و نام خانوادگی <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editUserFullName"
                    defaultValue={userInfo.FullName}
                    key={userInfo.FullName}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام مستعار <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editUserNickName"
                    defaultValue={userInfo.NickName}
                    key={userInfo.NickName}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام کاربری <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editUserName"
                    defaultValue={userInfo.User}
                    key={userInfo.User}
                    readOnly
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  شماره همراه <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="number"
                    name="editUserTel"
                    defaultValue={userInfo.Tel}
                    key={userInfo.Tel}
                    required
                  />
                </div>
              </div>

              <div className="settings-btns d-flex gap-1 justify-center media-flex-column margin-top-3">
                <button
                  type="submit"
                  className="btn btn-primary rounded profileSettingsBtn font-13"
                  id="submitGeneralInfoBtn"
                >
                  ثبت
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-dark rounded profileSettingsBtn font-13"
                  id="cancelGeneralInfoBtn"
                  onClick={handleCancelBtn}
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenralUserInfoSettings;

