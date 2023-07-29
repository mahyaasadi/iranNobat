import FeatherIcon from "feather-icons-react";
import Link from "next/link";

const ShiftDetailsModal = ({ value }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="shiftDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 font-14 text-secondary fw-bold">
              شیفت های روز {value?.weekDay?.name} {value?.day}{" "}
              {value?.month?.name}
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
            <div className="media-md-w-100">
              <Link
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#addShiftModal"
                className="btn btn-primary btn-add media-md-w-100 font-14 media-font-12 rounded marginb-1"
              >
                <i className="me-1">
                  <FeatherIcon icon="plus-square" />
                </i>{" "}
                شیفت جدید
              </Link>
            </div>

            <form>
              <div className="form-group">
                <div className="input-group mb-3 inputServiceContainer">
                  {/* <label className="lblAbs font-12">
                    جست و جو
                  </label> */}
                  <input
                    type="text"
                    autoComplete="off"
                    // id="srvSearchInput"
                    // name="srvSearchInput"
                    placeholder="جستجو ..."
                    className="form-control rounded-right w-50 padding-right-2 font-13"
                  />

                  <button
                    className="btn btn-primary rounded-left w-10"
                    // id="BtnServiceSearch"
                  >
                    <i className="fe fe-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShiftDetailsModal;
