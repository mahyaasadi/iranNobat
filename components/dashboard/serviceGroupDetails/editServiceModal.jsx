import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const EditServiceModal = ({
  groupDetail,
  editServiceGroup,
  srvGroupList,
  FUSelectSrvGroupName,
}) => {

  const selectedSrvGroupName = {
    value: groupDetail.CenterGroup,
    label: groupDetail.CenterGroup,
  };

  return (
    <div
      className="modal fade contentmodal"
      id="editServiceModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <div className="loeing-header">
              <p className="mb-1 text-secondary font-16 fw-bold">
                ویرایش اطلاعات
              </p>
              <p className="ServiceName font-12">کد خدمت {groupDetail._id}</p>
            </div>

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
            <form onSubmit={editServiceGroup}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="srvGroupId"
                  value={groupDetail._id}
                />

                <input
                  type="hidden"
                  className="form-control floating"
                  name="ServiceName"
                  value={groupDetail.Service}
                />

                <label className="lblDrugIns font-12">
                  نام گروه<span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={selectfieldColourStyles}
                  options={srvGroupList}
                  className="text-center font-12"
                  errorMessage={""}
                  error={false}
                  label={true}
                  placeholder={"نام گروه را انتخاب کنید"}
                  name="srvGroupName"
                  onChangeValue={(value) => FUSelectSrvGroupName(value?.value)}
                  key={groupDetail.Service}
                  defaultValue={selectedSrvGroupName}
                  required
                />

                <div className="submit-section">
                  <button
                    type="submit"
                    className="btn btn-primary btn-save rounded"
                  >
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

export default EditServiceModal;
