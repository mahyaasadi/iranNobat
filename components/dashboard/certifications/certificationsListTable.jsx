import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const CertificationsListTable = ({
  data,
  deleteCertificate,
  updateCertificate,
}) => {
  const columns = [
    {
      name: "نام شرکت",
      selector: (row) => row.Company,
      sortable: true,
      width: "auto",
    },
    {
      name: "لینک مجوز",
      selector: (row) => row.Link,
      sortable: true,
      width: "auto",
    },
    {
      name: "عنوان مجوز",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "سال صدور",
      selector: (row) => row.Year,
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
            onClick={() => deleteCertificate(row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".removeBtn">حذف</Tooltip>
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
          <Link
            href="#"
            className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
            onClick={() => updateCertificate(row)}
            data-pr-position="top"
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
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
    <div className="card-body p-4">
      <div className="table-responsive">
        <DataTableExtensions {...tableData}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            customStyles={tableCustomStyles}
            noDataComponent={
              <div style={{ padding: "24px", fontSize: "13px" }}>
                موردی برای نمایش وجود ندارد.
              </div>
            }
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default CertificationsListTable;
