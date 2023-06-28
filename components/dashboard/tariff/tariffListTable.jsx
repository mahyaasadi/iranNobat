import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const TariffListTable = ({ data }) => {
  const columns = [
    {
      name: "#",
      selector: (row) => row._id,
      sortable: true,
      width: "auto",
    },
    {
      name: "نام",
      selector: (row) => row.Service,
      sortable: true,
      width: "auto",
    },
    {
      name: "حرفه ای K",
      selector: (row) => row.Professional_K,
      sortable: true,
      width: "auto",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      cell: () => (
        <div className="actions">
          <Link
            className="text-black"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>
          </Link>

          <Link
            className="text-danger"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
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
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default TariffListTable;
