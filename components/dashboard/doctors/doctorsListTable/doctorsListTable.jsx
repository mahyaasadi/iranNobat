"use client";
import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

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
        <div className="actions">
          <Link
            dir="ltr"
            href="#"
            className="text-black"
            onClick={() => updatePhysician(row)}
            data-bs-toggle="modal"
            data-bs-target="#editPhysicianModal"
          >
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>{" "}
            ویرایش
          </Link>
          <Link
            dir="ltr"
            href="#"
            className="text-danger"
            onClick={() => deletePhysician(row._id)}
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>{" "}
            حذف
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
  );
};

export default DoctorsListTable;