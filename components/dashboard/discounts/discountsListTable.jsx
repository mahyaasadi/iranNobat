import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const DiscountsListTable = ({ data, updateDiscount, deleteDiscount }) => {
  const columns = [
    {
      name: "نام",
      selector: (row) => row.Name,
      sortable: true,
      width: "300px",
    },
    {
      name: "مشخصات",
      selector: (row) => row.Des,
      sortable: true,
      width: "400px",
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
      width: "420px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <button
            className="btn btn-sm btn-outline-danger reomveBtn"
            onClick={() => deleteDiscount(row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".reomveBtn">حذف</Tooltip>
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
            onClick={() => updateDiscount(row)}
            data-pr-position="top"
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
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
