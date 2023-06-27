import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const TariffListTable = ({ data }) => {
  //   const data = [
  //     {
  //       ID: "4545",
  //       Product: "Natura ayurvedic medicine",
  //       Category: "Ventricular systems",
  //     },
  //     {
  //       ID: "4545",
  //       Product: "Safi Natural Blood Purifier",
  //       Category: "Neuromodulation",
  //     },
  //     {
  //       ID: "4545",
  //       Product: "Natural Syrup for bronchtas",
  //       Category: "Ventricular assist devices",
  //     },
  //     {
  //       ID: "4545",
  //       Product: "safi Natral blood Purifier",
  //       Category: "surgical systems",
  //     },
  //     {
  //       ID: "4545",
  //       Product: "Headache pills",
  //       Category: "Assist devices",
  //     },
  //     {
  //       ID: "4545",
  //       Product: "Benadrys cough Syrup",
  //       Category: "Interventional devices",
  //     },
  //   ];

  const columns = [
    {
      name: "Id",
      selector: (row) => row.CenterGroup,
      sortable: true,
      className: "font-size-12",
      width: "auto",
    },
    {
      name: "Category",
      selector: (row) => row.Category,
      className: "font-size-12",
      sortable: true,
      width: "auto",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      className: "font-size-12",
      sortable: true,
      cell: () => (
        <div className="actions">
          <Link
            className="text-black"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>
          </Link>
          <Link
            className="text-danger"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>
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
    <div className="card-body p-0 font-size-12">
      <div className="table-responsive font-size-12">
        <DataTableExtensions {...tableData}>
          <DataTable
            className="font-size-12"
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

export default TariffListTable;
