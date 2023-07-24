import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";

let CenterID = Cookies.get("CenterID");

const EditPhoneNumberModal = () => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="editPhoneNumberModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="mb-0">تغییر شماره همراه </h5>
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
              <form>
                <div className="form-group">
                  <label className="lblAbs font-12">
                    شماره همراه فعلی <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    // value={}
                    // onChange={}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="lblAbs font-12">
                    شماره همراه جدید <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    // value={}
                    // onChange={}
                    required
                  />
                </div>

                <div className="submit-section">
                  <button type="submit" className="btn btn-primary btn-save rounded">
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
export default EditPhoneNumberModal;
