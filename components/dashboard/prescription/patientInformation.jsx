import PatientInfo from "components/dashboard/prescription/PatientInfo";

const PatientInformation = ({ getPatientInfo, data }) => {
  return (
    <>
      <div className="col-xl-2 col-sm-6 col-12 patientInfo-container">
        <div className="patientInfoCard">
          <div className="card-body">
            <form onSubmit={getPatientInfo}>
              <lable className="lblGetPatient font-12">
                کد ملی / کد اتباع بیمار
              </lable>
              <input
                className="form-control rounded GetPatientInput"
                type="text"
                name="nationalCode"
              />
              <button className="btn btn-primary rounded font-12 GetPatientBtn">
                استعلام
              </button>
            </form>

            <PatientInfo data={data}/>
          </div>
        </div>
      </div>
    </>
  );
};
export default PatientInformation;
