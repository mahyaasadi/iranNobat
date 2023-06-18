import FeatherIcon from "feather-icons-react";

const EditSpeWorkModal = ({ data, editSpeWorks }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editSpeWorkModal"
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
            <form onSubmit={editSpeWorks}>
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditSpeWorkID"
                    value={data._id}
                  />
                  <input
                    type="text"
                    className="form-control floating"
                    name="EditSpeWorkName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                  <label className="focus-label">
                    نام <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    name="EditSpeWorkTitle"
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
                    name="EditSpeWorkEngName"
                    className="form-control floating"
                    defaultValue={data.EngName}
                    key={data.EngName}
                    required
                  />
                  <label className="focus-label">
                    نام انگلیسی <span className="text-danger">*</span>
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
export default EditSpeWorkModal;
