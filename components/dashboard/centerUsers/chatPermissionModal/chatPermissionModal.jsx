import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/loading/loading";

let CenterID = Cookies.get("CenterID");

const ChatPermissionModal = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [diseasesList, setDiseasesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get departments
  const getDepartments = () => {
    let UrlGetDep = `Center/GetDepartments/${CenterID}`;
    axiosClient.get(UrlGetDep).then(function (response) {
      if (response.data) {
        setIsLoading(false);
        setDepartmentsData(response.data);
      }
    });
  };

  // get diseases list
  const getDiseasesData = () => {
    axiosClient
      .get(`Center/getSpecialDiseases/${CenterID}`)
      .then(function (response) {
        setDiseasesList(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDepartments();
    getDiseasesData();
  }, []);

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="chatPermissionModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <p className="mb-0 text-secondary font-14 fw-bold">
                ویرایش دسترسی گفتگو
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
              <p className="mb-0 text-secondary font-13 fw-bold">انتخاب بخش</p>
              <hr className="mt-1 marginb-1" />
              <form className="text-secondary">
                {departmentsData?.map((departmentData, index) => (
                  <div className="checkbox" key={index}>
                    <div className="marginb-sm d-flex align-items-center">
                      <input
                        type="checkbox"
                        id={departmentData.Modality}
                        value={departmentData.PerFullName}
                      />
                      <label
                        className="permissionLabel font-14"
                        htmlFor={departmentData.PerFullName}
                      >
                        {departmentData.PerFullName}
                      </label>
                    </div>
                  </div>
                ))}

                <hr />

                <p className="mb-0 margin-top-2 text-secondary font-13 fw-bold">
                  انتخاب بیماری خاص
                </p>
                <hr className="mt-1 marginb-1" />
                {diseasesList?.map((diseaseData, index) => (
                  <div className="checkbox" key={index}>
                    <div className="marginb-sm d-flex align-items-center">
                      <input
                        type="checkbox"
                        id={diseaseData.EngName}
                        value={diseaseData.Name}
                      />
                      <label
                        className="permissionLabel font-14"
                        htmlFor={diseaseData.Name}
                      >
                        {diseaseData.Name}
                      </label>
                    </div>
                  </div>
                ))}
                <div className="submit-section">
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save"
                  >
                    ثبت
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
export default ChatPermissionModal;
