import FeatherIcon from "feather-icons-react";

const EditPrescriptionModal = () => {
  return (
    <div
      className="modal fade contentmodal"
      id="editPrescriptionModal"
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
            <form>
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name=""
                    // value={data._id}
                  />
                  <input
                    type="text"
                    className="form-control floating"
                    name=""
                    // defaultValue={data.Company}
                    // key={data.Company}
                    required
                  />
                  <label className="focus-label">
                    نام<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    name=""
                    // defaultValue={data.Link}
                    // key={data.Link}
                    required
                  />
                  <label className="focus-label">
                    لینک <span className="text-danger">*</span>
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

export default EditPrescriptionModal;
