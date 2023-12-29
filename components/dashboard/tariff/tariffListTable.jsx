import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import numberWithCommas from "class/numberWithComma";
import { Tooltip } from "primereact/tooltip";

const TariffListTable = ({
  data,
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
        name: "کد خدمت",
        selector: (row) => row._id,
        sortable: true,
        width: "120px",
      },
      {
        name: "کد داخلی",
        selector: (row) => row.InternalCode,
        sortable: true,
        width: "120px",
      },
      {
        name: "نام خدمت",
        selector: (row) =>
          typeof row.Service != "undefined"
            ? row.Service.substr(0, 40) + " ..."
            : row.Service,
        sortable: true,
        width: "310px",
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
        width: "180px",
      },
      {
        name: "س . ب . ارتش",
        selector: (row) =>
          row.ArteshPatientCost ? numberWithCommas(row.ArteshPatientCost) : "",
        sortable: true,
        width: "180px",
      },
      {
        name: "عملیات ها",
        selector: (row) => row.action,
        cell: (row) => (
          <div className="actions d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-danger removeBtn"
              onClick={() => deleteService(row._id)}
              data-pr-position="top"
            >
              <Tooltip target=".removeBtn">حذف</Tooltip>
              <FeatherIcon
                icon="trash-2"
                style={{ width: "16px", height: "16px" }}
              />
            </button>

            <button
              className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
              data-pr-position="top"
              onClick={() => updateService(row)}
            >
              <Tooltip target=".editBtn">ویرایش</Tooltip>
              <FeatherIcon
                icon="edit-3"
                style={{ width: "16px", height: "16px" }}
              />
            </button>

            {/* Loeing */}
            <button
              className="m-0 btn btn-sm btn-outline-secondary btn-border-left"
              onClick={() =>
                SetLoeingModalData(row["Tamin-Loeing"], row._id, row.Service)
              }
            >
              <p className="loeing-text">
                {" "}
                لوئینگ تامین{" "}
                <span id={"loeingCount" + row._id}>
                  {row["Tamin-Loeing"] ? row["Tamin-Loeing"].length : ""}
                </span>
              </p>
            </button>
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
        cell: (row) => (
          <div className="actions d-flex gap-1">
            <button
              className="btn btn-sm btn-outline-danger removeSrvBtn"
              data-pr-position="top"
              onClick={() => deleteService(row._id)}
            >
              <Tooltip target=".removeSrvBtn">حذف</Tooltip>
              <FeatherIcon
                icon="trash-2"
                style={{ width: "16px", height: "16px" }}
              />
            </button>

            <button
              className="btn btn-sm btn-outline-secondary btn-border-left editSrvBtn"
              data-pr-position="top"
              onClick={() => updateServiceGroup(row)}
            >
              <Tooltip target=".editSrvBtn">ویرایش</Tooltip>
              <FeatherIcon
                icon="edit-3"
                style={{ width: "16px", height: "16px" }}
              />
            </button>
          </div>
        ),
        width: "auto",
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

export default TariffListTable;
