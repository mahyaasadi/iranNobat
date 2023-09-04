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
            <p className="mb-0 text-secondary font-14 fw-bold">
              ویرایش اطلاعات
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
            <form onSubmit={editMessage}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="EditMessageID"
                  value={data._id}
                />
                <label className="lblAbs font-12">
                  عنوان پیام<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control floating inputPadding rounded"
                  name="EditMessageTitle"
                  defaultValue={data.Title}
                  key={data.Title}
                  required
                />
              </div>

              <div className="form-group ">
                <label className="lblAbs font-12">
                  پیام<span className="text-danger">*</span>
                </label>
                <textarea
                  type="textarea"
                  className="form-control floating rounded"
                  name="EditMessageText"
                  defaultValue={data.Text}
                  key={data.Text}
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
export default EditMessageModal;
