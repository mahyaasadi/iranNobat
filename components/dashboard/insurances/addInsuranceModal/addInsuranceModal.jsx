import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const AddInsuranceModal = ({
  data,
  addInsurance,
  name,
  insuranceType,
  insuranceStatus,
  handleNameInput,
  FUSelectInsuranceType,
  FUSelectInsuranceStatus,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addInsuranceModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h3 className="mb-0">اضافه کردن بیمه</h3>
            <button
              type="button"
              className="close-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i>
                <FeatherIcon icon="x-circle" />
              </i>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={addInsurance}>
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    value={name}
                    onChange={handleNameInput}
                    required
                  />
                  <label className="focus-label">
                    نام بیمه <span className="text-danger">*</span>
                  </label>
                </div>

                <SelectField
                  options={insuranceType}
                  errorMessage={""}
                  error={false}
                  label={false}
                  placeholder={"نوع بیمه را انتخاب کنید"}
                  isRequired={true}
                  onChangeValue={(value) => FUSelectInsuranceType(value?.value)}
                  key={data.Type}
                />
                <SelectField
                  options={insuranceStatus}
                  errorMessage={""}
                  error={false}
                  label={false}
                  placeholder={"وضعیت بیمه را انتخاب کنید"}
                  isRequired={true}
                  onChangeValue={(value) =>
                    FUSelectInsuranceStatus(value?.value)
                  }
                  key={data.Status}
                />

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save">
                    ثبت تغییرات
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddInsuranceModal;
