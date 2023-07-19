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
            <form onSubmit={editSpeWorks}>
                <div className="form-group ">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditSpeWorkID"
                    value={data._id}
                  />
                  
                  <label className="lblAbs font-12">
                    نام <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="EditSpeWorkName"
                    defaultValue={data.Name}
                    key={data.Name}
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
                    name="EditSpeWorkTitle"
                    defaultValue={data.Title}
                    key={data.Title}
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
                    name="EditSpeWorkEngName"
                    defaultValue={data.EngName}
                    key={data.EngName}
                    required
                  />
                </div>

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save rounded">
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
export default EditSpeWorkModal;
