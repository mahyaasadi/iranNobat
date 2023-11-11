import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Select from "react-select";
import FeatherIcon from "feather-icons-react";
import { ErrorAlert } from "class/AlertManage.js";
import selectfieldColourStyles from "class/selectfieldStyle";

let CenterID = null;
const AddNewPatient = ({ UserData, AddPatient, CenterID, ActivePatientID }) => {
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

    if (formProps.PatientID.length < 10 && !formProps.Foreigners) {
      ErrorAlert("خطا", "کد ملی بیمار نمی تواند کمتر از 10 رقم باشد");
    } else if (formProps.PatientID.length < 12 && formProps.Foreigners) {
      ErrorAlert("خطا", "کد اتباع نمی تواند کمتر از 12 رقم باشد");
    } else if (formProps.PatientTel.length != 11) {
      ErrorAlert("خطا", "شماره همراه باید حداقل دارای 11 رقم باشد");
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
              <h5 className="mb-0 text-secondary">اضافه کردن بیمار</h5>
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
                      کد ملی بیمار <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded padding-right-2"
                      id="addPatientID"
                      name="PatientID"
                      required
                    />
                  </div>

                  <div className="col-md-12 media-w-100 mt-3">
                    <label className="lblAbs margin-top-25 font-12">
                      شماره موبایل <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded padding-right-2"
                      id="addPatientTel"
                      name="PatientTel"
                      required
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
                        نام و نام خانوادگی{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded padding-right-2"
                        id="addPatientName"
                        name="PatientName"
                        required
                      />
                    </div>
                    <div className="col-md-12 media-w-100 mt-3">
                      <label className="lblAbs margin-top-25 font-12">
                        جنسیت <span className="text-danger">*</span>
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
                        required
                      />
                    </div>
                    <div className="col-md-12 media-w-100 mt-3">
                      <label className="lblAbs margin-top-25 font-12">
                        تاریخ تولد <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded padding-right-2"
                        id="addPatientBD"
                        name="PatientBD"
                        required
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

export default AddNewPatient;
