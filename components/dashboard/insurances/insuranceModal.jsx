import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const InsuranceModal = ({
    mode = 'add', // Default mode is 'add'
    onSubmit,
    data = {},
    name,
    handleNameInput,
    insuranceType,
    insuranceStatus,
    FUSelectInsuranceType,
    FUSelectInsuranceStatus,
    modalRef
}) => {
    const title = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن بیمه";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
    // const selectedType = mode === "edit" ? { value: data.Type, label: data.Type } : null;
    // const selectedStatus = mode === "edit" ? { value: data.Status, label: data.Status } : null;

    console.log({ mode });
    return (
        <div
            className={`modal fade contentmodal`}
            ref={modalRef}
            id={mode === "edit" ? "editInsuranceModal" : "addInsuranceModal"}
            tabIndex="-1"
            aria-hidden="true"
        >
            <div className="modal-header">
                <p className="mb-0 text-secondary font-14 fw-bold">{title}</p>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmit}>
                    {/*  {mode === "edit" && (
                        <input type="hidden" className="form-control floating" name="EditInsuranceID" value={data._id} />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            نام بیمه <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control floating inputPadding rounded"
                            type="text"
                            name={mode === "edit" ? "EditInsuranceName" : "AddInsuranceName"}
                            defaultValue={mode === "edit" ? data.Name : ""}
                            key={data.Name}
                            required
                        />
                    </div>

                    <div className="col media-w-100 font-12">
                        <label className="lblDrugIns font-12">
                            نوع بیمه<span className="text-danger">*</span>
                        </label>
                        <SelectField
                            styles={selectfieldColourStyles}
                            options={insuranceType}
                            errorMessage={""}
                            error={false}
                            label={false}
                            name="EditInsuranceType"
                            placeholder={"نوع بیمه را انتخاب کنید "}
                            required
                            onChangeValue={(value) => FUSelectInsuranceType(value?.value)}
                            defaultValue={selectedType}
                            key={data.Type}
                        />
                    </div>

                    <div className="col media-w-100 font-12">
                        <label className="lblDrugIns font-12">
                            وضعیت بیمه<span className="text-danger">*</span>
                        </label>
                        <SelectField
                            styles={selectfieldColourStyles}
                            options={insuranceStatus}
                            errorMessage={""}
                            error={false}
                            label={false}
                            name="EditInsuranceStatus"
                            placeholder={"وضعیت بیمه را انتخاب کنید"}
                            required
                            onChangeValue={(value) =>
                                FUSelectInsuranceStatus(value?.value)
                            }
                            defaultValue={selectedStatus}
                            key={data.Status}
                        />
                    </div>
                */}
                    <div className="submit-section">
                        <button type="submit" className="btn btn-primary btn-save rounded">{submitText}</button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default InsuranceModal;