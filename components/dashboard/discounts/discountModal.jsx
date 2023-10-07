import { Modal } from 'react-bootstrap';
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const DiscountModal = ({
    mode = "add",
    onSubmit,
    data = {},
    FUSelectDiscountPercent,
    discountPercentDataClass,
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن تخفیف";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";

    const defaultPercentValue = data.Percent ? 1 : 0;
    const percentLabel = data.Percent
        ? "محاسبه بر اساس درصد"
        : "محاسبه بر اساس مبلغ";

    const selectedPercent = mode == "edit" ? { value: defaultPercentValue, label: percentLabel } : null;

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
                            name="EditDiscountID"
                            value={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            نام <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            name={mode == "edit" ? "EditDiscountName" : "discountName"}
                            defaultValue={mode == "edit" ? data.Name : ""}
                            key={data.Name}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            مشخصات<span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            name={mode == "edit" ? "EditDiscountDes" : "discountDescription"}
                            defaultValue={mode == "edit" ? data.Des : ""}
                            key={data.Des}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            درصد تخفیف <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            name={mode == "edit" ? "EditDiscountValue" : "discountValue"}
                            defaultValue={mode == "edit" ? data.Value : ""}
                            required
                            key={data.Value}
                        />
                    </div>

                    <div className="col media-w-100 font-12">
                        <label className="lblDrugIns font-12">
                            روش محاسبه<span className="text-danger">*</span>
                        </label>

                        <SelectField
                            styles={selectfieldColourStyles}
                            options={discountPercentDataClass}
                            errorMessage={""}
                            error={false}
                            label={true}
                            className="text-center"
                            placeholder={"روش محاسبه را انتخاب کنید"}
                            required
                            name="EditDiscountPercent"
                            defaultValue={selectedPercent}
                            onChangeValue={(value) =>
                                FUSelectDiscountPercent(value?.value)
                            }
                            key={data.Percent}
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

export default DiscountModal;