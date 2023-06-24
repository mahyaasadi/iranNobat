import FeatherIcon from "feather-icons-react";

const EditMessageModal = ({
  data,
  editMessage,
  messageText,
  messageTitle,
  handleMessageTextInput,
  handleMessageTitleInput,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editMessageModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h3 className="mb-0">ویرایش اطلاعات </h3>
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
            <form onSubmit={editMessage}>
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditMessageID"
                    value={data._id}
                  />
                  <input
                    type="text"
                    className="form-control floating"
                    name="EditMessageTitle"
                    defaultValue={data.Title}
                    key={data.Title}
                    required
                  />
                  <label className="focus-label">
                    عنوان پیام<span className="text-danger">*</span>
                  </label>
                </div>

                <div className="form-group form-focus">
                  <textarea
                    type="textarea"
                    className="form-control floating"
                    name="EditMessageText"
                    defaultValue={data.Text}
                    key={data.Text}
                    required
                  ></textarea>

                  <label className="focus-label">
                    پیام<span className="text-danger">*</span>
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
export default EditMessageModal;
