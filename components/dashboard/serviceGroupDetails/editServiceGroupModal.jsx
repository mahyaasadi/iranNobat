import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const EditServiceGroupModal = ({
  groupDetail,
  editGroup,
  srvGroupDifOptions,
  FUSelectSrvGroupDif,
}) => {
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
                styles={selectfieldColourStyles}
                options={srvGroupDifOptions}
                errorMessage={""}
                error={false}
                label={true}
                className="text-center font-12"
                placeholder={"میزان سختی را انتخاب کنید"}
                name="editGroupDif"
                onChangeValue={(value) => FUSelectSrvGroupDif(value?.value)}
                defaultValue={groupDetail.Dif}
                key={groupDetail.Dif}
                required
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
