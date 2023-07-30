import FeatherIcon from "feather-icons-react";

const EditSpecialDiseaseModal = ({ data, editDisease }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editSpecialDiseaseModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              ویرایش بیماری خاص
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
            <form onSubmit={editDisease}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="diseaseId"
                  value={data._id}
                />

                <label className="lblAbs font-12">
                  نام <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editDiseaseName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام تخصصی <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editDiseaseEngName"
                    defaultValue={data.EngName}
                    key={data.EngName}
                    required
                  />
                </div>
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
                >
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

export default EditSpecialDiseaseModal;
