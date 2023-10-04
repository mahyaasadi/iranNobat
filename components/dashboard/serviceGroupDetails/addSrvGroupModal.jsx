import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const AddSrvGroupModal = ({
  data,
  addGroup,
  FUSelectSrvGroupDif,
  srvGroupDifOptions,
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
  console.log(data);
  return (
    <div
      className="modal fade contentmodal"
      id="addSrvGroupModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن گروه خدمت
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
            <form onSubmit={addGroup}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  نام گروه <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control floating inputPadding rounded"
                  name="addGroupName"
                  required
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">مدت زمان (دقیقه)</label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="number"
                  name="addGroupPOT"
                />
              </div>

              <label className="lblDrugIns font-12">میزان سختی</label>
              <SelectField
                styles={colourStyles}
                options={srvGroupDifOptions}
                className="text-center font-12"
                errorMessage={""}
                error={false}
                label={true}
                placeholder={"میزان سختی را انتخاب کنید"}
                name="addGroupDif"
                onChangeValue={(value) => FUSelectSrvGroupDif(value?.value)}
                key={data.Dif}
              />

              <div className="form-group">
                <label className="lblAbs font-12">رنگ</label>
                <input
                  className="form-control floating srvColorPadding rounded"
                  type="color"
                  name="addGroupColor"
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
export default AddSrvGroupModal;
