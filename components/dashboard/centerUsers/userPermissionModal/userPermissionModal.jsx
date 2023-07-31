import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/loading/loading";

let CenterID = Cookies.get("CenterID");

const UserPermissionModal = () => {
  const [usersPermissionList, setUsersPermissionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserPermissions = () => {
    let url = "UserPermision/getAll";

    axiosClient.get(url).then(function (response) {
      if (response.data) {
        setIsLoading(false);
        console.log(response.data);
        setUsersPermissionList(response.data);
      }
    });
  };

  useEffect(() => {
    getUserPermissions();
  }, []);

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="userPermissionModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <p className="mb-0 text-secondary font-14 fw-bold">
                ویرایش دسترسی کاربر به سیستم
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
                {usersPermissionList?.map((item, index) => (
                  <div className="checkbox" key={index}>
                    <div className="marginb-sm d-flex align-items-center">
                      <input
                        type="checkbox"
                        id={item.EngName}
                        value={item.Name}
                      />
                      <label
                        className="permissionLabel font-14"
                        htmlFor={item.Name}
                      >
                        {item.Name}
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
export default UserPermissionModal;
