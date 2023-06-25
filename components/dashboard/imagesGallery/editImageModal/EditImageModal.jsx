import FeatherIcon from "feather-icons-react";

const EditImageModal = () => {
  return (
    <div
      className="modal fade contentmodal"
      id="editImageModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h3 className="mb-0">Edit Product</h3>
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
            <form action="/admin/pharmacy-list">
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    defaultValue="Safi Natural"
                  />
                  <label className="focus-label">
                    Product Name <span className="text-danger">*</span>
                  </label>
                </div>

                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    defaultValue="$330.00"
                  />
                  <label className="focus-label">
                    Price <span className="text-danger">*</span>
                  </label>
                </div>

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save">
                    Save Changes
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
export default EditImageModal;
