import { Modal } from 'react-bootstrap';

const LoeingModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "لوئینگ جدید";
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
                        <input
                            type="hidden"
                            name="loeingId"
                            defaultValue={data._id}
                            key={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            کد لوئینگ <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control floating inputPadding rounded marginb-md1"
                            required
                            name="loeingCode"
                            defaultValue={mode == "edit" ? data.LoeingCode : ""}
                            key={data.LoeingCode}
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
                            defaultValue={mode == "edit" ? data.Name : ""}
                            key={data.Name}
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

export default LoeingModal;