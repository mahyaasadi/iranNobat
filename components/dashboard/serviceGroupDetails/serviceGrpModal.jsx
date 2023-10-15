import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const ServiceGrpModal = ({
  mode = "add",
  onSubmit,
  groupDetail,
  srvGroupDifOptions,
  FUSelectSrvGroupDif,
  isLoading,
  show,
  onHide,
}) => {
  const modalTitle =
    mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن گروه خدمت";
  const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
  const selectedDif =
    mode == "edit" ? { value: groupDetail.Dif, label: groupDetail.Dif } : null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          {mode === "edit" && (
            <input type="hidden" name="editGroupId" value={groupDetail._id} />
          )}

          <div className="form-group">
            <label className="lblAbs font-12">
              نام گروه <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control floating inputPadding rounded"
              name={mode == "edit" ? "editGroupName" : "addGroupName"}
              defaultValue={mode == "edit" ? groupDetail.Name : ""}
              key={groupDetail.Name}
              required
            />
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">
              مدت زمان (دقیقه)<span className="text-danger"> *</span>
            </label>
            <input
              type="number"
              className="form-control floating inputPadding rounded"
              name={mode == "edit" ? "editGroupPOT" : "addGroupPOT"}
              defaultValue={mode == "edit" ? groupDetail.POT : ""}
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
            name={mode == "edit" ? "editGroupDif" : "addGroupDif"}
            onChangeValue={(value) => FUSelectSrvGroupDif(value?.value)}
            defaultValue={mode == "edit" ? selectedDif : ""}
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
              name={mode == "edit" ? "editGroupColor" : "addGroupColor"}
              defaultValue={mode == "edit" ? groupDetail.Color : ""}
              key={groupDetail.Color}
              required
            />
          </div>

          <div className="submit-section">
            {!isLoading ? (
              <button
                type="submit"
                className="btn btn-primary rounded btn-save font-13"
              >
                {submitText}
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary rounded font-13"
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
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceGrpModal;

