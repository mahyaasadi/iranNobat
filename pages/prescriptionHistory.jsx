import PrescriptionsListTable from "components/dashboard/prescription/prescriptionHistory/prescriptionsListTable";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/Loading";
import EditPrescriptionModal from "components/dashboard/prescription/prescriptionHistory/editPrescriptionModal";

let CenterID = Cookies.get("CenterID");

const PrescriptionHistory = () => {
  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get prescriptions list
  const getPrescriptionsList = () => {
    let url = "https://irannobat.ir:8444/api/BimehTamin/CenterPrescription";
    let data = { CenterID: CenterID };
    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        // console.log(response.data);
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
          <div className="page-header">
            <div className="row align-items-center">
              {/* <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addproduct"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  Add New
                </Link>
              </div> */}
            </div>
          </div>

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

      <EditPrescriptionModal />
    </>
  );
};

export default PrescriptionHistory;
