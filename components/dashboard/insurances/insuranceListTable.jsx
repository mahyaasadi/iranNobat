import { useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const InsuranceListTable = ({ data, deleteInsurance, openEditModal }) => {
  const columns = [
    {
      name: "نام بیمه",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "نوع بیمه",
      selector: (row) => row.Type,
      sortable: true,
      width: "auto",
    },
    {
      name: "وضعیت بیمه",
      selector: (row) => row.Status,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      sortable: true,

      cell: (row) => (
        <div className="actions d-flex gap-1">
          <Link
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteInsurance(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
          <Link
            href="#"
            className="btn btn-sm btn-outline-secondary btn-border-left"
            onClick={() => openEditModal(row)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ویرایش"
          >
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
        </div>
      ),
      width: "200px",
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
            noDataComponent={
              <div style={{ padding: "24px", fontSize: "13px" }}>
                موردی برای نمایش وجود ندارد.
              </div>
            }
            customStyles={tableCustomStyles}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default InsuranceListTable;
