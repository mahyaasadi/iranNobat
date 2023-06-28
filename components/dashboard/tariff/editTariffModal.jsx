import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Link from "next/link";

const EditTariffModal = ({ data, editService }) => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="editTariffModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="mb-0">ویرایش اطلاعات</h3>
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
              <form onSubmit={editService}>
                <div className="add-wrap">
                  <div className="d-flex gap-2">
                    <div className="form-group form-focus w-25">
                      <input
                        type="text"
                        className="form-control floating"
                        required
                        name="serviceId"
                        key={data._id}
                        defaultValue={data._id}
                      />
                      <label className="focus-label">
                        شناسه <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="form-group form-focus w-75">
                      <input
                        type="text"
                        className="form-control floating"
                        required
                        name="serviceName"
                        defaultValue={data.Service}
                        key={data.Service}
                      />

                      <label className="focus-label">
                        نام <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <div className="form-group form-focus w-50">
                      <input
                        type="text"
                        className="form-control floating"
                        name="total_K"
                        defaultValue={data.Total_K}
                        key={data.Total_K}
                      />
                      <label className="focus-label">ضریب K</label>
                    </div>
                    <div className="form-group form-focus w-50">
                      <input
                        type="text"
                        className="form-control floating"
                        name="tech_K"
                        key={data.Technical_K}
                        defaultValue={data.Technical_K}
                      />
                      <label className="focus-label">ضریب K فنی</label>
                    </div>

                    <div className="form-group form-focus w-50">
                      <input
                        type="text"
                        className="form-control floating"
                        name="pro_K"
                        key={data.Professional_K}
                        defaultValue={data.Professional_K}
                      />
                      <label className="focus-label">ضریب K حرفه ای</label>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <div className="form-group form-focus w-50">
                      <input
                        type="number"
                        className="form-control floating"
                        required
                        name="govTariff"
                        key={data.GovernmentalTariff}
                        defaultValue={data.GovernmentalTariff}
                      />
                      <label className="focus-label">
                        تعرفه دولتی<span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="form-group form-focus w-50">
                      <input
                        type="number"
                        className="form-control floating"
                        required
                        name="privateTariff"
                        key={data.PrivateTariff}
                        defaultValue={data.PrivateTariff}
                      />
                      <label className="focus-label p-1">
                        تعرفه خصوصی<span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-group form-focus">
                        <input
                          type="number"
                          className="form-control floating"
                          required
                          name="taminShare"
                          key={data.ST}
                          defaultValue={data.ST}
                        />
                        <label className="focus-label">سهم تامین</label>
                      </div>
                    </div>

                  <div className="col">
                    <div className="form-group form-focus">
                      <input
                        type="number"
                        className="form-control floating"
                        required
                        name="salamatShare"
                        key={data.SS}
                        defaultValue={data.SS}
                      />
                      <label className="focus-label">سهم سلامت</label>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group form-focus">
                      <input
                        type="number"
                        className="form-control floating"
                        required
                        name="arteshShare"
                        key={data.SA}
                        defaultValue={data.SA}
                      />
                      <label className="focus-label">سهم ارتش</label>
                    </div>
                  </div>
                </div>

                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">
                      ثبت تغییرات
                    </button>
                  </div>
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
