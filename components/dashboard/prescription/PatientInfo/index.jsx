import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import ChangeInsuranceTypeModal from "components/dashboard/prescription/changeInsuranceTypeModal/changeInsuranceTypeModal"

const PatientInfo = ({
  getPatientInfo,
  data,
  changeInsuranceType,
  insuranceType,
  selectInsuranceType,
  getAppointment
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

            <div className="font-13 mt-3" id="patientInfoSection">
              <div className="smartphone-container border-radius font-13 phone-input">
                <div className="d-flex smartphone-padding">
                  <i className="smartphone-icon">
                    <FeatherIcon icon="smartphone" />
                  </i>
                  <p id="PatientTel">{data.Tel}</p>
                  <i className="editPhone-icon">
                    <FeatherIcon icon="edit-2" />
                  </i>
                </div>
              </div>

              <div className="">
                <p className="mt-3">{data.Name}</p>
                <p className="mt-3">سن بیمار : {data.Age}</p>
                <p className="mt-3">تاریخ اعتبار تا {data.accountValidto}</p>

                <div className="d-flex gap-2">
                  <p>بیمه : {data.InsuranceName}</p>
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#changeInsuranceTypeModal"
                  >
                    <i className="margin-right-2 themecolor">
                      <FeatherIcon icon="refresh-cw" />
                    </i>
                  </Link>
                </div>
                <p>نوع بیمه : {data.InsuranceTypeName}</p>
              </div>

              <div className="appointmentBtn">
                <button
                  className="btn btn-primary w-75 font-13 mt-4 appointmentBtn-radius"
                  onClick={getAppointment}
                >
                  دریافت نوبت
                </button>
              </div>

              <ChangeInsuranceTypeModal
                changeInsuranceType={changeInsuranceType}
                selectInsuranceType={selectInsuranceType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PatientInfo;
