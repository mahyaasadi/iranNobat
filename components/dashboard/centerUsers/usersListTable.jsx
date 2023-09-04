import { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const UsersListTable = ({
  data,
  updateUserInfo,
  activateUser,
  deActivateUser,
  chatPermissionOpenModal,
  userPermissionOpenModal,
  assignRoleModal,
  assignRole,
}) => {
  const columns = [
    {
      name: "نام و نام خانوادگی",
      selector: (row) => row.FullName,
      sortable: true,
      width: "220px",
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
      width: "250px",
    },
    {
      name: "وضعیت کاربر",
      selector: (row) => (row.Deactive == true ? "غیر فعال" : "فعال"),
      sortable: true,
      width: "550px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          {!row.Deactive ? (
            <button
              className="btn btn-sm btn-outline-success font-13"
              type="button"
              onClick={() => deActivateUser(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="غیر فعال سازی"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="user-check"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              onClick={() => activateUser(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="فعال سازی"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="user-x"
                />
              </i>
            </button>
          )}

          <Link
            className="btn btn-sm btn-outline-secondary"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ویرایش"
            onClick={() => updateUserInfo(row)}
          >
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3"
            />
          </Link>

          <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={"دسترسی گفتگو : " + row.FullName}
            onClick={chatPermissionOpenModal}
          >
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="message-circle"
            />
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="نقش کاربر"
            // data-bs-toggle="assignRoleToUserModal"
            onClick={() => assignRoleModal(row._id)}
          >
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="unlock"
            />
          </Link>
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
    <div className="card-body p-4">
      <div className="table-responsive">
        <DataTableExtensions {...tableData}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            paginationPerPage="20"
            customStyles={tableCustomStyles}
            noDataComponent={
              <div style={{ padding: "24px", fontSize: "13px" }}>
                موردی برای نمایش وجود ندارد.
              </div>
            }
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default UsersListTable;
