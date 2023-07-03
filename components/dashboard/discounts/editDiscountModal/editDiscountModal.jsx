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
            <h5 className="mb-0">ویرایش اطلاعات </h5>
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
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="EditDiscountID"
                    value={data._id}
                  />

                  <input
                    type="text"
                    className="form-control floating"
                    name="EditDiscountName"
                    defaultValue={data.Name}
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
                    name="EditDiscountDes"
                    defaultValue={data.Des}
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
                    name="EditDiscountValue"
                    defaultValue={data.Value}
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
                  name="EditDiscountPercent"
                  defaultValue={selectedPercent}
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

export default EditDiscountModal;
