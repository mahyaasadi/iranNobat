import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";
import { Modal } from "react-bootstrap";

const InsuranceModal = ({
  mode = "add", // Default mode is 'add'
  onSubmit,
  data = {},
  name,
  handleNameInput,
  insuranceType,
  insuranceStatus,
  FUSelectInsuranceType,
  FUSelectInsuranceStatus,
  isLoading,
  show,
  onHide,
}) => {
  const title = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن بیمه";
  const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
  const selectedType =
    mode === "edit" ? { value: data.Type, label: data.Type } : null;
  const selectedStatus =
    mode === "edit" ? { value: data.Status, label: data.Status } : null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">{title}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          {mode === "edit" && (
            <input
              type="hidden"
              className="form-control floating"
              name="EditInsuranceID"
              value={data._id}
            />
          )}

          <div className="form-group">
            <label className="lblAbs font-12">
              نام بیمه <span className="text-danger">*</span>
            </label>
            <input
              className="form-control floating inputPadding rounded"
              type="text"
              name={mode === "edit" ? "EditInsuranceName" : "AddInsuranceName"}
              defaultValue={mode === "edit" ? data.Name : name}
              key={data.Name}
              onChange={handleNameInput}
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
              className="text-center"
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
              className="text-center"
              onChangeValue={(value) => FUSelectInsuranceStatus(value?.value)}
              defaultValue={selectedStatus}
              key={data.Status}
            />
          </div>

          <div className="submit-section">
            {!isLoading ? (
              <button
                type="submit"
                className="btn btn-primary rounded btn-save"
              >
                {submitText}
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary rounded"
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

export default InsuranceModal;
