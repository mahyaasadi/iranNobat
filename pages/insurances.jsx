import React, { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loading from "components/loading/Loading";
import SelectField from "components/commonComponents/selectfield";
import InsuranceListTable from "components/dashboard/insurances/insuranceListTable/insuranceListTable";
import AddInsuranceModal from "components/dashboard/insurances/addInsuranceModal/addInsuranceModal";
import EditInsuranceModal from "components/dashboard/insurances/editInsuranceModal/editInsuranceModal";
import insuranceTypeDataClass from "class/insuranceTypeDataClass";
import insuranceStatusDataClass from "class/insuranceStatusDataClass";

let CenterID = Cookies.get("CenterID");

const Insurance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [insuranceList, setInsuranceList] = useState([]);
  const [editedInsurance, setEditedInsurance] = useState([]);
  const [name, setName] = useState("");
  const [insuranceType, setInsuranceType] = useState(insuranceTypeDataClass);
  const [insuranceStatus, setInsuranceStatus] = useState(
    insuranceStatusDataClass
  );

  const handleNameInput = (e) => setName(e.target.value);

  // reset form inputs
  const reset = () => {
    setName("");
    // setInsuranceType("");
    // setInsuranceStatus("");
  };

  let SelectInsuranceType,
    SelectInsuranceStatus = "";

  const FUSelectInsuranceType = (Type) => {
    SelectInsuranceType = Type;
  };

  const FUSelectInsuranceStatus = (Status) => {
    SelectInsuranceStatus = Status;
  };

  //Get insurance list
  const getInsuranceData = () => {
    axios
      .get(
        `https://irannobat.ir:8444/api/CenterProfile/getCenterInsurance/${CenterID}`
      )
      .then(function (response) {
        setInsuranceList(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    try {
      getInsuranceData();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  // Add Insurance
  const addInsurance = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterProfile/AddInsurance";
    let data = {
      CenterID: CenterID,
      Name: name,
      Type: SelectInsuranceType,
      Status: SelectInsuranceStatus,
    };

    axios
      .post(url, data)
      .then((response) => {
        setInsuranceList([...insuranceList, response.data]);
        $("#addInsuranceModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit Insurance
  const editInsurance = (e) => {
    e.preventDefault();
    let url = "https://irannobat.ir:8444/api/CenterProfile/UpdateInsurance";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let Data = {
      CenterID: CenterID,
      InsuranceID: formProps.EditInsuranceID,
      Name: formProps.EditInsuranceName,
      Type: formProps.EditInsuranceType,
      Status: formProps.EditInsuranceStatus,
    };
    axios
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditInsuranceID, response.data);
        $("#editInsuranceModal").modal("hide");
        // reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateItem = (id, newArr) => {
    let index = insuranceList.findIndex((x) => x._id === id);

    let g = insuranceList[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setInsuranceList([
        ...insuranceList.slice(0, index),
        g,
        ...insuranceList.slice(index + 1),
      ]);
  };

  const updateInsurance = (data) => {
    setEditedInsurance(data);
  };

  // Delete Insurance
  const deleteInsurance = (id) => {
    Swal.fire({
      title: "حذف بیمه!",
      text: "آیا از حذف مطمئن هستید",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          CenterID: CenterID,
          InsuranceID: id,
        };
        let url = "https://irannobat.ir:8444/api/CenterProfile/DeleteInsurance";
        axios
          .delete(url, { data })
          .then(function () {
            setInsuranceList(insuranceList.filter((a) => a._id !== id));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addInsuranceModal"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Insurance List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">
                        لیست بیمه های تحت پوشش مرکز
                      </h5>
                    </div>
                    <div className="col-auto d-flex flex-wrap">
                      <div className="form-custom me-2">
                        <div
                          id="tableSearch"
                          className="dataTables_wrapper"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <InsuranceListTable
                    data={insuranceList}
                    deleteInsurance={deleteInsurance}
                    updateInsurance={updateInsurance}
                  />
                )}
              </div>
              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>

      <AddInsuranceModal
        data={insuranceList}
        addInsurance={addInsurance}
        name={name}
        insuranceType={insuranceType}
        insuranceStatus={insuranceStatus}
        handleNameInput={handleNameInput}
        FUSelectInsuranceType={FUSelectInsuranceType}
        FUSelectInsuranceStatus={FUSelectInsuranceStatus}
      />

      <EditInsuranceModal
        editInsurance={editInsurance}
        data={editedInsurance}
        name={name}
        insuranceType={insuranceType}
        insuranceStatus={insuranceStatus}
        handleNameInput={handleNameInput}
        FUSelectInsuranceType={FUSelectInsuranceType}
        FUSelectInsuranceStatus={FUSelectInsuranceStatus}
      />
    </>
  );
};

export default Insurance;
