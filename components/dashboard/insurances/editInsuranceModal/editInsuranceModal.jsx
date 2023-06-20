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
            <h3 className="mb-0">ویرایش اطلاعات</h3>
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
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditInsuranceID"
                    value={data._id}
                  />
                  <input
                    type="text"
                    className="form-control floating"
                    name="EditInsuranceName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                </div>
                <SelectField
                  options={insuranceType}
                  errorMessage={""}
                  error={false}
                  label={false}
                  name="EditInsuranceType"
                  placeholder={"نوع بیمه را انتخاب کنید "}
                  isRequired={true}
                  onChangeValue={(value) => FUSelectInsuranceType(value?.value)}
                  defaultValue={selectedType}
                  key={data.Type}
                />
                <SelectField
                  options={insuranceStatus}
                  errorMessage={""}
                  error={false}
                  label={false}
                  name="EditInsuranceStatus"
                  placeholder={"وضعیت بیمه را انتخاب کنید"}
                  isRequired={true}
                  onChangeValue={(value) =>
                    FUSelectInsuranceStatus(value?.value)
                  }
                  defaultValue={selectedStatus}
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
export default EditInsuranceModal;
