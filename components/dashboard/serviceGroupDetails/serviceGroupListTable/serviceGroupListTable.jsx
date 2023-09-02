import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import numberWithCommas from "class/numberWithComma";
import { useRouter } from "next/router";

const ServiceGroupListTable = ({ data, updateGroup, deleteSrvGroup }) => {
  const columns = [
    {
      name: "نام گروه",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "مدت زمان",
      selector: (row) => (row.POT ? row.POT + " دقیقه " : "-"),
      sortable: true,
      width: "auto",
    },
    {
      name: "میزان سختی",
      selector: (row) => row.Dif,
      sortable: true,
      width: "auto",
    },
    {
      name: "رنگ",
      sortable: true,
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.Color,
            padding: "5px 50px",
            borderRadius: "5px",
          }}
        ></div>
      ),
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <button
            className="btn btn-sm btn-outline-danger"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
            onClick={() => deleteSrvGroup(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ویرایش"
            onClick={() => updateGroup(row)}
          >
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
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

export default ServiceGroupListTable;
