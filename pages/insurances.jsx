import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import Loading from "components/loading/loading";
import InsuranceListTable from "components/dashboard/insurances/insuranceListTable";
import AddInsuranceModal from "components/dashboard/insurances/addInsuranceModal";
import EditInsuranceModal from "components/dashboard/insurances/editInsuranceModal";
import insuranceTypeDataClass from "class/insuranceTypeDataClass";
import insuranceStatusDataClass from "class/insuranceStatusDataClass";
import { QuestionAlert } from "class/AlertManage.js";
import { getSession } from "lib/session";

export const getServerSideProps = async ({ req, res }) => {
  // userInfo
  const { UserData, UserRoles } = await getSession(req);
  console.log({ UserRoles, UserData });

  // menusList
  const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
  const Menus = await data.json();
  return { props: { Menus, UserData, UserRoles } };
};

let CenterID = null;
const Insurance = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

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
  const reset = () => setName("");

  let SelectInsuranceType,
    SelectInsuranceStatus = "";

  const FUSelectInsuranceType = (Type) => (SelectInsuranceType = Type);
  const FUSelectInsuranceStatus = (Status) => (SelectInsuranceStatus = Status);

  //Get insurance list
  const getInsuranceData = () => {
    setIsLoading(true);
    let url = `CenterProfile/getCenterInsurance/${CenterID}`;

    if (CenterID) {
      axiosClient
        .get(url)
        .then((response) => {
          setInsuranceList(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  // Add Insurance
  const addInsurance = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "CenterProfile/AddInsurance";
    let data = {
      CenterID: CenterID,
      Name: name,
      Type: SelectInsuranceType,
      Status: SelectInsuranceStatus,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setInsuranceList([...insuranceList, response.data]);
        $("#addInsuranceModal").modal("hide");
        reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Edit Insurance
  const editInsurance = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "CenterProfile/UpdateInsurance";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let Data = {
      CenterID: CenterID,
      InsuranceID: formProps.EditInsuranceID,
      Name: formProps.EditInsuranceName,
      Type: formProps.EditInsuranceType,
      Status: formProps.EditInsuranceStatus,
    };

    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditInsuranceID, response.data);
        $("#editInsuranceModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateItem = (id, newArr) => {
    let index = insuranceList.findIndex((x) => x._id === id);
    let g = insuranceList[index];
    g = newArr;

    if (index === -1) {
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
    $("#editInsuranceModal").modal("show");
  };

  // Delete Insurance
  const deleteInsurance = async (id) => {
    let result = await QuestionAlert("حذف بیمه!", "آیا از حذف مطمئن هستید");

    if (result) {
      let url = "CenterProfile/DeleteInsurance";
      let data = {
        CenterID: CenterID,
        InsuranceID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setInsuranceList(insuranceList.filter((a) => a._id !== id));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getInsuranceData();
  }, []);

  return (
    <>
      <Head>
        <title>بیمه های تحت پوشش</title>
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
                    data-bs-target="#addInsuranceModal"
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
                        <h5 className="card-title font-16">
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

                  <InsuranceListTable
                    data={insuranceList}
                    deleteInsurance={deleteInsurance}
                    updateInsurance={updateInsurance}
                  />
                </div>
                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}
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
