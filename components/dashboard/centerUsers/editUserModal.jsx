import FeatherIcon from "feather-icons-react";

const EditUserModal = ({ data, editUserInfo }) => {
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
            <p className="mb-0 text-secondary font-14 fw-bold">
              ویرایش اطلاعات
            </p>
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

                <input
                  type="hidden"
                  className="form-control floating"
                  name="editActiveState"
                  value={data.Deactive}
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
                  شماره موبایل <span className="text-danger">*</span>
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
                    // required
                    readOnly
                    autoComplete="false"
                    defaultValue={data.User}
                    key={data.User}
                  />
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
