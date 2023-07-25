import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import numberWithCommas from "class/numberWithComma";
import { useRouter } from "next/router";

const TariffListTable = ({
  data,
  groupDetail,
  updateService,
  deleteService,
  SetLoeingModalData,
  updateServiceGroup,
}) => {
  const router = useRouter();
  let columns = [];

  if (router.pathname == "/tariff") {
    columns = [
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
            ? row.Service.substr(0, 40) + " ..."
            : row.Service,
        sortable: true,
        width: "300px",
      },
      {
        name: "تعرفه دولتی",
        selector: (row) =>
          row.GovernmentalTariff
            ? numberWithCommas(row.GovernmentalTariff)
            : "",
        sortable: true,
        width: "150px",
      },
      {
        name: "تعرفه خصوصی",
        selector: (row) =>
          row.PrivateTariff ? numberWithCommas(row.PrivateTariff) : "",
        sortable: true,
        width: "150px",
      },
      {
        name: "تعرفه آزاد مرکز",
        selector: (row) =>
          row.FreeTariff ? numberWithCommas(row.FreeTariff) : "",
        sortable: true,
        width: "150px",
      },
      {
        name: "س . ب . تامین و خدمات",
        selector: (row) =>
          row.PatientCost ? numberWithCommas(row.PatientCost) : "",
        sortable: true,
        width: "190px",
      },
      {
        name: "س . ب . ارتش",
        selector: (row) =>
          row.ArteshPatientCost ? numberWithCommas(row.ArteshPatientCost) : "",
        sortable: true,
        width: "250px",
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
              <i className="trash-icon">
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
              <i className="edit-icon">
                <FeatherIcon icon="edit-3" />
              </i>
            </Link>

            {/* Loeing */}
            <Link
              href="#"
              className="ml-4"
              data-bs-toggle="modal"
              data-bs-target="#loeingModal"
            >
              <button
                type="submit"
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  SetLoeingModalData(row["Tamin-Loeing"], row._id, row.Service)
                }
              >
                <div className=" ">
                  <p className="loeing-text">
                    {" "}
                    لوئینگ تامین{" "}
                    <span id={"loeingCount" + row._id}>
                      {row["Tamin-Loeing"] ? row["Tamin-Loeing"].length : ""}
                    </span>
                  </p>
                </div>
              </button>
            </Link>
          </div>
        ),
        width: "200px",
      },
    ];
  } else if (router.pathname == "/serviceGroupDetails") {
    columns = [
      {
        name: "کد خدمت",
        selector: (row) => row._id,
        sortable: true,
        width: "auto",
      },
      {
        name: "نام خدمت",
        selector: (row) => row.Service.substr(0, 60) + " ...",
        sortable: true,
        width: "auto",
      },
      {
        name: "نام گروه",
        selector: (row) => row.CenterGroup,
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
              className="text-danger"
              href="#"
              onClick={() => deleteService(row._id)}
            >
              <i className="">
                <FeatherIcon icon="trash-2" />
              </i>
            </Link>

            <Link
              className="text-black"
              href="#"
              onClick={() => updateServiceGroup(row)}
              data-bs-toggle="modal"
              data-bs-target="#editServiceModal"
            >
              <i className="">
                <FeatherIcon icon="edit-3" />
              </i>
            </Link>
          </div>
        ),
        width: "200px",
      },
    ];
  }

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
            // direction="ltr"
            customStyles={tableCustomStyles}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default TariffListTable;
