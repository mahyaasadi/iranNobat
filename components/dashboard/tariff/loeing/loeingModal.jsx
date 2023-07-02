import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const LoeingModal = ({ data, Service, ServiceName, deleteLoeing }) => {
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
        <div className="actions">
          <Link
            className="text-danger"
            href="#"
            onClick={() => deleteLoeing(row._id)}
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>
          </Link>

          <Link
            className="text-black"
            href="#"
            // onClick={() => updateLoeing(row)}
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>
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
        // data-bs-backdrop="static"
        // data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="loeing-header">
                <h6 className="mb-1">لوئینگ های سرویس کد {Service}</h6>
                <span className="ServiceName">{ServiceName}</span>
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
                  data-bs-toggle="modal"
                  data-bs-target="#addLoeingModal"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  لوئینگ جدید
                </Link>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <DataTableExtensions {...tableData}>
                    <DataTable
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
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
