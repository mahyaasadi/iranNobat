import { useState } from "react";

const PasswordSettings = ({ newPassword, handleNewPassword, editUserPassword, userInfo }) => {
  const [eye, setEye] = useState(true);
  const onEyeClick = () => setEye(!eye);

  const validatePassword = (e) => {
    e.preventDefault();

    let formData = new FormData(document.getElementById("passwordSettingsFrm"));
    const formProps = Object.fromEntries(formData);

    let passValue = $("#newPassword").val();
    let confpassValue = $("#confirmNewPassword").val();

    // password length
    if (newPassword.length < 7) {
      $("#newPassValidationText1").show();
      $("#submitNewPasswordBtn").attr("disabled", true);
      return;
    } else {
      $("#newPassValidationText1").hide();
      $("#submitNewPasswordBtn").attr("disabled", false);
    }
    // confirm password validation
    if (passValue !== confpassValue) {
      $("#newPassValidationText2").show();
      $("#submitNewPasswordBtn").attr("disabled", true);
    } else {
      $("#newPassValidationText2").hide();
      $("#submitNewPasswordBtn").attr("disabled", false);
    }
  };

  const handleCancelBtn = () => {
    let passValue = $("#newPassword").val();
    let confpassValue = $("#confirmNewPassword").val();
    let currentPassword = $("#currentPassword")

    passValue = null;
    currentPassword = null;
    confpassValue = null;
  }

  return (
    <>
      {/* <div className="card w-75 p-4"> */}
      {/* <div className="card-body"> */}
      <div className="d-flex justify-center">
        <div className="card w-75 p-4">
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
                  // defaultValue={panelData.Password}
                  />
                  <span
                    onClick={onEyeClick}
                    className={`fa toggle-password-current" ${eye ? "fa-eye-slash" : "fa-eye"
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
                      onBlur={validatePassword}
                      required
                    // defaultValue={panelData.Password}
                    />
                    <span
                      onClick={onEyeClick}
                      className={`fa toggle-password-newPass" ${eye ? "fa-eye-slash" : "fa-eye"
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
                      onBlur={validatePassword}
                      required
                    />
                    <span
                      onClick={onEyeClick}
                      className={`fa toggle-password-confPass" ${eye ? "fa-eye-slash" : "fa-eye"
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

                <div className="d-flex gap-1 justify-center media-flex-column">
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save font-13"
                    id="submitNewPasswordBtn"
                  >
                    ثبت
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-dark rounded btn-save font-13"
                    id="cancelNewPasswordBtn"
                    onClick={handleCancelBtn}
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* </div> */}
          {/* </div> */}

        </div>
      </div>
    </>
  );
};

export default PasswordSettings;
