import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const SendMessagesListTable = ({ data, checkMessageDelivery }) => {
  const columns = [
    {
      name: "شماره همراه",
      selector: (row) => row.Tel,
      sortable: true,
      width: "200px",
    },
    {
      name: "تاریخ ارسال",
      selector: (row) => row.Date,
      sortable: true,
      width: "190px",
    },
    {
      name: "متن پیام",
      selector: (row) => row.Message.substr(0, 100) + " ...",
      sortable: true,
      width: "1000px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions">
          <div
            className="btn btn-sm btn-outline-primary d-flex gap-1 align-items-center"
            onClick={() => checkMessageDelivery(row.SendCode)}
          >
            <i className="fa fa-eye"></i>
            مشاهده وضعیت
          </div>
        </div>
      ),
      width: "150px",
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
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
    </>
  );
};

export default SendMessagesListTable;
