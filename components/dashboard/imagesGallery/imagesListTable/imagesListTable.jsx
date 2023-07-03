import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { Row, Col, Card, Media } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const ImagesListTable = ({ data, deleteImage }) => {
  const columns = [
    {
      name: "عکس",
      selector: (row) => row.Thumb,
      sortable: true,
      cell: (row) => (
        <img
          src={"https://irannobat.ir/CenterProfileImage/" + row.Thumb}
          alt=""
        />
      ),
      width: "150px",
    },
    {
      name: "عنوان",
      selector: (row) => row.Title,
      sortable: true,
      width: "auto",
    },
    {
      name: "توضیحات",
      selector: (row) => row.Des,
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
            className="text-danger"
            onClick={() => deleteImage(row)}
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
    <div className="card-body p-0">
      <div className="table-responsive">
        <DataTableExtensions {...tableData}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            customStyles={tableCustomStyles}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default ImagesListTable;
