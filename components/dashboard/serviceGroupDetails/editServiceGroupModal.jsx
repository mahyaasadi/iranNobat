import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const EditServiceGroupModal = ({ data }) => {
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
      id="editServiceGroupModal"
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
            <form>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  // name="EditDiscountID"
                  // value={data._id}
                />

                <label className="lblAbs font-12">نام گروه</label>
                <input
                  className="form-control floating inputPadding rounded"
                  // name="EditDiscountName"
                  // defaultValue={data.Name}
                  // onChange={handlediscountNameInput}
                  // required
                  // key={data.Name}
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  مدت زمان<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  // name="EditDiscountDes"
                  // defaultValue={data.Des}
                  // onChange={handleDescriptionInput}
                  // required
                  // key={data.Des}
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  میزان سختی<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  // name="EditDiscountDes"
                  // defaultValue={data.Des}
                  // onChange={handleDescriptionInput}
                  // required
                  // key={data.Des}
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  رنگ <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="color"
                  // name="EditDiscountDes"
                  // defaultValue={data.Des}
                  // onChange={handleDescriptionInput}
                  // required
                  // key={data.Des}
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

export default EditServiceGroupModal;
