import { Modal } from 'react-bootstrap';

const CertificationModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن مجوز";
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
                            name="EditCertificateID"
                            value={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            نام شرکت <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="text"
                            name={mode == "edit" ? "EditCompanyName" : "addCertificateCompany"}
                            defaultValue={mode == "edit" ? data.Company : ""}
                            key={data.Company}
                            required
                        />
                    </div>

                    <div className="form-group ">
                        <label className="lblAbs font-12">
                            لینک <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="text"
                            name={mode == "edit" ? "EditCertificateLink" : "addCertificateLink"}
                            defaultValue={mode == "edit" ? data.Link : ""}
                            key={data.Link}
                            required
                        />
                    </div>

                    <div className="form-group ">
                        <label className="lblAbs font-12">
                            عنوان مجوز <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="text"
                            name={mode == "edit" ? "EditCertificateName" : "addCertificateName"}
                            defaultValue={mode == "edit" ? data.Name : ""}
                            key={data.Name}
                            required
                        />
                    </div>

                    <div className="form-group ">
                        <label className="lblAbs font-12">
                            سال صدور <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="number"
                            name={mode == "edit" ? "EditCertificateYear" : "addCertificateYear"}
                            defaultValue={mode == "edit" ? data.Year : ""}
                            key={data.Year}
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

export default CertificationModal;