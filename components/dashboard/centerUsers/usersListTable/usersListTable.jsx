import { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const UsersListTable = ({ data, updateUserInfo, activateUser, deActivateUser, activeState, toggleActiveState }) => {
  const columns = [
    {
      name: "نام و نام خانوادگی",
      selector: (row) => row.FullName,
      sortable: true,
      width: "250px",
    },
    {
      name: "نام مستعار",
      selector: (row) => row.NickName,
      sortable: true,
      width: "350px",
    },
    {
      name: "نام کاربری",
      selector: (row) => row.User,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions">
          <button
            className="btn btn-sm btn-outline-primary font-13"
            type="button"
            onClick={() => {
              toggleActiveState(row._id)
            }}
          >
            {activeState == true ? (
              <div>
                <i className="d-flex align-items-center gap-3">
                  <FeatherIcon style={{ width: "16px", height: "16px" }} icon="user-check" />فعال
                </i>
              </div>
            ) : (
              <div>
                <i className="d-flex align-items-center gap-3">
                  <FeatherIcon style={{ width: "16px", height: "16px" }} icon="user-x" />غیر فعال
                </i>
              </div>
            )}
          </button>
          <Link
            className="text-black"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#editUserModal"
            onClick={() => updateUserInfo(row)}
          > 
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>
          </Link>
          <Link className="text-danger" href="#">
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>{" "}
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
            noDataComponent={
              <div style={{ padding: "24px", fontSize: "13px" }}>
                موردی برای نمایش وجود ندارد.
              </div>
            }
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

export default UsersListTable;
