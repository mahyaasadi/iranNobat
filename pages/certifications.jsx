import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import Swal from "sweetalert2";
import Loading from "components/loading/Loading";
import CertificationsListTable from "/components/dashboard/certifications/certificationsListTable/certificationsListTable";
import AddCertificateModal from "components/dashboard/certifications/addCertificateModal/addCertificateModal";
import EditCertificateModal from "components/dashboard/certifications/editCertificateModal/editCertificateModal";

let CenterID = Cookies.get("CenterID");

const Certifications = () => {
  const [certificationsList, setCertificationsList] = useState([]);
  const [editedCertificate, setEditedCertificate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [linkAddress, setLinkAddress] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCompanyNameInput = (e) => setCompanyName(e.target.value);
  const handleLinkAddressInput = (e) => setLinkAddress(e.target.value);
  const handleCertificateNameInput = (e) => setCertificateName(e.target.value);
  const handleYearInput = (e) => setYear(e.target.value);

  //reset form inputs
  const reset = () => {
    setCompanyName("");
    setLinkAddress("");
    setCertificateName("");
    setYear("");
  };

  //Get certifications list
  const getCertifications = () => {
    axios
      .get(
        `https://irannobat.ir:8444/api/CenterProfile/getCenterCertificate/${CenterID}`
      )
      .then(function (response) {
        setCertificationsList(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    try {
      getCertifications();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  //Add Certifications
  const addCertificate = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterProfile/AddCertificate";
    let data = {
      CenterID: CenterID,
      Company: companyName,
      Link: linkAddress,
      Name: certificateName,
      Year: year,
    };

    axios
      .post(url, data)
      .then((response) => {
        setCertificationsList([...certificationsList, response.data]);
        $("#addCertificateModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit Certificate
  const editCertificate = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterProfile/UpdateCertificate";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let Data = {
      CenterID: CenterID,
      CertificateID: formProps.EditCertificateID,
      Company: formProps.EditCompanyName,
      Link: formProps.EditCertificateLink,
      Name: formProps.EditCertificateName,
      Year: formProps.EditCertificateYear,
    };

    axios
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditCertificateID, response.data);
        $("#editCertificateModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateItem = (id, newArr) => {
    let index = certificationsList.findIndex((x) => x._id === id);

    let g = certificationsList[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setCertificationsList([
        ...certificationsList.slice(0, index),
        g,
        ...certificationsList.slice(index + 1),
      ]);
  };

  const updateCertificate = (data) => {
    setEditedCertificate(data);
  };

  //Delete Certificate
  const deleteCertificate = (id) => {
    Swal.fire({
      title: "حذف مجوز !",
      text: "آیا از حذف مجوز مطمئن هستید",
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
          CertificateID: id,
        };
        let url =
          "https://irannobat.ir:8444/api/CenterProfile/DeleteCertificate";
        axios
          .delete(url, { data })
          .then(function () {
            setCertificationsList(
              certificationsList.filter((a) => a._id !== id)
            );
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
          {/* <!-- Page Header --> */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addCertificateModal"
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

          {/* <!-- Certifications List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">لیست مجوزها</h5>
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
                  <CertificationsListTable
                    data={certificationsList}
                    deleteCertificate={deleteCertificate}
                    updateCertificate={updateCertificate}
                  />
                )}
              </div>
              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AddCertificateModal
        addCertificate={addCertificate}
        companyName={companyName}
        linkAddress={linkAddress}
        certificateName={certificateName}
        year={year}
        handleCompanyNameInput={handleCompanyNameInput}
        handleLinkAddressInput={handleLinkAddressInput}
        handleCertificateNameInput={handleCertificateNameInput}
        handleYearInput={handleYearInput}
      />

      {/* Edit Modal */}
      <EditCertificateModal
        data={editedCertificate}
        editCertificate={editCertificate}
        companyName={companyName}
        linkAddress={linkAddress}
        certificateName={certificateName}
        year={year}
        handleCompanyNameInput={handleCompanyNameInput}
        handleLinkAddressInput={handleLinkAddressInput}
        handleCertificateNameInput={handleCertificateNameInput}
        handleYearInput={handleYearInput}
      />
    </>
  );
};

export default Certifications;
