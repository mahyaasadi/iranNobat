import { Modal } from 'react-bootstrap';

const CannedMessageModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن پیام پیش فرض";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
    return (

        <Modal show={show} onHide={onHide} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    {mode === "edit" && (
                        <input
                            type="hidden"
                            className="form-control floating"
                            name="EditMessageID"
                            value={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            عنوان پیام <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control floating inputPadding rounded"
                            name={mode == "edit" ? "EditMessageTitle" : "addMessageTitle"}
                            defaultValue={mode == "edit" ? data.Title : ""}
                            key={data.Title}
                            required
                        />
                    </div>

                    <div className="form-group ">
                        <label className="lblAbs font-12">
                            پیام <span className="text-danger">*</span>
                        </label>
                        <textarea
                            type="textarea"
                            className="form-control floating rounded"
                            name={mode == "edit" ? "EditMessageText" : "addMessageText"}
                            defaultValue={mode == "edit" ? data.Text : ""}
                            key={data.Text}
                            required
                        ></textarea>
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

export default CannedMessageModal