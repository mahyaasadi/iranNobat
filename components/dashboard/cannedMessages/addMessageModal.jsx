import FeatherIcon from "feather-icons-react";

const AddMessageModal = ({
  addMessage,
  messageText,
  messageTitle,
  handleMessageTextInput,
  handleMessageTitleInput,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addMessageModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن پیام
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
            <form onSubmit={addMessage}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان پیام <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control floating inputPadding rounded"
                  id="AddMessageTitle"
                  value={messageTitle}
                  onChange={handleMessageTitleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  پیام <span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control floating inputPadding rounded"
                  id="AddMessageText"
                  value={messageText}
                  onChange={handleMessageTextInput}
                  required
                ></textarea>
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

export default AddMessageModal;
