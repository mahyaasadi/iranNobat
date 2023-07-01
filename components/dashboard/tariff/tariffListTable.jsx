import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "./tableStyle.jsx";

const TariffListTable = ({ data, updateService, deleteService }) => {
  const columns = [
    {
      name: "شناسه",
      selector: (row) => row._id,
      sortable: true,
      width: "120px",
    },
    {
      name: "نام",
      selector: (row) =>
        typeof row.Service != "undefined"
          ? row.Service.substr(0, 60) + " ..."
          : row.Service,
      sortable: true,
      width: "550px",
    },
    {
      name: "K حرفه ای",
      selector: (row) => row.Professional_K,
      sortable: true,
      width: "100px",
    },
    {
      name: "K فنی ",
      selector: (row) => row.Technical_K,
      sortable: true,
      width: "100px",
    },
    {
      name: "تعرفه دولتی",
      selector: (row) => row.GovernmentalTariff,
      sortable: true,
      width: "150px",
    },
    {
      name: "تعرفه خصوصی",
      selector: (row) => row.PrivateTariff,
      sortable: true,
      width: "400px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions">
          <Link
            className="text-danger"
            href="#"
            onClick={() => deleteService(row._id)}
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>
          </Link>

          <Link
            className="text-black"
            href="#"
            onClick={() => updateService(row)}
            data-bs-toggle="modal"
            data-bs-target="#editTariffModal"
          >
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>
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
    <div className="card-body p-0">
      <div className="table-responsive">
        <DataTableExtensions {...tableData}>
          <DataTable
            noHeader
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

export default TariffListTable;
