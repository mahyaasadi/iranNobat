import { Modal } from 'react-bootstrap';

const TariffModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "سرویس جدید";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";

    return (
        <Modal show={show} onHide={onHide} centered size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <div className="row media-flex-col align-end">
                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">
                                    شناسه <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control floating inputPadding rounded"
                                    required
                                    name="serviceId"
                                    defaultValue={mode == "edit" ? data._id : ""}
                                    key={data._id}
                                    readOnly={mode === "edit"}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">
                                    نام خدمت <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control floating inputPadding rounded"
                                    required
                                    name="serviceName"
                                    defaultValue={mode == "edit" ? data.Service : ""}
                                    key={data.Service}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">کد داخلی</label>
                                <input
                                    type="text"
                                    className="form-control floating inputPadding rounded"
                                    name={mode == "edit" ? "editInternalCode" : "addInternalCode"}
                                    defaultValue={mode == "edit" ? data.InternalCode : ""}
                                    key={data.InternalCode}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row media-flex-col">
                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">ضریب K</label>
                                <input
                                    type="text"
                                    className="form-control floating inputPadding rounded"
                                    name="total_K"
                                    defaultValue={mode == "edit" ? data.Total_K : ""}
                                    key={data.Total_K}
                                    readOnly={mode === "edit"}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">ضریب K فنی</label>
                                <input
                                    type="text"
                                    className="form-control floating inputPadding rounded"
                                    name="tech_K"
                                    key={data.Technical_K}
                                    defaultValue={mode == "edit" ? data.Technical_K : ""}
                                    readOnly={mode === "edit"}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">ضریب K حرفه ای</label>
                                <input
                                    type="text"
                                    className="form-control floating inputPadding rounded"
                                    name="pro_K"
                                    key={data.Professional_K}
                                    defaultValue={mode == "edit" ? data.Professional_K : ""}
                                    readOnly={mode === "edit"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row media-flex-col">
                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">مبلغ K فنی-خصوصی</label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="ptk_price"
                                    key={data.PrivateTechnicalK_Price}
                                    defaultValue={mode == "edit" ? data.PrivateTechnicalK_Price : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">
                                    مبلغ K حرفه ای-خصوصی
                                </label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="ppk_price"
                                    key={data.PrivateProfessionalK_Price}
                                    defaultValue={mode == "edit" ? data.PrivateProfessionalK_Price : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">مبلغ K فنی-دولتی</label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="gtk_price"
                                    key={data.GovernmentalTechnicalK_Price}
                                    defaultValue={mode == "edit" ? data.GovernmentalTechnicalK_Price : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">
                                    مبلغ K حرفه ای-دولتی{" "}
                                </label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="gpk_price"
                                    key={data.GovernmentalProfessionalK_Price}
                                    defaultValue={mode == "edit" ? data.GovernmentalProfessionalK_Price : ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row media-flex-col">
                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">
                                    تعرفه دولتی<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    required
                                    name="govTariff"
                                    key={data.GovernmentalTariff}
                                    defaultValue={mode == "edit" ? data.GovernmentalTariff : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">
                                    تعرفه خصوصی<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    required
                                    name="privateTariff"
                                    key={data.PrivateTariff}
                                    defaultValue={mode == "edit" ? data.PrivateTariff : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">تعرفه آزاد</label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="freeTariff"
                                    key={data.FreeTariff}
                                    defaultValue={mode == "edit" ? data.FreeTariff : ""}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="row media-flex-col">
                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">
                                    سهم بیمار خدمات و تامین{" "}
                                </label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="patientCost"
                                    key={data.PatientCost}
                                    defaultValue={mode == "edit" ? data.PatientCost : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label className="lblAbs font-12">سهم بیمار ارتش</label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="arteshPatientCost"
                                    key={data.ArteshPatientCost}
                                    defaultValue={mode == "edit" ? data.ArteshPatientCost : ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row media-flex-col">
                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">سهم تامین</label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="taminShare"
                                    key={data.ST}
                                    defaultValue={mode == "edit" ? data.ST : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">سهم سلامت</label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="salamatShare"
                                    key={data.SS}
                                    defaultValue={mode == "edit" ? data.SS : ""}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group ">
                                <label className="lblAbs font-12">سهم ارتش</label>
                                <input
                                    type="number"
                                    className="form-control floating inputPadding rounded"
                                    name="arteshShare"
                                    key={data.SA}
                                    defaultValue={mode == "edit" ? data.SA : ""}
                                />
                            </div>
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
        </Modal >
    );
};

export default TariffModal;