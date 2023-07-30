import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import SelectField from "components/commonComponents/selectfield";

const AddShiftModal = ({ value }) => {
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
      id="addShiftModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اطلاعات شیفت جدید
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
            <form>
              <div className="form-group">
                <label className="lblAbs font-12">
                  نام شیفت <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    // name="userFullName"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="col media-w-100 font-13">
                <label className="lblDrugIns font-12">
                  اپراتور <span className="text-danger">*</span>
                </label>

                <SelectField
                  styles={colourStyles}
                  className="text-center"
                  options=""
                  errorMessage={""}
                  error={false}
                  label={true}
                  required
                  placeholder={"انتخاب نمایید"}
                  //   key={data.Percent}
                  //   onChangeValue={(value) =>
                  //     FUSelectDiscountPercent(value?.value)
                  //   }
                />
              </div>

              <div className="row marginb-md1">
                <div className="col">
                  <label className="lblAbs font-12">
                    زمان شروع <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    // name="userFullName"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>

                <div className="col">
                  <label className="lblAbs font-12">
                    زمان پایان <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    // name="userFullName"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  تعداد انجام گروه ها <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    // name="userFullName"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="row gap-1 justify-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary rounded btn-save font-14 col-11 col-md-5"
                >
                  محاسبه زمان
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded btn-save font-14 col-11 col-md-5"
                >
                  ثبت شیفت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddShiftModal;
