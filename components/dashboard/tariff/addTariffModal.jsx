import FeatherIcon from "feather-icons-react";
import Link from "next/link";

const AddTariffModal = ({ addService, srvGroupList, FUSelectSrvGroupName }) => {
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
              <p className="mb-0 text-secondary font-14 fw-bold">سرویس جدید</p>
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
                <div className="row media-flex-col align-end">
                  <div className="col">
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

                  <div className="col">
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

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">کد داخلی</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="addInternalCode"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        ضریب K <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="total_K"
                        required
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        ضریب فنی K <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="tech_K"
                        required
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        ضریب حرفه ای K <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="pro_K"
                        required
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
