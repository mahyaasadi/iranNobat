import FeatherIcon from "feather-icons-react";

const EditDoctorModal = ({ data, editPhysician }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editPhysicianModal"
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
            <form onSubmit={editPhysician}>
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditDoctorID"
                    value={data._id}
                  />
                  <input
                    type="text"
                    className="form-control floating"
                    name="EditDoctorName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                  <label className="focus-label">
                    نام پزشک <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    name="EditDoctorTitle"
                    defaultValue={data.Title}
                    key={data.Title}
                    required
                  />
                  <label className="focus-label">
                    عنوان <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    name="EditDoctorSpe"
                    className="form-control floating"
                    defaultValue={data.Spe}
                    key={data.Spe}
                    required
                  />
                  <label className="focus-label">
                    تخصص <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save">
                    ثبت تغییرات
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorModal;
