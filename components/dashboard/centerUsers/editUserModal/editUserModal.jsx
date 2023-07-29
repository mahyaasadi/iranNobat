import FeatherIcon from "feather-icons-react";

const EditUserModal = ({ data, editUserInfo, eye, onEyeClick }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editUserModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h5 className="mb-0">ویرایش اطلاعات </h5>
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
            <form onSubmit={editUserInfo}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="editUserId"
                  value={data._id}
                />

                <label className="lblAbs font-12">
                  نام و نام خانوادگی <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  name="editUserFullName"
                  defaultValue={data.FullName}
                  key={data.FullName}
                  required
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام مستعار <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="editUserNickName"
                    className="form-control floating inputPadding rounded"
                    required
                    defaultValue={data.NickName}
                    key={data.NickName}
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
                    name="editUserNID"
                    className="form-control floating inputPadding rounded"
                    required
                    defaultValue={data.NID}
                    key={data.NID}
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
                    name="editUserTel"
                    className="form-control floating inputPadding rounded"
                    required
                    defaultValue={data.Tel}
                    key={data.Tel}
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
                    name="editUserName"
                    className="form-control floating inputPadding rounded"
                    required
                    autoComplete="false"
                    defaultValue={data.User}
                    key={data.User}
                  />
                </div>
              </div>

              <div className="input-group marginb-med">
                <label className="lblAbs font-12">رمز عبور</label>
                <input
                  type={eye ? "password" : "text"}
                  className="form-control inputPadding rounded"
                  required
                  name="editUserPassword"
                  autoComplete="true"
                  // defaultValue={data.User}
                  // key={data.User}
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
                  name="editRepaetUserPassword"
                  required
                  autoComplete="true"
                  className="form-control inputPadding rounded"
                  // defaultValue={data.User}
                  // key={data.User}
                />
                <span
                  onClick={onEyeClick}
                  className={`fa toggle-password" ${
                    eye ? "fa-eye-slash" : "fa-eye"
                  }`}
                />
              </div>
              <hr />

              <div className="roleCheckbox">
                <label className="lblRole font-12">سطح دسترسی</label>
                <div className="radio_container">
                  <input
                    type="checkbox"
                    name="editAdminRole"
                    id="adminRole"
                    // defaultValue={data.Admin}
                    // key={data.Admin}
                  />
                  <label className="Checkboxlabel" for="adminRole">
                    ادمین
                  </label>
                  <span className="vertical-line"></span>
                  <input
                    type="checkbox"
                    name="editSecretaryRole"
                    id="secretaryRole"
                    // defaultValue={data.Secretary}
                    // key={data.Secretary}
                  />
                  <label className="Checkboxlabel" for="secretaryRole">
                    منشی
                  </label>
                </div>
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
                >
                  ثبت تغییرات
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
