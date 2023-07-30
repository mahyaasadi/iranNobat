import FeatherIcon from "feather-icons-react";
import Link from "next/link";

const ChatPermissionModal = () => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="chatPermissionModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <p className="mb-0 text-secondary font-14 fw-bold">
                ویرایش دسترسی گفتگو
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
              <form className="">
                <div className="form-group">
                  <input type="checkbox" id="a" value="a" />
                  <label for="a">a</label>
                </div>
                <div className="form-group">
                  <input type="checkbox" id="b" value="b" />
                  <label for="b">b</label>
                </div>
                <div className="form-group">
                  <input type="checkbox" id="c" value="c" />
                  <label for="c">c</label>
                </div>

                <div className="submit-section">
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save"
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
export default ChatPermissionModal;
