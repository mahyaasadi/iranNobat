import { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const SpecialDiseasesListTable = ({ data, updateDisease, deleteDisease }) => {
  const columns = [
    {
      name: "نام",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "نام تخصصی",
      selector: (row) => row.EngName,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions">
          <Link
            className="text-black"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#editSpecialDiseaseModal"
            onClick={() => updateDisease(row)}
          >
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>
          </Link>

          <Link
            className="text-danger"
            href="#"
            onClick={() => deleteDisease(row._id)}
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>
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

export default SpecialDiseasesListTable;
