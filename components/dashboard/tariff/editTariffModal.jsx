import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Link from "next/link";

const EditTariffModal = ({
  data,
  editService,
  srvGroupList,
  FUSelectSrvGroupName,
}) => {
  const selectedSrvGroupName = {
    value: data.CenterGroup,
    label: data.CenterGroup,
  };

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
    <>
      <div
        className="modal fade contentmodal"
        id="editTariffModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content media-modal-content">
            <div className="modal-header media-modal-header">
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

            <div className="modal-body media-modal-body">
              <form onSubmit={editService}>
                <div className="row media-flex-col align-end">
                  <div className="col col-lg-2">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        شناسه <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        required
                        name="serviceId"
                        key={data._id}
                        defaultValue={data._id}
                      />
                    </div>
                  </div>

                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        نام <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        required
                        name="serviceName"
                        defaultValue={data.Service}
                        key={data.Service}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col font-13">
                    <label className="lblDrugIns font-12">
                      نام گروه<span className="text-danger">*</span>
                    </label>
                    <SelectField
                      styles={colourStyles}
                      options={srvGroupList}
                      errorMessage={""}
                      error={false}
                      label={true}
                      placeholder={"نام گروه را انتخاب کنید"}
                      required
                      name="srvGroupName"
                      onChangeValue={(value) =>
                        FUSelectSrvGroupName(value?.value)
                      }
                      defaultValue={selectedSrvGroupName}
                      key={data.CenterGroup}
                    />
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب K</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="total_K"
                        defaultValue={data.Total_K}
                        key={data.Total_K}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب K فنی</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="tech_K"
                        key={data.Technical_K}
                        defaultValue={data.Technical_K}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب K حرفه ای</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="pro_K"
                        key={data.Professional_K}
                        defaultValue={data.Professional_K}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        مبلغ K فنی-خصوصی
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="ptk_price"
                        key={data.PrivateTechnicalK_Price}
                        defaultValue={data.PrivateTechnicalK_Price}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        مبلغ K حرفه ای-خصوصی
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="ppk_price"
                        key={data.PrivateProfessionalK_Price}
                        defaultValue={data.PrivateProfessionalK_Price}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        مبلغ K فنی-دولتی<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="gtk_price"
                        key={data.GovernmentalTechnicalK_Price}
                        defaultValue={data.GovernmentalTechnicalK_Price}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        مبلغ K حرفه ای-دولتی{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="gpk_price"
                        key={data.GovernmentalProfessionalK_Price}
                        defaultValue={data.GovernmentalProfessionalK_Price}
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        تعرفه دولتی<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="govTariff"
                        key={data.GovernmentalTariff}
                        defaultValue={data.GovernmentalTariff}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        تعرفه خصوصی<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="privateTariff"
                        key={data.PrivateTariff}
                        defaultValue={data.PrivateTariff}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        تعرفه آزاد <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="freeTariff"
                        key={data.FreeTariff}
                        defaultValue={data.FreeTariff}
                      />
                    </div>
                  </div>
                </div>

                {/*  */}
                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        سهم بیمار خدمات و تامین{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="patientCost"
                        key={data.PatientCost}
                        defaultValue={data.PatientCost}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم بیمار ارتش</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="arteshPatientCost"
                        key={data.ArteshPatientCost}
                        defaultValue={data.ArteshPatientCost}
                      />
                    </div>
                  </div>
                </div>

                {/*  */}
                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">سهم تامین</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="taminShare"
                        key={data.ST}
                        defaultValue={data.ST}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">سهم سلامت</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="salamatShare"
                        key={data.SS}
                        defaultValue={data.SS}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">سهم ارتش</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="arteshShare"
                        key={data.SA}
                        defaultValue={data.SA}
                      />
                    </div>
                  </div>
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
    </>
  );
};
export default EditTariffModal;
