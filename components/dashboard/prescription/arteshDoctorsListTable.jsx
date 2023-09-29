import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const arteshDoctorsListTable = ({ data, SelectDoctor }) => {

  const columns = [
    {
      name: "نام",
      selector: (row) => row.name + " " + row.family,
      sortable: true,
      width: "auto",
    },
    {
      name: "تخصص",
      selector: (row) => row.specialty,
      sortable: true,
      width: "auto",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions">
          <button type="button" className="btn btn-primary" onClick={() => SelectDoctor(row)}>
            انتخاب{" "}
            <i className="me-1">
              <FeatherIcon icon="check" />
            </i>
          </button>
        </div>
      ),
      width: "130px",
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
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default arteshDoctorsListTable;
