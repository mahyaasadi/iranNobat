import FeatherIcon from "feather-icons-react";

const AddUserModal = ({
  eye,
  onEyeClick,
  addUser,
  password,
  handlePassword,
  validatePassword,
  NationalIdValidate,
  telNumberValidate,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addUserModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-1 text-secondary font-16 fw-bold">کاربر جدید</p>
            <button
              type="button"
              className="close-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i>
                <FeatherIcon icon="x-circle" />
              </i>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={addUser} id="addUserFrm">
              <div className="form-group">
                <label className="lblAbs font-12">
                  نام و نام خانوادگی<span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="userFullName"
                    className="form-control floating inputPadding rounded"
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
                    type="text"
                    name="userNickName"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="lblAbs font-12">
                  کد ملی <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="number"
                    name="userNID"
                    id="userNID"
                    className="form-control floating inputPadding rounded"
                    required
                    onBlur={NationalIdValidate}
                  />
                </div>
              </div>

              {/* userNID validation */}
              <div className="marginb-med">
                <div
                  className="text-secondary font-13 frmValidationTxt form-control inputPadding rounded mb-1"
                  id="formValidationText4"
                >
                  <p>کد ملی باید دارای 10 رقم باشد!</p>
                </div>
              </div>
              {/*  */}

              <div className="form-group">
                <label className="lblAbs font-12">
                  شماره موبایل<span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="number"
                    name="userTel"
                    id="userTel"
                    className="form-control floating inputPadding rounded"
                    required
                    onBlur={telNumberValidate}
                  />
                </div>
              </div>

              {/* userTel validation */}
              <div className="marginb-med">
                <div
                  className="text-secondary font-13 frmValidationTxt form-control inputPadding rounded mb-1"
                  id="formValidationText3"
                >
                  <p>شماره همراه باید دارای 11 رقم باشد!</p>
                </div>
              </div>
              {/*  */}

              <div className="input-group marginb-med">
                <label className="lblAbs font-12">
                  نام کاربری <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addUserName"
                    className="form-control floating inputPadding rounded"
                    required
                    autoComplete="false"
                  />
                </div>
              </div>
              <div className="input-group marginb-med">
                <label className="lblAbs font-12">
                  رمز عبور <span className="text-danger">*</span>
                </label>
                <input
                  type={eye ? "password" : "text"}
                  name="addUserPassword"
                  id="addUserPassword"
                  required
                  autoComplete="true"
                  value={password}
                  onChange={handlePassword}
                  className="form-control inputPadding rounded"
                  onBlur={validatePassword}
                />
                <span
                  onClick={onEyeClick}
                  className={`fa toggle-password" ${
                    eye ? "fa-eye-slash" : "fa-eye"
                  }`}
                />
              </div>

              {/* password validation */}
              <div className="marginb-med">
                <div
                  className="text-secondary font-13 frmValidationTxt form-control inputPadding rounded mb-1"
                  id="formValidationText1"
                >
                  <p>رمز عبور باید حداقل 7 رقم باشد!</p>
                </div>
              </div>
              {/*  */}

              <div className="input-group marginb-med">
                <label className="lblAbs font-12">
                  تکرار رمز عبور <span className="text-danger">*</span>
                </label>
                <input
                  type={eye ? "password" : "text"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  autoComplete="true"
                  className="form-control inputPadding rounded"
                  onBlur={validatePassword}
                />
                <span
                  onClick={onEyeClick}
                  className={`fa toggle-password" ${
                    eye ? "fa-eye-slash" : "fa-eye"
                  }`}
                />
              </div>

              {/* confirmPassword Validation */}
              <div className="marginb-med">
                <div
                  className="text-secondary font-13 frmValidationTxt form-control inputPadding rounded mb-1"
                  id="formValidationText2"
                >
                  <p>رمز عبور تطابق ندارد!</p>
                </div>
              </div>

              <hr />
              {/* 
              <div className="roleCheckbox">
                <label className="lblRole font-12">سطح دسترسی</label>
                <div className="radio_container">
                  <input type="checkbox" name="adminRole" id="adminRole" />
                  <label className="Checkboxlabel" htmlFor="adminRole">
                    ادمین
                  </label>
                  <span className="vertical-line"></span>
                  <input
                    type="checkbox"
                    name="secretaryRole"
                    id="secretaryRole"
                  />
                  <label className="Checkboxlabel" htmlFor="secretaryRole">
                    منشی
                  </label>
                </div>
              </div> */}

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary rounded btn-save"
                  id="submitUserBtn"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddUserModal;
