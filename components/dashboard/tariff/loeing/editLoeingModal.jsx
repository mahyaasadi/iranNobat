import FeatherIcon from "feather-icons-react";

const EditLoeingModal = ({ data, editLoeing }) => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="editLoeingModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="mb-0">ویرایش لوئینگ</h5>
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
              <form onSubmit={editLoeing}>
                <div className="form-group ">
                  <input
                    type="hidden"
                    className="form-control floating inputPadding rounded"
                    required
                    name="loeingId"
                    key={data._id}
                    defaultValue={data._id}
                  />

                  <label className="lblAbs font-12">
                    کد لوئینگ <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control floating inputPadding rounded marginb-md1"
                    required
                    name="loeingCode"
                    key={data.LoeingCode}
                    defaultValue={data.LoeingCode}
                  />
                </div>

                <div className="form-group ">
                  <label className="lblAbs font-12">
                    نام خدمت لوئینگ <span className="text-danger">*</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control floating inputPadding rounded"
                    required
                    name="loeingName"
                    defaultValue={data.Name}
                    key={data.Name}
                  ></textarea>
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
    </>
  );
};
export default EditLoeingModal;
