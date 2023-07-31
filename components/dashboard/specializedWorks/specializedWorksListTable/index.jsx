import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const SpecialiazedWorksListTable = ({ data, updateSpeWork, deleteSpeWork }) => {
  const columns = [
    {
      name: "نام ",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "عنوان",
      selector: (row) => row.Title,
      sortable: true,
      width: "auto",
    },
    {
      name: "نام انگلیسی",
      selector: (row) => row.EngName,
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
            href="#"
            className="text-black"
            onClick={() => updateSpeWork(row)}
            data-bs-toggle="modal"
            data-bs-target="#editSpeWorkModal"
          >
          <FeatherIcon
            style={{ width: "16px", height: "16px" }}
            icon="edit-3"
          />
          </Link>

          <Link
            href="#"
            className="text-danger"
            onClick={() => deleteSpeWork(row._id)}
          >
          <FeatherIcon
            style={{ width: "16px", height: "16px" }}
            icon="trash-2"
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
    <div className="card-body p-0">
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

export default SpecialiazedWorksListTable;
