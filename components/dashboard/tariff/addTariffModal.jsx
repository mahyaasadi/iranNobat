import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Link from "next/link";

const AddTariffModal = ({ addService }) => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="addTariffModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
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

            <div className="modal-body">
              <form onSubmit={addService}>
                <div className="d-flex gap-2">
                  <div className="form-group w-25">
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
                  <div className="form-group w-75">
                    <label className="lblAbs font-12">
                      نام <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control floating inputPadding rounded"
                      required
                      name="serviceName"
                    />
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <div className="form-group w-50">
                    <label className="lblAbs font-12">ضریب K</label>
                    <input
                      type="text"
                      className="form-control floating inputPadding rounded"
                      name="total_K"
                    />
                  </div>
                  <div className="form-group w-50">
                    <label className="lblAbs font-12">ضریب فنی K</label>
                    <input
                      type="text"
                      className="form-control floating inputPadding rounded"
                      name="tech_K"
                    />
                  </div>
                  <div className="form-group w-50">
                    <label className="lblAbs font-12">ضریب حرفه ای K</label>
                    <input
                      type="text"
                      className="form-control floating inputPadding rounded"
                      name="pro_K"
                    />
                  </div>
                </div>
                <div className="row">
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

                <div className="row">
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

                <div className="d-flex gap-2">
                  <div className="form-group w-50">
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

                  <div className="form-group w-50">
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

                <div className="row">
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
                  <button type="submit" className="btn btn-primary btn-save rounded">
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
export default AddTariffModal;
