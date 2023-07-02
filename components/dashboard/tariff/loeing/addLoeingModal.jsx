import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Link from "next/link";

const AddLoeingModal = ({ data, addLoeing }) => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="addLoeingModal"
        tabIndex="-1"
        aria-hidden="true"
        // role="dialog"
        // aria-modal="true"
        // data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="mb-0">اضافه کردن لوئینگ</h3>
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
                    // key={data._id}
                    // defaultValue={data._id}
                  />

                  <input
                    type="text"
                    className="form-control floating"
                    required
                    name="loeingCode"
                    // key={data.LoeingCode}
                    // defaultValue={data.LoeingCode}
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
                    // defaultValue={data.Name}
                    // key={data.Name}
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
