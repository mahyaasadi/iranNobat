import { Modal } from 'react-bootstrap';

const DoctorModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    name,
    title,
    specialty,
    handleNameInput,
    handleTitleInput,
    handleSpecialtyInput,
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن پزشک";
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
                            name="EditDoctorID"
                            value={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            نام پزشک <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                className="form-control floating inputPadding rounded"
                                type="text"
                                name={mode == "edit" ? "EditDoctorName" : "AddPhysicianName"}
                                defaultValue={mode === "edit" ? data.Name : name}
                                key={data.Name}
                                onChange={handleNameInput}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            عنوان <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                className="form-control floating inputPadding rounded"
                                type="text"
                                name={mode == "edit" ? "EditDoctorTitle" : "AddPhysicianTitle"}
                                defaultValue={mode === "edit" ? data.Title : title}
                                key={data.Title}
                                onChange={handleTitleInput}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            تخصص <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                className="form-control floating inputPadding rounded"
                                type="text"
                                name={mode == "edit" ? "EditDoctorSpe" : "AddPhysicianSpe"}
                                defaultValue={mode === "edit" ? data.Spe : specialty}
                                key={data.Spe}
                                onChange={handleSpecialtyInput}
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

export default DoctorModal;