import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import FeatherIcon from "feather-icons-react";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import { getSession } from "lib/session";
import Loading from "components/commonComponents/loading/loading";
import DepartmentsHeader from "components/dashboard/tariff/departments/departmentsHeader";
import TariffListTable from "components/dashboard/tariff/tariffListTable";
import TariffModal from "components/dashboard/tariff/tariffModal";
import TariffCalcModal from "components/dashboard/tariff/tariffCalcModal";
import LoeingTableModal from "components/dashboard/tariff/loeing/loeingTableModal";
import LoeingModal from "components/dashboard/tariff/loeing/loeingModal";
import applyCalculationsDataClass from "class/applyCalculationsDataClass";

let activeServiceId = null;
let activeServiceName = null;
let activeDepId = null;
let activeDepName = null;

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
const Tariff = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [services, setServices] = useState([]);
  const [editServiceData, setEditServiceData] = useState([]);

  const [loeingData, SetLoeingData] = useState([]);
  const [editLoeingData, setEditLoeingData] = useState([]);

  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [showLoeingModal, setShowLoeingModal] = useState(false)
  const [showLoeingTableModal, setShowLoeingTableModal] = useState(false);

  const handleCloseTariffModal = () => setShowTariffModal(false);
  const handleCloseLoeingModal = () => setShowLoeingModal(false)
  const handleCloseLoeingTableModal = () => setShowLoeingTableModal(false)

  // get departments -> in header
  const getDepartments = () => {
    setIsLoading(true);
    let url = `Center/GetDepartments/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        setDepartmentsData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => getDepartments(), []);

  // get services
  const getServices = (DepID, PerFullName) => {
    setIsLoading(true);

    activeDepId = DepID;
    activeDepName = PerFullName;
    let url = `CenterServicessInfo/getByDepID/${CenterID}/${DepID}`;

    axiosClient
      .get(url)
      .then((response) => {
        console.log("services", response.data);
        if (response.data.error) {
          console.log("error");
          getDefaultServices(DepID, PerFullName);
        } else {
          setServices(response.data.ServicesInfo);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //return to default services
  const getDefaultServices = async (DepID, PerFullName) => {
    setIsLoading(true);

    let result = await QuestionAlert(
      "بازگشت به تنظیمات مرکز!",
      "آیا از بازگشت به تنظیمات مرکز مطمئن هستید؟"
    );

    if (result) {
      let url = "CenterServicessInfo/SyncToDefault";
      let data = {
        CenterID: CenterID,
        ModalityID: DepID,
        ModalityName: PerFullName,
      };

      await axiosClient
        .post(url, data)
        .then((response) => {
          setServices(response.data.ServicesInfo);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  //Add service
  const openAddServiceModal = () => {
    setShowTariffModal(true);
    setModalMode("add")
  };

  const addService = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/AddService";
    let addData = {
      CenterID: CenterID,
      DepID: activeDepId,
      ServiceID: formProps.serviceId,
      Service: formProps.serviceName,
      InternalCode: formProps.addInternalCode,
      Total_K: formProps.total_K,
      Technical_K: formProps.tech_K,
      Professional_K: formProps.pro_K,
      GovernmentalTariff: formProps.govTariff,
      PrivateTariff: formProps.privateTariff,
      FreeTariff: formProps.freeTariff,
      PatientCost: formProps.patientCost,
      ArteshPatientCost: formProps.arteshPatientCost,
      PrivateTechnicalK_Price: formProps.ptk_price,
      PrivateProfessionalK_Price: formProps.ppk_price,
      GovernmentalTechnicalK_Price: formProps.gtk_price,
      GovernmentalProfessionalK_Price: formProps.gpk_price,
      ST: formProps.taminShare,
      SS: formProps.salamatShare,
      SA: formProps.arteshShare,
    };

    console.log("addData", addData);

    axiosClient
      .post(url, addData)
      .then((response) => {
        console.log("add response", response.data);
        setServices([...services, response.data]);
        setShowTariffModal(false)
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن خدمت با خطا مواجه گردید!");
      });
  };

  //edit service
  const editService = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/EditServiceTariff";
    let editData = {
      CenterID: CenterID,
      DepID: activeDepId,
      ServiceID: formProps.serviceId,
      Service: formProps.serviceName,
      InternalCode: formProps.editInternalCode,
      Total_K: formProps.total_K,
      Technical_K: formProps.tech_K,
      Professional_K: formProps.pro_K,
      PrivateTechnicalK_Price: formProps.ptk_price,
      PrivateProfessionalK_Price: formProps.ppk_price,
      GovernmentalTechnicalK_Price: formProps.gtk_price,
      GovernmentalProfessionalK_Price: formProps.gpk_price,
      GovernmentalTariff: formProps.govTariff,
      PrivateTariff: formProps.privateTariff,
      FreeTariff: formProps.freeTariff,
      PatientCost: formProps.patientCost,
      ArteshPatientCost: formProps.arteshPatientCost,
      ST: formProps.taminShare,
      SS: formProps.salamatShare,
      SA: formProps.arteshShare,
    };

    console.log("data", editData);

    await axiosClient
      .put(url, editData)
      .then((response) => {
        console.log("response", response.data);
        updateItem(formProps.serviceId, response.data);
        setShowTariffModal(false)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const updateItem = (id, newArr) => {
    let index = services.findIndex((x) => x._id === id);
    let g = services[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setServices([
        ...services.slice(0, index),
        g,
        ...services.slice(index + 1),
      ]);
  };

  const updateService = (data) => {
    setEditServiceData(data);
    setShowTariffModal(true);
    setModalMode("edit")
  };

  // Delete service
  const deleteService = async (id) => {
    let result = await QuestionAlert(
      "حذف سرویس!",
      "آیا از حذف سرویس مطمئن هستید"
    );

    if (result) {
      setIsLoading(true)
      let url = `CenterServicessInfo/DeleteService`;
      let data = {
        CenterID: CenterID,
        DepID: activeDepId,
        ServiceID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setServices(services.filter((a) => a._id !== id));
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false)
        });
    }
  };

  // ----------------------------------------------------------------

  // set loeing data
  const SetLoeingModalData = (data, id, name) => {
    activeServiceId = id;
    activeServiceName = name;
    SetLoeingData(data);
    setShowLoeingTableModal(true)
  };

  // Add Loeing
  const openAddLoeingModal = () => {
    setShowLoeingModal(true);
    setModalMode("add");
  };

  const addLoeing = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/AddLoeing";
    let addData = {
      CenterID: CenterID,
      ServiceID: activeServiceId,
      LoeingCode: formProps.loeingCode,
      Name: formProps.loeingName,
    };

    axiosClient
      .post(url, addData)
      .then((response) => {
        SetLoeingData([...loeingData, response.data]);

        // increasing the loeing count
        let count = $("#loeingCount" + activeServiceId).html();
        count = parseInt(count);
        count++;
        $("#loeingCount" + activeServiceId).html(count);

        getServices(activeDepId, activeDepName);

        e.target.reset();
        setShowLoeingModal(false)
        setShowLoeingTableModal(true)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Delete loeing
  const deleteLoeing = async (id) => {
    let result = await QuestionAlert(
      "حذف لوئینگ!",
      "آیا از حذف خدمت لوئینگ مطمئن هستید"
    );

    if (result) {
      let url = `CenterServicessInfo/DeleteLoeing`;
      let data = {
        CenterID: CenterID,
        ServiceID: activeServiceId,
        LoeingID: id,
      };

      await axiosClient
        .delete(url, { data: data })
        .then(function () {
          SetLoeingData(loeingData.filter((a) => a._id !== id));

          // decreasing the loeing count
          let count = $("#loeingCount" + activeServiceId).html();
          count = parseInt(count);
          count--;
          $("#loeingCount" + activeServiceId).html(count);

          getServices(activeDepId, activeDepName);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //Edit loeing
  const editLoeing = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/EditLoeing";
    let editData = {
      CenterID: CenterID,
      ServiceID: activeServiceId,
      LoeingCode: formProps.loeingCode,
      Name: formProps.loeingName,
      LoeingID: formProps.loeingId,
    };

    axiosClient
      .put(url, editData)
      .then((response) => {
        updateLoeingItem(formProps.loeingId, response.data);
        setShowLoeingModal(false)
        setShowLoeingTableModal(true)

        getServices(activeDepId, activeDepName);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  };

  const updateLoeingItem = (id, newArr) => {
    let index = loeingData.findIndex((x) => x._id === id);
    let g = loeingData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      SetLoeingData([
        ...loeingData.slice(0, index),
        g,
        ...loeingData.slice(index + 1),
      ]);
  };

  const updateLoeing = (data) => {
    setEditLoeingData(data);
    setShowLoeingModal(true);
    setModalMode("edit")
  };

  // ----------------------------------------------------------------

  // Apply Calculations based on k
  const applyKCalculations = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/EditServiceTariffByValue/Tariff/k";
    let data = {
      CenterID: CenterID,
      ModalityID: activeDepId,
      PKF: parseInt(formProps.pkf),
      PKH: parseInt(formProps.pkh),
      GKF: parseInt(formProps.gkf),
      GKH: parseInt(formProps.gkh),
    };

    await axiosClient
      .put(url, data)
      .then((response) => {
        setServices(response.data.ServicesInfo);
        $("#tariffCalcModal").modal("hide");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Apply Calculations based on Price
  const applyPriceCalculations = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = `CenterServicessInfo/EditServiceTariffByValue/${formProps.applyPriceOptions}/price`;
    let data = {
      CenterID: CenterID,
      ModalityID: activeDepId,
      Price: parseInt(formProps.price),
    };

    await axiosClient
      .put(url, data)
      .then((response) => {
        setServices(response.data.ServicesInfo);
        $("#tariffCalcModal").modal("hide");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Apply Calculations based on Percentage
  const applyPercentCalculations = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = `CenterServicessInfo/EditServiceTariffByValue/${formProps.applyPercentOptions}/percent`;
    let data = {
      CenterID: CenterID,
      ModalityID: activeDepId,
      Percent: formProps.percent,
    };

    await axiosClient
      .put(url, data)
      .then((response) => {
        setServices(response.data.ServicesInfo);
        $("#tariffCalcModal").modal("hide");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>تعرفه بخش ها</title>
      </Head>

      <div className="page-wrapper">
        <div className="content container-fluid">
          <DepartmentsHeader data={departmentsData} getServices={getServices} />

          <div className="tariff-btn-container">
            <div className="media-md-w-100">
              <button
                onClick={openAddServiceModal}
                className="btn btn-primary btn-add media-md-w-100 font-14 media-font-12"
              >
                <i className="me-1">
                  <FeatherIcon icon="plus-square" />
                </i>{" "}
                سرویس جدید
              </button>
            </div>

            <div className="media-md-w-100">
              <Link
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#tariffCalcModal"
                className="btn btn-primary btn-add media-md-w-100 font-14 media-font-12"
              >
                <i className="me-1">
                  <FeatherIcon icon="percent" />
                </i>{" "}
                اعمال محاسبات
              </Link>
            </div>

            <div className="media-md-w-100">
              <button
                className="btn btn-primary btn-add media-md-w-100 font-14 media-font-12"
                onClick={() => getDefaultServices(activeDepId, activeDepName)}
              >
                <i className="me-1 ">
                  <FeatherIcon icon="refresh-cw" />
                </i>{" "}
                بازگشت به تنظیمات مرکز
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست خدمات</h5>
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

                  <div className="col-sm-12 font-size-12">
                    <TariffListTable
                      data={services}
                      updateService={updateService}
                      deleteService={deleteService}
                      SetLoeingModalData={SetLoeingModalData}
                    />
                  </div>
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          )}
        </div>

        <TariffCalcModal
          applyKCalculations={applyKCalculations}
          data={editServiceData}
          isLoading={isLoading}
          calculationsOptions={applyCalculationsDataClass}
          applyPercentCalculations={applyPercentCalculations}
          applyPriceCalculations={applyPriceCalculations}
        />

        <TariffModal
          isLoading={isLoading}
          mode={modalMode}
          onHide={handleCloseTariffModal}
          show={showTariffModal}
          data={editServiceData}
          onSubmit={modalMode == "edit" ? editService : addService}
        />

        <LoeingTableModal
          data={loeingData}
          Service={activeServiceId}
          ServiceName={activeServiceName}
          deleteLoeing={deleteLoeing}
          updateLoeing={updateLoeing}
          openAddLoeingModal={openAddLoeingModal}
          show={showLoeingTableModal}
          onHide={handleCloseLoeingTableModal}
        />

        <LoeingModal
          mode={modalMode}
          isLoading={isLoading}
          onHide={handleCloseLoeingModal}
          show={showLoeingModal}
          data={editLoeingData}
          onSubmit={modalMode == "edit" ? editLoeing : addLoeing}
        />
      </div>
    </>
  );
};

export default Tariff;
