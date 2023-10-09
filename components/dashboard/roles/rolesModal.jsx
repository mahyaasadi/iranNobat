import { Modal } from 'react-bootstrap';

const CannedMessageModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن نقش ";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
    return (

        <Modal show={show} onHide={onHide} centered >
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        {mode === "edit" && (
                            <input
                                type="hidden"
                                className="form-control floating"
                                name="roleID"
                                value={data._id}
                            />
                        )}
                        <label className="lblAbs font-12">
                            عنوان<span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                className="form-control floating inputPadding rounded"
                                type="text"
                                name={mode == "edit" ? "editRoleName" : "addRoleName"}
                                defaultValue={mode == "edit" ? data.Name : ""}
                                key={data.Name}
                                required
                            />
                        </div>
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