import FeatherIcon from "feather-icons-react";
import JDate from "jalali-date";

const jdate = new JDate();

const AddCertificateModal = ({
  companyName,
  linkAddress,
  certificateName,
  year,
  handleCompanyNameInput,
  handleLinkAddressInput,
  handleCertificateNameInput,
  handleYearInput,
  addCertificate,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addCertificateModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h3 className="mb-0">اضافه کردن مجوز</h3>
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
            <form onSubmit={addCertificate} id="frmAddCertificate">
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="text"
                    id="AddCertificateCompany"
                    className="form-control floating"
                    value={companyName}
                    onChange={handleCompanyNameInput}
                    required
                  />
                  <label className="focus-label">
                    نام شرکت <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    id="AddCertificateLink"
                    className="form-control floating"
                    value={linkAddress}
                    onChange={handleLinkAddressInput}
                    required
                  />
                  <label className="focus-label">
                    لینک <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="text"
                    id="AddCertificateName"
                    className="form-control floating"
                    value={certificateName}
                    onChange={handleCertificateNameInput}
                    required
                  />
                  <label className="focus-label">
                    عنوان مجوز<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group form-focus">
                  <input
                    type="number"
                    id="AddCertificateYear"
                    className="form-control floating"
                    value={year}
                    defaultValue={jdate.getFullYear()}
                    // key={year}

                    onChange={handleYearInput}
                    required
                  />
                  <label className="focus-label">
                    سال صدور <span className="text-danger">*</span>
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
export default AddCertificateModal;
