import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import PrescriptionType from "components/dashboard/prescription/prescriptionType";

const PrescriptionCard = ({ lists, onSelect, changePrescId }) => {
  return (
    <>
      <div className="col-xl-8 col-sm-6 col-12 patientInfo-container">
        <div className="prescriptionInfoCard">
          <div className="prescript-body">
            <div className="prescript-header">
              <div className="prescript-title">نسخه جدید</div>

              <div className="prescript-btns d-flex gap-2">
                <div className="btn border-radius visitBtn font-13">
                  فقط ثبت ویزیت
                </div>
                <div className="btn btn-primary border-radius font-13">
                  ثبت نسخه نهایی
                </div>
              </div>
            </div>

            {/*  */}
            <div className="card-body">
              <ul class="nav nav-tabs nav-tabs-bottom">
                {lists.map((item) => {
                  return (
                    <PrescriptionType
                      key={item.type}
                      name={item.name}
                      img={item.img}
                      active={item.Active}
                      id={item.id}
                      onSelect={onSelect}
                      changePrescId={changePrescId}
                    />
                  );
                })}
              </ul>

              <div className="tab-content">
                <div className="tab-pane show active" id="bottom-tab1">
                  <form className="w-75">
                    <lable className="lblDrug font-12">نام دارو</lable>
                    <input
                      className="form-control inputRounded"
                      type="text"
                      name="nationalCode"
                    />
                    <i className="text-secondary">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-search"
                      >
                        <g>
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </g>
                      </svg>
                    </i>

                    <SelectField
                      options={""}
                      errorMessage={""}
                      error={false}
                      label={true}
                      placeholder={"روش محاسبه را انتخاب کنید"}
                      className=""
                    />
                  </form>
                </div>
                <div className="tab-pane" id="bottom-tab2">
                  Tab content 2
                </div>
                <div className="tab-pane" id="bottom-tab3">
                  Tab content 3
                </div>
                <div className="tab-pane show" id="bottom-tab4">
                  Tab content 4
                </div>
                <div className="tab-pane" id="bottom-tab5">
                  Tab content 5
                </div>
                <div className="tab-pane" id="bottom-tab6">
                  Tab content 6
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
export default PrescriptionCard;
