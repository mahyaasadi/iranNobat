import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const LoeingModal = ({
  data,
  Service,
  ServiceName,
  deleteLoeing,
  updateLoeing,
  openAddLoeingModal,
}) => {
  const columns = [
    {
      name: "شناسه",
      selector: (row) => row.LoeingCode,
      sortable: true,
      width: "150px",
    },
    {
      name: "نام",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <Link
            className="btn btn-sm btn-outline-danger"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
            onClick={() => deleteLoeing(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>

          <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ویرایش"
            onClick={() => updateLoeing(row)}
          >
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
        </div>
      ),
      width: "120px",
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="loeingModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="loeing-header">
                <h6 className="mb-1">لوئینگ های سرویس کد {Service}</h6>
                <span className="ServiceName font-13">{ServiceName}</span>
              </div>
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
              {/* add loeing */}
              <div className="addLoeing-btn">
                <Link
                  href="#"
                  className="btn btn-primary font-14"
                  onClick={() => openAddLoeingModal()}
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  لوئینگ جدید
                </Link>
              </div>

              <div className="card-body p-4">
                <div className="table-responsive">
                  <DataTableExtensions {...tableData}>
                    <DataTable
                      noHeader
                      defaultSortField="id"
                      pagination
                      highlightOnHover
                      defaultSortAsc={false}
                      customStyles={tableCustomStyles}
                    />
                  </DataTableExtensions>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoeingModal;
