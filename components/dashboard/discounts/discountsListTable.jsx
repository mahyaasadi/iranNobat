import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

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
      width: "300px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <Link
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteDiscount(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
          <Link
            href="#"
            className="btn btn-sm btn-outline-secondary btn-border-left"
            onClick={() => updateDiscount(row)}
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

export default DiscountsListTable;
