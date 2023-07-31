"use client";
import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const DoctorsListTable = ({ data, deletePhysician, updatePhysician }) => {
  const columns = [
    {
      name: "نام پزشک",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "عنوان",
      selector: (row) => row.Title,
      sortable: true,
      width: "auto",
    },
    {
      name: "تخصص",
      selector: (row) => row.Spe,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      sortable: true,

      cell: (row) => (
        <div className="actions d-flex gap-2">
          <Link
            href="#"
            className="btn btn-sm btn-outline-danger"
            onClick={() => deletePhysician(row._id)}
          >
      
              <FeatherIcon
                style={{ width: "16px", height: "16px" }}
                icon="trash-2"
              />
          
          </Link>

          <Link
            href="#"
            className="btn btn-sm btn-outline-secondary btn-border-left"
            onClick={() => updatePhysician(row)}
            data-bs-toggle="modal"
            data-bs-target="#editPhysicianModal"
          >
         
              <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3" />
          
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

export default DoctorsListTable;
