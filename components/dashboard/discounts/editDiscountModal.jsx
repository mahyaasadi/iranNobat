import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const EditDiscountModal = ({
  data,
  discountName,
  description,
  discountValue,
  FUSelectDiscountPercent,
  handlediscountNameInput,
  handleDescriptionInput,
  handlediscountValueInput,
  discountPercentDataClass,
  editDiscount,
}) => {
  
  let percentLabel = "محاسبه بر اساس مبلغ";
  let percent = 0;
  if (data.Percent) {
    percent = 1;
    percentLabel = "محاسبه بر اساس درصد";
  }

  const selectedPercent = { value: percent, label: percentLabel };
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
      id="editDiscountModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              ویرایش اطلاعات
            </p>
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
            <form onSubmit={editDiscount}>
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditDiscountID"
                    value={data._id}
                  />

                  <label className="lblAbs font-12">
                    نام <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    name="EditDiscountName"
                    defaultValue={data.Name}
                    onChange={handlediscountNameInput}
                    required
                    key={data.Name}
                  />
                </div>

                <div className="form-group">
                  <label className="lblAbs font-12">
                      مشخصات<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    name="EditDiscountDes"
                    defaultValue={data.Des}
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
                    name="EditDiscountValue"
                    defaultValue={data.Value}
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
                  <button type="submit" className="btn btn-primary btn-save">
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

export default EditDiscountModal;
