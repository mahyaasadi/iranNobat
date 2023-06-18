import FeatherIcon from "feather-icons-react";

const AddSpeWorkModal = ({name, title, engName, handleNameInput, handleTitleInput, handleEngNameInput, addSpeWork}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addSpeWorkModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h3 className="mb-0">اضافه کردن کار تخصصی</h3>
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
            <form onSubmit={addSpeWork} id="frmAddSpeWork">
              <div className="add-wrap">
                <div className="form-group form-focus">
                 <input
                    type="text"
                    id="AddSpeName"
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
                    id="AddSpeTitle"
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
                    id="AddSpeEngName"
                    className="form-control floating"
                    value={engName}
                    onChange={handleEngNameInput}
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
export default AddSpeWorkModal;
