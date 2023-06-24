import FeatherIcon from "feather-icons-react";

const AddMessageModal = ({
  addMessage,
  messageText,
  messageTitle,
  handleMessageTextInput,
  handleMessageTitleInput
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
            <h3 className="mb-0">اضافه کردن پیام</h3>
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
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="text"
                    id="AddMessageTitle"
                    className="form-control floating"
                    value={messageTitle}
                    onChange={handleMessageTitleInput}
                    required
                  />
                  <label className="focus-label">
                    عنوان پیام <span className="text-danger">*</span>
                  </label>
                </div>

                <div className="form-group form-focus">
                  <textarea
                    type="text"
                    id="AddMessageText"
                    className="form-control floating"
                    value={messageText}
                    onChange={handleMessageTextInput}
                    required
                  ></textarea>
                  <label className="focus-label">
                    پیام <span className="text-danger">*</span>
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

export default AddMessageModal;
