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
            <p className="mb-0 text-secondary font-14 fw-bold">اضافه کردن مجوز</p>
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
                <div className="form-group">
                   <label className="lblAbs font-12">
                    نام شرکت <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    id="AddCertificateCompany"
                    value={companyName}
                    onChange={handleCompanyNameInput}
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
                    id="AddCertificateLink"
                    value={linkAddress}
                    onChange={handleLinkAddressInput}
                    required
                  />
                </div>

                <div className="form-group ">
                  <label className="lblAbs font-12">
                    عنوان مجوز<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    id="AddCertificateName"
                    value={certificateName}
                    onChange={handleCertificateNameInput}
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
                    id="AddCertificateYear"
                    value={year}
                    onChange={handleYearInput}
                    required
                  />
                </div>

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save rounded">
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
export default AddCertificateModal;
