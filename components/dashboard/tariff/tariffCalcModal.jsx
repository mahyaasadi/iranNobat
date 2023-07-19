import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Select from "react-select";
import Link from "next/link";
import Loading from "components/loading/loading";

const TariffCalcModal = ({
  data,
  isLoading,
  calculationsOptions,
  applyKCalculations,
  applyPercentCalculations,
  applyPriceCalculations,
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
    <>
      <div
        className="modal fade contentmodal"
        id="tariffCalcModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="mb-0">اعمال محاسبات</h5>
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
              <div className="card-header tariffCalcModal">
                <ul
                  role="tablist"
                  className="nav nav-tabs nav-tabs-bottom tabs-scroll font-13 padding-bottom-md"
                >
                  <li className="nav-item text-center">
                    <a
                      href="#tab-1"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      محاسبه بر اساس K
                    </a>
                  </li>
                  <li className="nav-item text-center">
                    <a href="#tab-2" data-bs-toggle="tab" className="nav-link">
                      محاسبه بر اساس مبلغ
                    </a>
                  </li>
                  <li className="nav-item text-center">
                    <a href="#tab-3" data-bs-toggle="tab" className="nav-link">
                      محاسبه بر اساس درصد
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body pt-4">
                {/* tab-1 : Based On K */}
                <div className="tab-content pt-0">
                  <div
                    role="tabpanel"
                    id="tab-1"
                    className="tab-pane fade show active"
                  >
                    <form
                      className="tariffCalcForm"
                      onSubmit={applyKCalculations}
                    >
                      <div className="form-group col-9 col-xl-10">
                        <input
                          type="hidden"
                          className="form-control floating"
                          required
                          name="serviceId"
                          key={data._id}
                          defaultValue={data._id}
                        />

                        <label className="lblAbs font-12">
                          K فنی-خصوصی <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control floating inputPadding rounded"
                          type="number"
                          required
                          name="pkf"
                        />
                      </div>

                      <div className="form-group col-9 col-xl-10">
                        <label className="lblAbs font-12">
                          K حرفه ای-خصوصی <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control floating inputPadding rounded"
                          type="number"
                          required
                          name="pkh"
                        />
                      </div>

                      <div className="form-group col-9 col-xl-10">
                        <label className="lblAbs font-12">
                          K فنی-دولتی <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control floating inputPadding rounded"
                          type="number"
                          required
                          name="gkf"
                        />
                      </div>

                      <div className="form-group col-9 col-xl-10">
                        <label className="lblAbs font-12">
                          K فنی-دولتی <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control floating inputPadding rounded"
                          type="number"
                          required
                          name="gkh"
                        />
                      </div>

                      {isLoading ? (
                        <button
                          className="btn btn-primary btn-save mt-4 rounded"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm margin-left-4"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          در حال پردازش
                        </button>
                      ) : (
                        <div className="submit-section calcSubmit-btn">
                          <button
                            type="submit"
                            className="btn btn-primary btn-save mt-4 rounded"
                          >
                            ثبت
                          </button>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* tab-2 : Based On Price*/}
                  <div role="tabpanel" id="tab-2" className="tab-pane fade">
                    <form
                      className="tariffCalcForm"
                      onSubmit={applyPriceCalculations}
                    >
                      <div className="form-group col-9 col-xl-10">
                        <label className="lblAbs font-12">
                          K فنی-دولتی <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control floating inputPadding rounded marginb-md1"
                          type="text"
                          required
                          name="price"
                          placeholder="مبلغ مورد نظر را وارد نمایید"
                        />

                        <div className="col media-w-100 font-12">
                          <label className="lblDrugIns margin-top-right font-12">
                            روش اعمال<span className="text-danger">*</span>
                          </label>
                          <Select
                            styles={colourStyles}
                            className="select mt-3"
                            options={calculationsOptions}
                            required
                            name="applyPriceOptions"
                            placeholder=""
                            id="long-value-select"
                            instanceId="long-value-select"
                          />
                        </div>
                      </div>

                      {isLoading ? (
                        <button
                          className="btn btn-primary btn-save mt-4 rounded"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm margin-left-4"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          در حال پردازش
                        </button>
                      ) : (
                        <div className="submit-section calcSubmit-btn">
                          <button
                            type="submit"
                            className="btn btn-primary btn-save mt-4 rounded"
                          >
                            ثبت
                          </button>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* tab-3 : Based On Percent */}
                  <div role="tabpanel" id="tab-3" className="tab-pane fade">
                    <form
                      className="tariffCalcForm"
                      onSubmit={applyPercentCalculations}
                    >
                      <div className="form-group col-9 col-xl-10">
                        <label className="lblAbs font-12">
                          درصد<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control floating inputPadding rounded marginb-md1"
                          type="text"
                          required
                          name="percent"
                          placeholder="درصد مورد نظر را وارد نمایید"
                        />

                        <div className="col media-w-100 font-12">
                          <label className="lblDrugIns margin-top-right font-12">
                            روش اعمال<span className="text-danger">*</span>
                          </label>
                          <Select
                            styles={colourStyles}
                            className="select mt-3"
                            name="applyPercentOptions"
                            options={calculationsOptions}
                            placeholder=""
                            required
                            id="long-value-select"
                            instanceId="long-value-select"
                          />
                        </div>
                      </div>

                      {isLoading ? (
                        <button
                          className="btn btn-primary btn-save mt-4 rounded"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm margin-left-4"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          در حال پردازش
                        </button>
                      ) : (
                        <div className="submit-section calcSubmit-btn">
                          <button
                            type="submit"
                            className="btn btn-primary btn-save mt-4 rounded"
                          >
                            ثبت
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TariffCalcModal;
