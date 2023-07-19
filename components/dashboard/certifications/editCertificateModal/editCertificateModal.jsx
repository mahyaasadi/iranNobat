import FeatherIcon from "feather-icons-react";
import JDate from "jalali-date";

const jdate = new JDate();

const EditCertificateModal = ({ data, editCertificate }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editCertificateModal"
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
            <form onSubmit={editCertificate}>
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditCertificateID"
                    value={data._id}
                  />
  
                  <label className="lblAbs font-12">
                      نام شرکت <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="EditCompanyName"
                    defaultValue={data.Company}
                    key={data.Company}
                    required
                  />
                </div>

                <div className="form-group ">
                  <label className="lblAbs font-12">
                    لینک <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="EditCertificateLink"
                    defaultValue={data.Link}
                    key={data.Link}
                    required
                  />
                </div>

                <div className="form-group ">
                   <label className="lblAbs font-12">
                    عنوان مجوز <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="EditCertificateName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                </div>

                <div className="form-group ">
                  <label className="lblAbs font-12">
                    سال صدور <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="number"
                    name="EditCertificateYear"
                    defaultValue={data.Year}
                    key={data.Year}
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

export default EditCertificateModal;
