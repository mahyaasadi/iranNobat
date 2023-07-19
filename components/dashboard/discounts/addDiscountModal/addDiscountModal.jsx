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
                <div className="form-group">
                  <label className="lblAbs font-12">
                    نام <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    value={discountName}
                    onChange={handlediscountNameInput}
                    required
                    key={data.Name}
                  />
                </div>
                <div className="form-group ">
                  <label className="lblAbs font-12">
                    مشخصات<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    value={description}
                    onChange={handleDescriptionInput}
                    required
                    key={data.Des}
                  />
                </div>
                <div className="form-group">
                  <label className="lblAbs font-12">
                    درصد تخفیف <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    value={discountValue}
                    onChange={handlediscountValueInput}
                    required
                    key={data.Value}
                  />
                </div>

              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                 روش محاسبه<span className="text-danger">*</span>
                </label>

                <SelectField
                  styles={colourStyles}
                  options={discountPercentDataClass}
                  errorMessage={""}
                  error={false}
                  label={true}
                  required
                  placeholder={"روش محاسبه را انتخاب کنید"}
                  key={data.Percent}
                  onChangeValue={(value) =>
                    FUSelectDiscountPercent(value?.value)
                  }
                />
                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save rounded">
                    ثبت 
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
