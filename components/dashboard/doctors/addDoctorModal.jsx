import FeatherIcon from "feather-icons-react";

const AddDoctorModal = ({
  addPhysician,
  name,
  title,
  specialty,
  handleNameInput,
  handleTitleInput,
  handleSpecialtyInput,
  isLoading,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addPhysicianModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن پزشک
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
            <form onSubmit={addPhysician} id="frmAddPhysician">
              <div className="form-group">
                <label className="lblAbs font-12">
                  نام پزشک<span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    id="AddPhysicianName"
                    className="form-control floating inputPadding rounded"
                    value={name}
                    onChange={handleNameInput}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    id="AddPhysicianTitle"
                    className="form-control floating inputPadding rounded"
                    value={title}
                    onChange={handleTitleInput}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  تخصص <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    id="AddPhysicianSpe"
                    className="form-control floating inputPadding rounded"
                    value={specialty}
                    onChange={handleSpecialtyInput}
                    required
                  />
                </div>
              </div>

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save"
                  >
                    ثبت
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary rounded"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    در حال ثبت
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddDoctorModal;
