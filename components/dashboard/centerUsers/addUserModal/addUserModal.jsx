import FeatherIcon from "feather-icons-react";

const AddUserModal = ({ eye, onEyeClick, addUser }) => {
  // const handleRadioButton = () => {
  //   $(this).removeAttr("checked");
  // };
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
            <h5 className="mb-0">اضافه کردن کاربر</h5>
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
            <form onSubmit={addUser}>
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
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="lblAbs font-12">
                  شماره موبایل<span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="number"
                    name="userTel"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>
              <div className="input-group marginb-med">
                <label className="lblAbs font-12">
                  نام کاربری <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addUsername"
                    className="form-control floating inputPadding rounded"
                    required
                    defaultValue=""
                    placeholder=" "
                    autoComplete="false"
                  />
                </div>
              </div>
              <div className="input-group marginb-med">
                <label className="lblAbs font-12">رمز عبور</label>
                <input
                  type={eye ? "password" : "text"}
                  name="userPassword"
                  required
                  autoComplete="true"
                  className="form-control inputPadding rounded"
                />
                <span
                  onClick={onEyeClick}
                  className={`fa toggle-password" ${
                    eye ? "fa-eye-slash" : "fa-eye"
                  }`}
                />
              </div>
              <div className="input-group marginb-med">
                <label className="lblAbs font-12">تکرار رمز عبور</label>
                <input
                  type={eye ? "password" : "text"}
                  name="repeatUserPassword"
                  required
                  autoComplete="true"
                  className="form-control inputPadding rounded"
                />
                <span
                  onClick={onEyeClick}
                  className={`fa toggle-password" ${
                    eye ? "fa-eye-slash" : "fa-eye"
                  }`}
                />
              </div>
              <hr />
              {/*  */}
              {/* <fieldset className="fieldsetPadding">
                <p className="text-secondary font-13">انتخاب نقش</p>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    id="coding"
                    name="interest"
                    value="coding"
                  />
                  <div><p>Coding</p></div>
                  <input
                    type="checkbox"
                    id="music"
                    name="interest"
                    value="music"
                  />
                  <div><p>Music</p></div>
                </div>
              </fieldset> */}

              <div className="roleCheckbox">
                <label className="lblRole font-12">سطح دسترسی</label>
                <div className="radio_container">
                  <input type="checkbox" name="radio" id="adminRole" />
                  <label className="Checkboxlabel" for="adminRole">
                    ادمین
                  </label>
                  <span className="vertical-line"></span>
                  <input type="checkbox" name="radio" id="secretaryRole" />
                  <label className="Checkboxlabel" for="secretaryRole">
                    منشی
                  </label>
                </div>
              </div>

              {/*  */}
              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary rounded btn-save"
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
