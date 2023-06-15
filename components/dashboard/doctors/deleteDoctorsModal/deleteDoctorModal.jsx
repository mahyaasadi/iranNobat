import FeatherIcon from "feather-icons-react";
import Link from "next/link"

const DeleteDoctorModal = () => {
  return (
    <div
      className="modal fade contentmodal"
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
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
                <Link href="#" className="btn btn-success me-2">
                  بله
                </Link>
                <Link
                  href="#"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  خیر
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDoctorModal;
