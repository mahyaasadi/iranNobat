import { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const PrescriptionsListTable = ({ data }) => {
  console.log({ data });
  const dateFormat = (str) => {
    if (str !== "" || str !== null) {
      let date =
        str.substr(0, 4) + "/" + str.substr(4, 2) + "/" + str.substr(6, 7);
      return date;
    } else {
      return 0;
    }
  };

  const columns = [
    {
      name: "نوع نسخه",
      selector: (row) => row.Type,
      sortable: true,
      width: "auto",
    },
    {
      name: "کد ملی",
      selector: (row) => row.NID,
      sortable: true,
      width: "auto",
    },
    {
      name: "تاریخ ثبت",
      selector: (row) => dateFormat(row.Date),
      sortable: true,
      width: "auto",
    },
    {
      name: "تاریخ انقضا",
      selector: (row) => dateFormat(row.ExpierDate),
      sortable: true,
      width: "auto",
    },
    {
      name: "توضیحات",
      selector: (row) =>
        row.Comment.length > 50
          ? row.Comment.substr(0, 40) + " ..."
          : row.Comment,
      sortable: true,
      width: "auto",
    },
    {
      name: "کد پیگیری",
      selector: (row) => row.trackingCode,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <Link
            className="btn btn-sm btn-outline-danger"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
          <Link
            href={{
              pathname: "/prescription",
              query: { id: row.head_EPRSC_ID, pid: row.NID },
            }}
            className="btn btn-sm btn-outline-secondary btn-border-left"
            // data-bs-toggle="tooltip"
            // data-bs-placement="top"
            // title="ویرایش نسخه"
          >
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
    <>
      <div className="card-body p-4">
        <div className="table-responsive">
          <DataTableExtensions {...tableData}>
            <DataTable
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              paginationPerPage="20"
              highlightOnHover
              customStyles={tableCustomStyles}
            />
          </DataTableExtensions>
        </div>
      </div>
    </>
  );
};

export default PrescriptionsListTable;
