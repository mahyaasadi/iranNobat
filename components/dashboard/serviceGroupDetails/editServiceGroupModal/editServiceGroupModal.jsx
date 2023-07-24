import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const EditServiceGroupModal = ({
  groupDetail,
  editGroup,
  srvGroupDifOptions,
  FUSelectSrvGroupDif,
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
      id="editSrvGroupModal"
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
            <form onSubmit={editGroup}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="editGroupId"
                  value={groupDetail._id}
                />

                <label className="lblAbs font-12">
                  نام گروه <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  name="editGroupName"
                  defaultValue={groupDetail.Name}
                  key={groupDetail.Name}
                  required
                  type="text"
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  مدت زمان (دقیقه)<span className="text-danger"> *</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="number"
                  name="editGroupPOT"
                  defaultValue={groupDetail.POT}
                  key={groupDetail.POT}
                  required
                />
              </div>

              <label className="lblDrugIns font-12">
                میزان سختی<span className="text-danger">*</span>
              </label>
              <SelectField
                styles={colourStyles}
                options={srvGroupDifOptions}
                errorMessage={""}
                error={false}
                label={true}
                placeholder={"میزان سختی را انتخاب کنید"}
                required
                name="editGroupDif"
                onChangeValue={(value) => FUSelectSrvGroupDif(value?.value)}
                defaultValue={groupDetail.Dif}
                key={groupDetail.Dif}
              />

              <div className="form-group">
                <label className="lblAbs font-12">
                  رنگ <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating srvColorPadding rounded"
                  type="color"
                  name="editGroupColor"
                  defaultValue={groupDetail.Color}
                  key={groupDetail.Color}
                  required
                />
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
                >
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
