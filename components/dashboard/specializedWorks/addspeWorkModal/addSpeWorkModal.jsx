import FeatherIcon from "feather-icons-react";

const AddSpeWorkModal = ({
  name,
  title,
  engName,
  handleNameInput,
  handleTitleInput,
  handleEngNameInput,
  addSpeWork,
}) => {
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
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن کار تخصصی{" "}
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
            <form onSubmit={addSpeWork} id="frmAddSpeWork">
              <div className="form-group ">
                <label className="lblAbs font-12">
                  نام <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  id="AddSpeName"
                  value={name}
                  onChange={handleNameInput}
                  required
                />
              </div>

              <div className="form-group ">
                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  id="AddSpeTitle"
                  value={title}
                  onChange={handleTitleInput}
                  required
                />
              </div>

              <div className="form-group ">
                <label className="lblAbs font-12">
                  نام انگلیسی <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  id="AddSpeEngName"
                  value={engName}
                  onChange={handleEngNameInput}
                  required
                />
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
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
export default AddSpeWorkModal;
