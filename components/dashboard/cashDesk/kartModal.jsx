import { Modal } from "react-bootstrap";

const KartModal = ({
  mode = "add",
  onSubmit,
  data = {},
  isLoading,
  show,
  onHide,
}) => {
  const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن پایانه";
  const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          {mode === "edit" && (
            <input type="hidden" name="kartID" value={data._id} />
          )}

          <div className="form-group ">
            <label className="lblAbs font-12">
              عنوان <span className="text-danger">*</span>
            </label>
            <input
              className="form-control floating inputPadding rounded"
              type="text"
              name="kartName"
              defaultValue={mode == "edit" ? data.Name : ""}
              key={data.Name}
              required
            />
          </div>

          <div className="form-group ">
            <label className="lblAbs font-12">
              بانک <span className="text-danger">*</span>
            </label>
            <input
              className="form-control floating inputPadding rounded"
              type="text"
              name="kartBank"
              defaultValue={mode == "edit" ? data.Bank : ""}
              key={data.Bank}
              required
            />
          </div>

          <div className="form-group ">
            <label className="lblAbs font-12">
              شماره <span className="text-danger">*</span>
            </label>
            <input
              dir="ltr"
              className="form-control floating inputPadding rounded"
              type="text"
              name="kartNumber"
              defaultValue={mode == "edit" ? data.Number : ""}
              key={data.Number}
              required
            />
          </div>

          <div className="submit-section">
            {!isLoading ? (
              <button
                type="submit"
                className="btn btn-primary rounded btn-save font-13"
              >
                {submitText}
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary rounded font-13"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                در حال ثبت
              </button>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default KartModal;
