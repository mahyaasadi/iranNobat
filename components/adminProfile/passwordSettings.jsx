import { useState } from "react";
import { useRouter } from "next/router";

const PasswordSettings = ({
  newPassword,
  handleNewPassword,
  editUserPassword,
  userInfo,
}) => {
  const router = useRouter();
  const [eye, setEye] = useState(true);
  const onEyeClick = () => setEye(!eye);

  const validatePasswordLength = (e) => {
    e.preventDefault();

    // password length
    if (newPassword.length < 7) {
      $("#newPassValidationText1").show();
      $("#submitNewPasswordBtn").attr("disabled", true);
      return;
    } else {
      $("#newPassValidationText1").hide();
      $("#submitNewPasswordBtn").attr("disabled", false);
    }
  };

  const validateConfirmPassword = (e) => {
    e.preventDefault();

    let formData = new FormData(document.getElementById("passwordSettingsFrm"));
    const formProps = Object.fromEntries(formData);

    let passValue = $("#newPassword").val();
    let confpassValue = $("#confirmNewPassword").val();

    // confirm password validation
    if (passValue !== confpassValue) {
      $("#newPassValidationText2").show();
      $("#submitNewPasswordBtn").attr("disabled", true);
    } else {
      $("#newPassValidationText2").hide();
      $("#submitNewPasswordBtn").attr("disabled", false);
    }
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <>
      <div className="d-flex justify-center">
        <div className="col-lg-8 col-12 p-4">
          <div className="card-body">
            <div className="card-header">
              <p className="font-16 fw-bold text-secondary">تغییر رمز عبور</p>
            </div>
            <form id="passwordSettingsFrm" onSubmit={editUserPassword}>
              <div className="form-group mt-4">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="userId"
                  value={userInfo._id}
                />

                <label className="lblAbs font-12">
                  رمز عبور فعلی <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type={eye ? "password" : "text"}
                    name="currentPassword"
                    id="currentPassword"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                  <span
                    onClick={onEyeClick}
                    className={`fa toggle-password-current" ${
                      eye ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </div>

                <div className="input-group mb-3 mt-4">
                  <label className="lblAbs font-12">
                    رمز عبور جدید <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type={eye ? "password" : "text"}
                      name="newPassword"
                      id="newPassword"
                      className="form-control floating inputPadding rounded"
                      value={newPassword}
                      onChange={handleNewPassword}
                      autoComplete="false"
                      onBlur={validatePasswordLength}
                      required
                    />
                    <span
                      onClick={onEyeClick}
                      className={`fa toggle-password-newPass" ${
                        eye ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </div>
                </div>

                {/* password validation */}
                <div className="marginb-med mt-4">
                  <div
                    className="text-secondary font-13 frmValidationTxt form-control inputPadding rounded mb-1"
                    id="newPassValidationText1"
                  >
                    <p>رمز عبور باید حداقل 7 رقم باشد!</p>
                  </div>
                </div>

                <div className="form-group">
                  <label className="lblAbs font-12">
                    تکرار رمز عبور <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type={eye ? "password" : "text"}
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      className="form-control floating inputPadding rounded"
                      autoComplete="false"
                      onBlur={validateConfirmPassword}
                      required
                    />
                    <span
                      onClick={onEyeClick}
                      className={`fa toggle-password-confPass" ${
                        eye ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </div>
                </div>

                <div className="marginb-med mt-4">
                  <div
                    className="text-secondary font-13 frmValidationTxt form-control inputPadding rounded mb-1"
                    id="newPassValidationText2"
                  >
                    <p>رمز عبور باید تطابق داشته باشد!</p>
                  </div>
                </div>

                <div className="settings-btns d-flex gap-1 justify-center media-flex-column margin-top-3">
                  <button
                    type="submit"
                    className="btn btn-primary rounded profileSettingsBtn font-13"
                    id="submitNewPasswordBtn"
                  >
                    ثبت
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-dark rounded profileSettingsBtn font-13"
                    id="cancelNewPasswordBtn"
                    onClick={handleCancelBtn}
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordSettings;
