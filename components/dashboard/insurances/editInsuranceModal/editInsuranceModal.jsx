import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const EditInsuranceModal = ({
  editInsurance,
  data,
  name,
  insuranceType,
  insuranceStatus,
  handleNameInput,
  FUSelectInsuranceType,
  FUSelectInsuranceStatus,
}) => {
  const selectedType = { value: data.Type, label: data.Type };
  const selectedStatus = { value: data.Status, label: data.Status };

   const colourStyles = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    control: (styles) => ({
      ...styles,
      minHeight: 43,
      borderRadius: 20,
      border: "1px solid #E6E9F4",
    }),
  };

  return (
    <div
      className="modal fade contentmodal"
      id="editInsuranceModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h5 className="mb-0">ویرایش اطلاعات</h5>
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
            <form onSubmit={editInsurance}>
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditInsuranceID"
                    value={data._id}
                  />
                 
                  <label className="lblAbs font-12">
                    نام بیمه <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="EditInsuranceName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                </div>

                <div className="col media-w-100 font-12">
                  <label className="lblDrugIns font-12">
                    نوع بیمه<span className="text-danger">*</span>
                  </label>
                  <SelectField
                    styles={colourStyles}
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
                    نوع بیمه<span className="text-danger">*</span>
                  </label>
                  <SelectField
                    styles={colourStyles}
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

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save rounded">
                    ثبت تغییرات
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditInsuranceModal;
