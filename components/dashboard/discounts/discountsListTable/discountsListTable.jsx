import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const DiscountsListTable = ({ data, updateDiscount, deleteDiscount }) => {
  const columns = [
    {
      name: "نام",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "مشخصات",
      selector: (row) => row.Des,
      sortable: true,
      width: "auto",
    },
    {
      name: "درصد تخفیف",
      selector: (row) => row.Value,
      sortable: true,
      width: "200px",
    },
    {
      name: "روش محاسبه ",
      selector: (row) => row.Percent,
      sortable: true,
      cell: (row) => (
        <div>
          {row.Percent ? (
            <p>محاسبه بر اساس درصد</p>
          ) : (
            <p>محاسبه بر اساس مبلغ</p>
          )}
        </div>
      ),
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions">
          <Link
            dir="ltr"
            href="#"
            className="text-black"
            onClick={() => updateDiscount(row)}
            data-bs-toggle="modal"
            data-bs-target="#editDiscountModal"
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
            onClick={() => deleteDiscount(row._id)}
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>{" "}
            حذف
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
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default DiscountsListTable;
