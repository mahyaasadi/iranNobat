import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import { axiosClient } from "class/axiosConfig.js";
import FeatherIcon from "feather-icons-react";
import Loading from "components/commonComponents/loading/loading";
import CertificationsListTable from "/components/dashboard/certifications/certificationsListTable";
import AddCertificateModal from "components/dashboard/certifications/addCertificateModal";
import EditCertificateModal from "components/dashboard/certifications/editCertificateModal";
import { QuestionAlert } from "class/AlertManage.js";
import { getSession } from "lib/session";

export const getServerSideProps = async ({ req, res }) => {
  const result = await getSession(req, res);

  if (result) {
    const { UserData, UserRoles } = result;
    const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
    const Menus = await data.json();
    return { props: { Menus, UserData, UserRoles } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

let CenterID = null;
const Certifications = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [certificationsList, setCertificationsList] = useState([]);
  const [editedCertificate, setEditedCertificate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //Get certifications list
  const getCertifications = () => {
    setIsLoading(true);

    axiosClient
      .get(`CenterProfile/getCenterCertificate/${CenterID}`)
      .then((response) => {
        setCertificationsList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCertifications();
  }, []);

  //Add Certifications
  const addCertificate = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterProfile/AddCertificate";
    let data = {
      CenterID: CenterID,
      Company: formProps.addCertificateCompany,
      Link: formProps.addCertificateLink,
      Name: formProps.addCertificateName,
      Year: formProps.addCertificateYear,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setCertificationsList([...certificationsList, response.data]);

        $("#addCertificateModal").modal("hide");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Edit Certificate
  const editCertificate = (e) => {
    e.preventDefault();

    let url = "CenterProfile/UpdateCertificate";
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

    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditCertificateID, response.data);
        $("#editCertificateModal").modal("hide");
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
    $("#editCertificateModal").modal("show");
  };

  //Delete Certificate
  const deleteCertificate = async (id) => {
    let result = await QuestionAlert(
      "حذف مجوز !",
      "آیا از حذف مجوز مطمئن هستید"
    );

    if (result) {
      let url = "CenterProfile/DeleteCertificate";
      let data = {
        CenterID: CenterID,
        CertificateID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function (response) {
          setCertificationsList(certificationsList.filter((a) => a._id !== id));
        })
        .catch(function (error) {
          return error;
        });
    }
  };

  return (
    <>
      <Head>
        <title>مجوزها</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end">
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#addCertificateModal"
                    className="btn btn-primary btn-add font-14"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    اضافه کردن
                  </Link>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست مجوزها</h5>
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

                  <CertificationsListTable
                    data={certificationsList}
                    deleteCertificate={deleteCertificate}
                    updateCertificate={updateCertificate}
                  />
                </div>
                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddCertificateModal addCertificate={addCertificate} />

      <EditCertificateModal
        data={editedCertificate}
        editCertificate={editCertificate}
      />
    </>
  );
};

export default Certifications;
