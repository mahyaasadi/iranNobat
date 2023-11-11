import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import Select from "react-select";
import FeatherIcon from "feather-icons-react";
import { ErrorAlert } from "class/AlertManage.js";
import selectfieldColourStyles from "class/selectfieldStyle";

export const getServerSideProps = async ({ req, res }) => {
  const result = await getSession(req, res);

  if (result) {
    const { UserData, UserRoles } = result;
    const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
    const Menus = await data.json();
    return { props: { Menus, UserData, UserRoles } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

let CenterID = null;
const NewPatient = ({ UserData, AddPatient, selectInsuranceType }) => {
  CenterID = UserData.CenterID;

  const [insuranceOptionsList, setInsuranceOptionsList] = useState([]);
  const [genderOptionsList, setGenderOptionsList] = useState([
    { label: "مرد", value: "0" },
    { label: "زن", value: "1" },
  ]);

  const ChangeForeigners = (e) => {
    if (e.target.checked) {
      $("#addPatientIDLbl").html("کد اتباع");
    } else {
      $("#addPatientIDLbl").html("کد ملی بیمار");
    }
  };
  const AddPatientCheck = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if (formProps.PatientID == "") {
      ErrorAlert("خطا", "کد ملی بیمار نمی تواند خالی باشد");
    } else if (formProps.PatientID.length < 10 && !formProps.Foreigners) {
      ErrorAlert("خطا", "کد ملی بیمار نمی تواند کمتر از 10 رقم باشد");
    } else if (formProps.PatientID.length < 12 && formProps.Foreigners) {
      ErrorAlert("خطا", "کد اتباع نمی تواند کمتر از 12 رقم باشد");
    } else if (
      formProps.PatientName == "" &&
      formProps.insuranceTypeOptions == 4
    ) {
      ErrorAlert("خطا", "نام بیمار نمی تواند خالی باشد");
    } else if (formProps.PatientTel == "") {
      ErrorAlert("خطا", "تلفن بیمار نمی تواند خالی باشد");
    } else if (formProps.PatientTel.length != 11) {
      ErrorAlert("خطا", "شماره موبایل بیمار اشتباه است");
    } else if (
      formProps.PatientBD == "" &&
      formProps.insuranceTypeOptions == 4
    ) {
      ErrorAlert("خطا", "تاریخ تولد بیمار نمی تواند خالی باشد");
    } else if (
      formProps.genderOptions == "" &&
      formProps.insuranceTypeOptions == 4
    ) {
      ErrorAlert("خطا", "جنسیت بیمار نمی تواند خالی باشد");
    } else {
      AddPatient(formProps);
    }
  };

  // insuranceType optionsList
  const getInsuranceList = () => {
    let url = `Patient/getInsuranceType/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        let selectData = [];
        for (let i = 0; i < response.data.length; i++) {
          const sel = response.data[i];
          let obj = {
            value: sel.id,
            label: sel.Name,
          };
          selectData.push(obj);
        }
        setInsuranceOptionsList(selectData);
      })
      .catch((error) => console.log(error));
  };

  const handleOnChange = (InsType) => {
    if (InsType.value === 4 || InsType.value === 3) {
      $("#FreePatientSection").show();
    } else {
      $("#FreePatientSection").hide();
    }
  };

  useEffect(() => getInsuranceList(), []);

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="newPatientModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="mb-0">اضافه کردن بیمار</h5>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i>
                  <FeatherIcon icon="x" />
                </i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={AddPatientCheck}>
                <div className="form-group">
                  <div className="form-check m-3">
                    <input
                      className="form-check-input"
                      onChange={ChangeForeigners}
                      type="checkbox"
                      value="1"
                      id="Foreigners"
                      name="Foreigners"
                    />
                    <label className="form-check-label">اتباع</label>
                  </div>
                  <div className="col-md-12 media-w-100 mt-3">
                    <label
                      id="addPatientIDLbl"
                      className="lblAbs margin-top-25 font-12"
                    >
                      کد ملی بیمار
                    </label>
                    <input
                      type="text"
                      className="form-control rounded padding-right-2"
                      id="addPatientID"
                      name="PatientID"
                    />
                  </div>
                  <div className="col-md-12 media-w-100 mt-3">
                    <label className="lblAbs margin-top-25 font-12">
                      شماره موبایل
                    </label>
                    <input
                      type="text"
                      className="form-control rounded padding-right-2"
                      id="addPatientTel"
                      name="PatientTel"
                    />
                  </div>
                  <div className="col-md-12 media-w-100 mt-3">
                    <label className="lblAbs margin-top-25 font-12">
                      انتخاب نوع بیمه
                    </label>
                    <Select
                      styles={selectfieldColourStyles}
                      className="w-100 font-12 text-center prescForm mt-3"
                      options={insuranceOptionsList}
                      required
                      name="insuranceTypeOptions"
                      placeholder="نوع بیمه مورد نظر را انتخاب نمایید"
                      id="addInsuranceType"
                      instanceId="addInsuranceType"
                      onChangeValue={(value) =>
                        selectInsuranceType(value?.value)
                      }
                      onChange={handleOnChange}
                    />
                  </div>

                  <div id="FreePatientSection" className="disNone">
                    <div className="col-md-12 media-w-100 mt-3">
                      <label className="lblAbs margin-top-25 font-12">
                        نام و نام خانوادگی
                      </label>
                      <input
                        type="text"
                        className="form-control rounded padding-right-2"
                        id="addPatientName"
                        name="PatientName"
                      />
                    </div>
                    <div className="col-md-12 media-w-100 mt-3">
                      <label className="lblAbs margin-top-25 font-12">
                        جنسیت
                      </label>
                      <Select
                        styles={selectfieldColourStyles}
                        className="w-100 font-12 text-center prescForm mt-3"
                        options={genderOptionsList}
                        name="genderOptions"
                        placeholder="جنسیت بیمار را مشخص کنید"
                        id="addGenderType"
                        instanceId="addGenderType"
                        onChangeValue={(value) =>
                          selectInsuranceType(value?.value)
                        }
                      />
                    </div>
                    <div className="col-md-12 media-w-100 mt-3">
                      <label className="lblAbs margin-top-25 font-12">
                        تاریخ تولد
                      </label>
                      <input
                        type="text"
                        className="form-control rounded padding-right-2"
                        id="addPatientBD"
                        name="PatientBD"
                      />
                    </div>
                  </div>
                </div>

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save">
                    اضافه کردن بیمار
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

export default NewPatient;
