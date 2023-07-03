import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const AddDiscountModal = ({
  data,
  discountName,
  description,
  discountValue,
  discountPercent,
  FUSelectDiscountPercent,
  handlediscountNameInput,
  handleDescriptionInput,
  handlediscountValueInput,
  discountPercentDataClass,
  addDiscount,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addDiscountModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <h5 className="mb-0">اضافه کردن تخفیف</h5>
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
            <form onSubmit={addDiscount}>
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    value={discountName}
                    onChange={handlediscountNameInput}
                    required
                    key={data.Name}
                  />
                  <label className="focus-label">
                    نام <span className="text-danger">*</span>
                  </label>
                </div>

                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    value={description}
                    onChange={handleDescriptionInput}
                    required
                    key={data.Des}
                  />
                  <label className="focus-label">
                    مشخصات<span className="text-danger">*</span>
                  </label>
                </div>

                <div className="form-group form-focus">
                  <input
                    type="text"
                    className="form-control floating"
                    value={discountValue}
                    onChange={handlediscountValueInput}
                    required
                    key={data.Value}
                  />
                  <label className="focus-label">
                    درصد تخفیف <span className="text-danger">*</span>
                  </label>
                </div>

                <SelectField
                  options={discountPercentDataClass}
                  errorMessage={""}
                  error={false}
                  label={true}
                  placeholder={"روش محاسبه را انتخاب کنید"}
                  isRequired={true}
                  onChangeValue={(value) =>
                    FUSelectDiscountPercent(value?.value)
                  }
                  key={data.Percent}
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
export default AddDiscountModal;
