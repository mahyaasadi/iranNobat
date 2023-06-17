import FeatherIcon from "feather-icons-react";
import Link from "next/link";

const DeleteDoctorModal = ({ deletePhysician }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="deletePhysicianModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      {/* <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header border-bottom-0 justify-content-end">
            <button
              type="button"
              className="close-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <div className="del-icon">
                <i>
                  <FeatherIcon icon="x-circle" />
                </i>
              </div>
            </button>
          </div>
          <div className="modal-body">
            <div className="delete-wrap text-center">
              <div className="del-icon">
                <i className="delete-icon">
                  <FeatherIcon icon="x-circle" />
                </i>
              </div>
              <h2>آیا اطمینان به حذف دارید؟</h2>
              <div className="submit-section">
                <div onClick={deletePhysician} className="btn btn-success me-2">
                  بله
                </div>
                <div
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  خیر
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DeleteDoctorModal;
