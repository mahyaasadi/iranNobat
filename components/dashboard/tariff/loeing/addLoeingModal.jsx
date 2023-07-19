import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Link from "next/link";

const AddLoeingModal = ({ data, addLoeing }) => {
  return (
    <>
      <div
        className="modal fade contentmodal "
        id="addLoeingModal"
        tabIndex="-1"
        aria-hidden="true"
        // data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="mb-0">اضافه کردن لوئینگ</h5>
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
              <form onSubmit={addLoeing}>
                <div className="form-group ">
                  <input
                    type="hidden"
                    className="form-control floating"
                    required
                    name="loeingId"
                  />

                  <label className="lblAbs font-12">
                    کد لوئینگ <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control floating inputPadding rounded"
                    required
                    name="loeingCode"
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
                  ></textarea>
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
    </>
  );
};
export default AddLoeingModal;
