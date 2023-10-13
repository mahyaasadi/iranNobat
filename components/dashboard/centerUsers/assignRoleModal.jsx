import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import SelectField from "components/commonComponents/selectfield";
import Loading from "components/commonComponents/loading/loading";
import { ErrorAlert } from "class/AlertManage.js";
import selectfieldColourStyles from "class/selectfieldStyle";

const AssignRoleModal = ({ FUSelectUserRole, assignRole, CenterID }) => {
  const [selectRoleOptions, setSelectRoleOptions] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  // get all roles
  const getAllRoles = () => {
    let url = `Roles/getAll/${CenterID}`;

    axiosClient
      .get(url)
      .then(function (response) {
        setAllRoles(response.data);

        let roleOptions = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let obj = {
            value: item._id,
            label: item.Name,
          };
          roleOptions.push(obj);
          setSelectRoleOptions(roleOptions);
        }
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("خطا", "خطا در دریافت اطلاعات");
      });
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="assignRoleToUserModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <p className="mb-0 text-secondary font-14 fw-bold">
                ویرایش نقش کاربر
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
              <form className="text-secondary" onSubmit={assignRole}>
                <div className="col media-w-100 font-12">
                  <label className="lblDrugIns font-12">
                    انتخاب نقش<span className="text-danger">*</span>
                  </label>

                  <SelectField
                    styles={selectfieldColourStyles}
                    options={selectRoleOptions}
                    className="text-center"
                    errorMessage={""}
                    error={false}
                    label={true}
                    placeholder={"انتخاب کنید"}
                    name="assignUserRole"
                    onChangeValue={(value) => FUSelectUserRole(value?.value)}
                    required
                  />
                </div>

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

export default AssignRoleModal;
