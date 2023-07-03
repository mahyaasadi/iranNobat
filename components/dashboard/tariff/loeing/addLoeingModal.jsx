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
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    className="form-control floating"
                    required
                    name="loeingId"
                  />

                  <input
                    type="text"
                    className="form-control floating"
                    required
                    name="loeingCode"
                  />
                  <label className="focus-label">
                    کد لوئینگ <span className="text-danger">*</span>
                  </label>
                </div>

                <div className="form-group form-focus">
                  <textarea
                    type="text"
                    className="form-control floating"
                    required
                    name="loeingName"
                  ></textarea>
                  <label className="focus-label">
                    نام خدمت لوئینگ <span className="text-danger">*</span>
                  </label>
                </div>

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save">
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
