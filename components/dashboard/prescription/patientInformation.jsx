import PatientInfo from "components/dashboard/prescription/PatientInfo";

const PatientInformation = ({
  getPatientInfo,
  data,
  changeInsuranceType,
  insuranceType,
  selectInsuranceType,
}) => {
  return (
    <>
      <div>
        <div className="card presCard">
          <div className="card-body">
            <form className="w-100" onSubmit={getPatientInfo}>
              <div className="input-group mb-3">
                <lable className="lblAbs font-12">
                  کد ملی / کد اتباع بیمار
                </lable>
                <input
                  type="text"
                  name="nationalCode"
                  required
                  className="form-control rounded-right GetPatientInput w-50"
                />
                <button
                  className="btn btn-primary rounded-left w-10 font-12"
                  id="basic-addon1"
                >
                  استعلام
                </button>
              </div>
            </form>

            <PatientInfo
              data={data}
              changeInsuranceType={changeInsuranceType}
              insuranceType={insuranceType}
              selectInsuranceType={selectInsuranceType}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default PatientInformation;
