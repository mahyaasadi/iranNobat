import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";
import { Modal } from 'react-bootstrap';

const LoeingTableModal = ({
  data,
  Service,
  ServiceName,
  deleteLoeing,
  updateLoeing,
  openAddLoeingModal,
  show,
  onHide
}) => {
  const columns = [
    {
      name: "شناسه",
      selector: (row) => row.LoeingCode,
      sortable: true,
      width: "auto",
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
          <button
            className="btn btn-sm btn-outline-danger removeBtn"
            onClick={() => deleteLoeing(row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".removeBtn">حذف</Tooltip>
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
            onClick={() => updateLoeing(row)}
            data-pr-position="top"
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
        </div>
      ),
      width: "auto",
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <h6 className="mb-1">لوئینگ های سرویس کد {Service}</h6>
          <span className="ServiceName font-13">{ServiceName}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-body">
          <div className="addLoeing-btn">
            <button
              className="btn btn-primary font-14"
              onClick={() => openAddLoeingModal()}
            >
              <i className="me-1">
                <FeatherIcon icon="plus-square" />
              </i>{" "}
              لوئینگ جدید
            </button>
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
      </Modal.Body>
    </Modal>
  );
};

export default LoeingTableModal;