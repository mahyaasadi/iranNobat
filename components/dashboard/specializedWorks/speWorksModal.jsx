import { Modal } from 'react-bootstrap';

const SpeWorksModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن کار تخصصی";
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
                            className="form-control floating"
                            name="EditSpeWorkID"
                            value={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            نام <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="text"
                            name={mode == "edit" ? "EditSpeWorkName" : "AddSpeName"}
                            defaultValue={mode == "edit" ? data.Name : ""}
                            key={data.Name}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            عنوان <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="text"
                            name={mode == "edit" ? "EditSpeWorkTitle" : "AddSpeTitle"}
                            defaultValue={mode == "edit" ? data.Title : ""}
                            key={data.Title}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            نام انگلیسی
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="text"
                            name={mode == "edit" ? "EditSpeWorkEngName" : "AddSpeEngName"}
                            defaultValue={mode == "edit" ? data.EngName : ""}
                            key={data.EngName}
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

export default SpeWorksModal;