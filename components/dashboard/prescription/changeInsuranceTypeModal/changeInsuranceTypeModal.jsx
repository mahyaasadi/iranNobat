import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import Select from "react-select";
import SelectField from "components/commonComponents/selectfield";
import FeatherIcon from "feather-icons-react";

let CenterID = Cookies.get("CenterID");

const ChangeInsuranceTypeModal = ({
  changeInsuranceType,
  selectInsuranceType,
  data
}) => {
  const [insuranceOptionsList, setInsuranceOptionsList] = useState([]);

  //get insuranceType optionsList
  const getInsuranceList = () => {
    let url = `Patient/getInsuranceType/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        // console.log(response.data);
        let selectData = [];
        for (let i = 0; i < response.data.length; i++) {
          const sel = response.data[i];
          let obj = {
            value: sel.id,
            label: sel.Name,
          };
          selectData.push(obj);
        }
        // console.log(selectData);
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
              <h5 className="mb-0">تغییر نوع بیمه</h5>
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
                  <Select
                    className="select mt-3"
                    options={insuranceOptionsList}
                    required
                    name="insuranceTypeOptions"
                    placeholder="نوع بیمه مورد نظر را انتخاب نمایید"
                    id="long-value-select"
                    instanceId="long-value-select"
                    onChangeValue={(value) => selectInsuranceType(value?.value)}
                  />
                </div>

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save">
                    ثبت تغییرات
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
export default ChangeInsuranceTypeModal;
