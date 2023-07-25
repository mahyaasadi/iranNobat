import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Link from "next/link";

const AddTariffModal = ({ addService, srvGroupList, FUSelectSrvGroupName }) => {
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
        id="addTariffModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content media-modal-content">
            <div className="modal-header media-modal-header">
              <h5 className="mb-0">سرویس جدید</h5>
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
              <form onSubmit={addService}>
                <div className="row media-flex-col">
                  <div className="col-lg-2 col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        شناسه <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        required
                        name="serviceId"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        نام خدمت <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        required
                        name="serviceName"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col">
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
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب فنی K</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="tech_K"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب حرفه ای K</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="pro_K"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">مبلغ K فنی-خصوصی</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="ptk_price"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        مبلغ K حرفه ای-خصوصی
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="ppk_price"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">مبلغ K فنی-دولتی</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="gtk_price"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        مبلغ K حرفه ای-دولتی{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="gpk_price"
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
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">تعرفه آزاد</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="freeTariff"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        سهم بیمار خدمات و تامین{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="patientCost"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        سهم بیمار ارتش <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="arteshPatientCost"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم تامین</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="taminShare"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم سلامت</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="salamatShare"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم ارتش</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="arteshShare"
                      />
                    </div>
                  </div>
                </div>

                <div className="submit-section">
                  <button
                    type="submit"
                    className="btn btn-primary btn-save rounded"
                  >
                    ثبت
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
export default AddTariffModal;
