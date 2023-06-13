import React from "react";
import Link  from "next/link";
import FeatherIcon from "feather-icons-react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const DoctorsListTable = () => {
  const data = [
    {
      ID: "4545",
      Product: "Natura ayurvedic medicine",
      img_url2: "product1",
      Qtys: "15 pils",
      Category: "Ventricular systems",
      Date: "12/20/2022",
      Amount: "$300.00",
    },
    {
      ID: "4545",
      Product: "Safi Natural Blood Purifier",
      img_url2: "product2",
      Qtys: "Syrup 200 ml",
      Category: "Neuromodulation",
      Date: "12/20/2022",
      Amount: "$300.00",
    },
    {
      ID: "4545",
      Product: "Natural Syrup for bronchtas",
      img_url2: "product3",
      Qtys: "200 ml",
      Category: "Ventricular assist devices",
      Date: "12/20/2022",
      Amount: "$300.00",
    },
    {
      ID: "4545",
      Product: "safi Natral blood Purifier",
      img_url2: "",
      Qtys: "Syrup 200 ml",
      Category: "surgical systems",
      Date: "12/20/2022",
      Amount: "$300.00",
    },
    {
      ID: "4545",
      Product: "Headache pills",
      img_url2: "",
      Qtys: "20 tablets",
      Category: "Assist devices",
      Date: "12/20/2022",
      Amount: "$300.00",
    },
    {
      ID: "4545",
      Product: "Benadrys cough Syrup",
      img_url2: "product6",
      Qtys: "100 ml",
      Category: "Interventional devices",
      Date: "12/20/2022",
      Amount: "$300.00",
    },
  ];
  const columns = [
    {
      name: "Id",
      selector: (row) => row.ID,
      sortable: true,
      width: "250px",
    },

    {
      name: "Product",
      sortable: true,
      cell: (row) => (
        <Card>
          <Card.Body className="d-flex">
            <h2 className="table-avatar">
              <Link
                className="avatar avatar-sm me-2 user-dt"
                href="#"
                data-bs-target="#editModal"
                data-bs-toggle="modal"
              ></Link>
            </h2>
            <Link
              href="#"
              data-bs-target="#editModal"
              data-bs-toggle="modal"
              className="user-name"
            >
              {row.Product}
              <br />
              <span>{row.Qtys}</span>
            </Link>
          </Card.Body>
        </Card>
      ),
      width: "400px",
    },

    {
      name: "Category",
      selector: (row) => row.Category,
      sortable: true,
      width: "250px",
    },
    {
      name: "Date",
      selector: (row) => row.Date,
      sortable: true,
      width: "250px",
    },

    {
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
      width: "250px",
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
            </i>{" "}
            Edit
          </Link>
          <Link
            className="text-danger"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>{" "}
            Delete
          </Link>
        </div>
      ),
      width: "250px",
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

export default DoctorsListTable;
