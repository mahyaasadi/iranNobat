import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const UsersListTable = ({
  data,
  updateUserInfo,
  activateUser,
  deActivateUser,
  chatPermissionOpenModal,
  assignRoleModal,
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
      width: "330px",
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
      width: "450px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          {!row.Deactive ? (
            <button
              className="btn btn-sm btn-outline-success font-13 deActivateBtn"
              type="button"
              data-pr-position="top"
              onClick={() => deActivateUser(row._id)}
            >
              <Tooltip target=".deActivateBtn">غیر فعال سازی</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="user-check"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger activateBtn"
              type="button"
              data-pr-position="top"
              onClick={() => activateUser(row._id)}
            >
              <Tooltip target=".activateBtn">فعال سازی</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="user-x"
                />
              </i>
            </button>
          )}

          <button
            className="btn btn-sm btn-outline-secondary editBtn"
            data-pr-position="top"
            onClick={() => updateUserInfo(row)}
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3"
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left chatPermission"
            data-pr-position="top"
            onClick={() =>
              chatPermissionOpenModal(
                row._id,
                row.DepPer,
                row.SpecialDiseasesPer
              )
            }
          >
            <Tooltip target=".chatPermission">دسترسی گفتگو</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="message-circle"
            />
          </button>
          <button
            className="btn btn-sm btn-outline-secondary btn-border-left assignRole"
            data-pr-position="top"
            onClick={() => assignRoleModal(row._id)}
          >
            <Tooltip target=".assignRole">نقش کاربر</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="user"
            />
          </button>
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
