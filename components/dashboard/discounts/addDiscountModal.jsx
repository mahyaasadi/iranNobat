import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const AddDiscountModal = ({
  data,
  addDiscount,
  FUSelectDiscountPercent,
  discountPercentDataClass,
  isLoading,
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
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن تخفیف
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
            <form onSubmit={addDiscount}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  نام <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  name="discountName"
                  required
                />
              </div>
              <div className="form-group ">
                <label className="lblAbs font-12">
                  مشخصات<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  name="discountDescription"
                  required
                />
              </div>
              <div className="form-group">
                <label className="lblAbs font-12">
                  درصد تخفیف <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  required
                  name="discountValue"
                />
              </div>

              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  روش محاسبه<span className="text-danger">*</span>
                </label>

                <SelectField
                  styles={selectfieldColourStyles}
                  options={discountPercentDataClass}
                  error={false}
                  label={true}
                  required
                  className="text-center"
                  placeholder={"روش محاسبه را انتخاب کنید"}
                  key={data.Percent}
                  onChangeValue={(value) =>
                    FUSelectDiscountPercent(value?.value)
                  }
                />
                <div className="submit-section">
                  {!isLoading ? (
                    <button
                      type="submit"
                      className="btn btn-primary rounded btn-save"
                    >
                      ثبت
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddDiscountModal;
