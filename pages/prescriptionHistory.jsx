import PrescriptionsListTable from "components/dashboard/prescription/prescriptionHistory/prescriptionsListTable";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/Loading";

let CenterID = Cookies.get("CenterID");

const PrescriptionHistory = () => {
  const router = useRouter();
  // console.log(router.query);

  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get prescriptions list
  const getPrescriptionsList = () => {
    let url = "BimehTamin/CenterPrescription";
    let data = { CenterID: CenterID };
    setIsLoading(true);

    axiosClient
      .post(url, data)
      .then((response) => {
        setPrescriptionsList(response.data.result);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPrescriptionsList();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* <!-- Prescriptions List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col ">
                      <p className="card-title presc-card-title">سوابق نسخه</p>
                    </div>
                  </div>
                </div>
                {isLoading ? (
                  <Loading />
                ) : (
                  <PrescriptionsListTable data={prescriptionsList} />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Add Modal --> */}
      <div
        className="modal fade contentmodal"
        id="addproduct"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <h3 className="mb-0">Add Product</h3>
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
              <form action="/admin/pharmacy-list">
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      Product Name <span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      Price <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionHistory;
