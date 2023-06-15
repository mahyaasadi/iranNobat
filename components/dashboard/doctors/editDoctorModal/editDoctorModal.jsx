import FeatherIcon from "feather-icons-react";

const EditDoctorModel = () => {
  return (
    <div
      className="modal fade contentmodal"
      id="editModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h3 className="mb-0">ویرایش اطلاعات </h3>
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
            <form>
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
                  <label className="focus-label">
                    نام پزشک <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
                  <label className="focus-label">
                    تخصص <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
                  <label className="focus-label">
                    عنوان <span className="text-danger">*</span>
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

export default EditDoctorModel;
