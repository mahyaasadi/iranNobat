import FeatherIcon from "feather-icons-react";

const AddDoctorModal = ({ addPhysician, name, title, specialty, handleNameInput, handleTitleInput, handleSpecialtyInput}) => {
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
            <h3 className="mb-0">اضافه کردن پزشک</h3>
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
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="text"
                    id="AddPhysicianName"
                    className="form-control floating"
                    value={name}
                    onChange={handleNameInput}
                    required
                  />
                  <label className="focus-label">
                    نام پزشک <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    id="AddPhysicianTitle"
                    className="form-control floating"
                    value={title}
                    onChange={handleTitleInput}
                    required
                  />
                  <label className="focus-label">
                    عنوان <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    id="AddPhysicianSpe"
                    className="form-control floating"
                    value={specialty}
                    onChange={handleSpecialtyInput}
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
export default AddDoctorModal;
