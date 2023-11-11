import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { axiosClient } from "class/axiosConfig";
import { Tooltip } from "primereact/tooltip";
import FeatherIcon from "feather-icons-react";
import { ErrorAlert, SuccessAlert } from "class/AlertManage";
import { gender, insurance } from "components/commonComponents/imagepath";
import EditPatientInfoModal from "./editPatientInfo";
import ChangeInsuranceTypeModal from "components/dashboard/prescription/changeInsuranceTypeModal";

let CenterID = null;
const PatientInfo = ({
  data,
  getPatientInfo,
  setPatientsInfo,
  ActivePatientID,
  changeInsuranceType,
  getAppointment,
  UserData,
  isLoading,
}) => {
  CenterID = UserData.CenterID;
  console.log({ data, ActivePatientID });

  const [showModal, setShowModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const dateFormat = (str) => {
    if (str !== " " || str !== null) {
      let date =
        str.substr(0, 4) + "/" + str.substr(4, 2) + "/" + str.substr(6, 7);
      return date;
    } else {
      return 0;
    }
  };

  const handleChangePatientInfo = (type, value) => {
    console.log(`Changing ${type} to ${value}`);
    // setIsLoading(true);

    let url = "reception/ChangeProfileData";
    let updatedInfo = {
      CenterID,
      NID: ActivePatientID,
      col: type,
      val: value,
    };

    console.log({ updatedInfo });

    axiosClient
      .post(url, updatedInfo)
      .then((response) => {
        // console.log(response.data);
        if (type === "Age") {
          data.Age = value;
        } else if (type === "Name") {
          data.Name = value;
        } else if (type === "Gender") {
          data.Gender = value;
        } else if (type === "Tel") {
          data.Tel = value;
        } else if (type === "NationalID") {
          data.NationalID = value;
        }

        setPatientsInfo([]);
        setTimeout(() => {
          setPatientsInfo(data);
        }, 100);

        handleCloseModal();
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setIsLoading(false);
      });
  };

  return (
    <>
      <div className="card presCard">
        <div className="card-body">
          <form className="w-100" onSubmit={getPatientInfo}>
            <div className="input-group mb-3">
              <label className="lblAbs font-12">کد ملی / کد اتباع بیمار</label>
              <input
                type="text"
                name="nationalCode"
                required
                className="form-control rounded-right GetPatientInput w-50"
                defaultValue={ActivePatientID}
              />
              <button
                className="btn btn-primary rounded-left w-10 font-12"
                id="frmPatientInfoBtnSubmit"
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
                <Link
                  href="#"
                  onClick={handleShowModal}
                  className="editPhone-icon"
                  data-pr-position="top"
                >
                  <Tooltip target=".editPhone-icon">تغییر شماره همراه</Tooltip>
                  <FeatherIcon icon="edit-2" className="themeColor" />
                </Link>
              </div>
            </div>

            <div className="margin-right-1 font-12 mt-3">
              <div className="d-flex gap-2 mb-2">
                <FeatherIcon icon="user" className="mb-0" />
                {data.Name}
                {data.Age ? <p className="m-0">- {data.Age} ساله</p> : ""}
              </div>

              <div className="d-flex gap-1 align-items-center">
                <Image src={gender} alt="genderIcon" width="20" />
                {data.Gender ? data.Gender : "-"}
              </div>

              <div className="d-flex gap-2 mt-2">
                <div className="d-flex gap-1 align-items-center">
                  <Image src={insurance} alt="insuranceIcon" width="20" />
                  {data.InsuranceName}
                </div>

                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#changeInsuranceTypeModal"
                  className="changeInsuranceBtn"
                  data-pr-position="top"
                >
                  <Tooltip target=".changeInsuranceBtn">تغییر نوع بیمه</Tooltip>
                  <i className="margin-right-2 themecolor">
                    <FeatherIcon icon="refresh-cw" style={{ width: "15px" }} />
                  </i>
                </Link>
              </div>

              {/* <p>نوع بیمه : {data.InsuranceTypeName}</p> */}

              <p className="mt-2 margin-right-sm">
                تاریخ اعتبار تا {""}
                {data.accountValidto && dateFormat(`${data.accountValidto}`)}
              </p>
            </div>

            <div className="appointmentBtn">
              <button
                className="btn btn-primary w-100 font-13 rounded"
                onClick={getAppointment}
              >
                دریافت نوبت
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangeInsuranceTypeModal
        data={data}
        changeInsuranceType={changeInsuranceType}
        UserData={UserData}
        isLoading={isLoading}
      />

      <EditPatientInfoModal
        data={data}
        UserData={UserData}
        showModal={showModal}
        handleClose={handleCloseModal}
        isLoading={isLoading}
        handleChangePatientInfo={handleChangePatientInfo}
      />
    </>
  );
};

export default PatientInfo;
