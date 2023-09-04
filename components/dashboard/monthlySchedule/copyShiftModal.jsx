import { useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DtPicker from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";
import SelectField from "components/commonComponents/selectfield";

const CopyShiftModal = ({ value }) => {
  const [date, setDate] = useState(null);

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
      id="copyShiftModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">کپی شیفت </p>
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
              <div className="">
                <p className="text-center">
                  شما در حال کپی شیفت ... به تاریخ {value?.weekDay?.name}{" "}
                  {value?.day} {value?.month?.name} می باشید
                </p>
              </div>

              <div className="shiftDatePickerContainer">
                <DtPicker
                  onChange={setDate}
                  local="fa"
                  headerClass="datePickerHeader"
                  inputClass="shiftDatePickerInput rounded font-12"
                  placeholder="انتخاب تاریخ"
                />
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary rounded btn-save"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CopyShiftModal;
