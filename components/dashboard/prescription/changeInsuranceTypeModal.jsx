import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import SelectField from "components/commonComponents/selectfield";
import FeatherIcon from "feather-icons-react";
import selectfieldColourStyles from "class/selectfieldStyle";

let CenterID = null;

const ChangeInsuranceTypeModal = ({
  changeInsuranceType,
  selectInsuranceType,
  data,
  UserData,
  isLoading,
}) => {
  CenterID = UserData.CenterID;

  const [insuranceOptionsList, setInsuranceOptionsList] = useState([]);

  //get insuranceType optionsList
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

  useEffect(() => {
    getInsuranceList();
  }, []);

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="changeInsuranceTypeModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <p className="mb-0 text-secondary font-14 fw-bold">
                تغییر نوع بیمه
              </p>
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
              <form onSubmit={changeInsuranceType}>
                <div className="form-group form-focus">
                  <input
                    type="hidden"
                    name="patientNID"
                    value={data.NationalID}
                  />
                  <SelectField
                    className="mt-3 text-center"
                    styles={selectfieldColourStyles}
                    options={insuranceOptionsList}
                    required
                    name="insuranceTypeOptions"
                    placeholder="نوع بیمه مورد نظر را انتخاب نمایید"
                    id="long-value-select"
                    instanceId="long-value-select"
                    onChangeValue={(value) => selectInsuranceType(value?.value)}
                  />
                </div>

                <div className="submit-section d-flex justify-center">
                  {!isLoading ? (
                    <button
                      type="submit"
                      className="btn btn-primary btn-save rounded font-13"
                    >
                      ثبت تغییرات
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary rounded d-flex justify-center align-items-center"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      <span className="font-13">در حال ثبت</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChangeInsuranceTypeModal;
