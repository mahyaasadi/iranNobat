import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/loading";
import TariffHeader from "components/dashboard/tariff/tariffHeader";
import TariffListTable from "components/dashboard/tariff/tariffListTable";
import AddTariffModal from "components/dashboard/tariff/addTariffModal";
import EditTariffModal from "components/dashboard/tariff/editTariffModal";
import TariffCalcModal from "components/dashboard/tariff/tariffCalcModal";
import LoeingModal from "components/dashboard/tariff/loeing/loeingModal";
import AddLoeingModal from "components/dashboard/tariff/loeing/addLoeingModal";
import EditLoeingModal from "components/dashboard/tariff/loeing/editLoeingModal";
import applyCalculationsDataClass from "class/applyCalculationsDataClass";

let CenterID = Cookies.get("CenterID");
let activeServiceId = null;
let activeServiceName = null;
let activeDepId = null;
let activeDepName = null;

const Tariff = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [departmentsData, setDepartmentsData] = useState([]);
  const [services, setServices] = useState([]);
  const [editedServices, setEditedServices] = useState([]);

  const [loeingData, SetLoeingData] = useState([]);
  const [editedLoeing, setEditedLoeing] = useState([]);

  const [calculationsOptions, setCalculationsOptions] = useState(
    applyCalculationsDataClass
  );

  //get departments -> In Tariff Header
  const getDepartments = () => {
    let UrlGetDep = `https://irannobat.ir:8444/api/Center/GetDepartments/${CenterID}`;
    setIsLoading(true);

    axios.get(UrlGetDep).then(function (response) {
      setIsLoading(false);
      setDepartmentsData(response.data);
      // console.log("departments", departmentsData);
    });
  };

  //setting nav[0] as the default clicked one
  const clickNav = () => {
    let nav = $(".ServiceNav");
    nav[0].click();
  };

  useEffect(() => {
    try {
      getDepartments();
      // setting nav[0] as default clicked
      setTimeout(() => clickNav(), 3000);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }, []);

  //get services
  const getServices = (DepID, PerFullName) => {
    activeDepId = DepID;
    activeDepName = PerFullName;
    let url = `https://irannobat.ir:8444/api/CenterServicessInfo/getByDepID/${CenterID}/${DepID}`;
    setIsLoading(true);

    axios.get(url).then(function (response) {
      console.log("services", response.data.ServicesInfo);
      setIsLoading(false);
      if (response.data.ServicesInfo.length > 0) {
        setServices(response.data.ServicesInfo);
      } else if (
        !response.data.ServiceInfo ||
        response.data.ServicesInfo.length === 0
      ) {
        getDefaultServices(activeDepId, activeDepName);
      }
    });
  };

  //return to default services
  const getDefaultServices = (DepID, PerFullName) => {
    Swal.fire({
      title: "بازگشت به تنظیمات مرکز!",
      text: "آیا از بازگشت به تنظیمات مرکز مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#0db1ca",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        let defaultUrl =
          "https://irannobat.ir:8444/api/CenterServicessInfo/SyncToDefault";

        let data = {
          CenterID: CenterID,
          ModalityID: DepID,
          ModalityName: PerFullName,
        };

        axios
          .post(defaultUrl, data)
          .then((response) => {
            setIsLoading(false);

            console.log("defaultServices", response.data);
            setServices(response.data.ServicesInfo);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(true);
          });
      }
    });
  };

  //Add service
  const addService = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "https://irannobat.ir:8444/api/CenterServicessInfo/AddService";
    let addData = {
      CenterID: CenterID,
      DepID: activeDepId,
      ServiceID: formProps.serviceId,
      Service: formProps.serviceName,
      Total_K: formProps.total_K,
      Technical_K: formProps.tech_K,
      Professional_K: formProps.pro_K,
      GovernmentalTariff: formProps.govTariff,
      PrivateTariff: formProps.privateTariff,
      ST: formProps.taminShare,
      SS: formProps.salamatShare,
      SA: formProps.arteshShare,
    };

    axios
      .post(url, addData)
      .then((response) => {
        setServices([...services, response.data]);
        setIsLoading(false);

        $("#addTariffModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  };

  //edit service
  const editService = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url =
      "https://irannobat.ir:8444/api/CenterServicessInfo/EditServiceTariff";

    let editData = {
      CenterID: CenterID,
      DepID: activeDepId,
      ServiceID: formProps.serviceId,
      Service: formProps.serviceName,
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
      ST: formProps.taminShare,
      SS: formProps.salamatShare,
      SA: formProps.arteshShare,
    };

    axios
      .put(url, editData)
      .then((response) => {
        console.log("reponese", response.data);
        updateItem(formProps.serviceId, response.data);
        $("#editTariffModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  };

  const updateItem = (id, newArr) => {
    let index = services.findIndex((x) => x._id === id);
    let g = services[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setServices([
        ...services.slice(0, index),
        g,
        ...services.slice(index + 1),
      ]);
  };

  const updateService = (data) => {
    setEditedServices(data);
  };

  // Delete service
  const deleteService = (id) => {
    Swal.fire({
      title: "حذف سرویس!",
      text: "آیا از حذف سرویس مطمئن هستید",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#0db1ca",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          CenterID: CenterID,
          DepID: activeDepId,
          ServiceID: id,
        };
        let url = `https://irannobat.ir:8444/api/CenterServicessInfo/DeleteService`;

        axios
          .delete(url, { data })
          .then(function () {
            setServices(services.filter((a) => a._id !== id));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  // ----------------------------------------------------------------

  // set loeing data
  const SetLoeingModalData = (data, id, name) => {
    activeServiceId = id;
    activeServiceName = name;
    SetLoeingData(data);
  };

  // Add Loeing
  const addLoeing = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "https://irannobat.ir:8444/api/CenterServicessInfo/AddLoeing";

    let addData = {
      CenterID: CenterID,
      ServiceID: activeServiceId,
      LoeingCode: formProps.loeingCode,
      Name: formProps.loeingName,
    };
    console.log(addData);
    axios
      .post(url, addData)
      .then((response) => {
        SetLoeingData([...loeingData, response.data]);

        setIsLoading(false);
        $("#addLoeingModal").modal("hide");
        $("#loeingModal").modal("show");

        //increasing the loeing count
        let count = $("#loeingCount" + activeServiceId).html();
        count = parseInt(count);
        count++;
        $("#loeingCount" + activeServiceId).html(count);

        getServices(activeDepId, activeDepName);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  };

  // Delete loeing
  const deleteLoeing = (id) => {
    Swal.fire({
      title: "حذف لوئینگ!",
      text: "آیا از حذف خدمت لوئینگ مطمئن هستید",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#0db1ca",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        let deleteData = {
          CenterID: CenterID,
          ServiceID: activeServiceId,
          LoeingID: id,
        };
        let url = `https://irannobat.ir:8444/api/CenterServicessInfo/DeleteLoeing`;

        axios
          .delete(url, { data: deleteData })
          .then(function () {
            SetLoeingData(loeingData.filter((a) => a._id !== id));

            //decreasing the loeing count
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
    });
  };

  //Edit loeing
  const editLoeing = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "https://irannobat.ir:8444/api/CenterServicessInfo/EditLoeing";

    let editData = {
      CenterID: CenterID,
      ServiceID: activeServiceId,
      LoeingCode: formProps.loeingCode,
      Name: formProps.loeingName,
      LoeingID: formProps.loeingId,
    };

    axios
      .put(url, editData)
      .then((response) => {
        // console.log("reponese", response.data);
        updateLoeingItem(formProps.loeingId, response.data);
        $("#editLoeingModal").modal("hide");
        $("#loeingModal").modal("show");

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
      // handle error
      console.log("no match");
    } else
      SetLoeingData([
        ...loeingData.slice(0, index),
        g,
        ...loeingData.slice(index + 1),
      ]);
  };

  const updateLoeing = (data) => {
    setEditedLoeing(data);
  };

  // ----------------------------------------------------------------

  // Apply Calculations based on k
  const applyKCalculations = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url =
      "https://irannobat.ir:8444/api/CenterServicessInfo/EditServiceTariffByValue/Tariff/k";
    let data = {
      CenterID: CenterID,
      ModalityID: activeDepId,
      PKF: parseInt(formProps.pkf),
      PKH: parseInt(formProps.pkh),
      GKF: parseInt(formProps.gkf),
      GKH: parseInt(formProps.gkh),
    };

    await axios
      .put(url, data)
      .then((response) => {
        setIsLoading(false);
        // console.log("response", response.data);
        setServices(response.data.ServicesInfo);
        $("#tariffCalcModal").modal("hide");
        e.target.reset();
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

    let url = `https://irannobat.ir:8444/api/CenterServicessInfo/EditServiceTariffByValue/${formProps.applyPriceOptions}/price`;
    let data = {
      CenterID: CenterID,
      ModalityID: activeDepId,
      Price: parseInt(formProps.price),
    };
    console.log("sentData: ", data, url);

    await axios
      .put(url, data)
      .then((response) => {
        console.log("clicked");
        setIsLoading(false);
        console.log("response", response.data);
        setServices(response.data.ServicesInfo);
        $("#tariffCalcModal").modal("hide");
        e.target.reset();
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

    let url = `https://irannobat.ir:8444/api/CenterServicessInfo/EditServiceTariffByValue/${formProps.applyPercentOptions}/percent`;
    let data = {
      CenterID: CenterID,
      ModalityID: activeDepId,
      Percent: formProps.percent,
    };

    await axios
      .put(url, data)
      .then((response) => {
        setIsLoading(false);
        // console.log("response", response.data);
        setServices(response.data.ServicesInfo);
        $("#tariffCalcModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <TariffHeader data={departmentsData} getServices={getServices} />

        <div className="tariff-btn-container">
          <div>
            <Link
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#addTariffModal"
              className="btn btn-primary btn-add"
            >
              <i className="me-1">
                <FeatherIcon icon="plus-square" />
              </i>{" "}
              سرویس جدید
            </Link>
          </div>

          <div>
            <Link
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#tariffCalcModal"
              className="btn btn-primary btn-add"
            >
              <i className="me-1">
                <FeatherIcon icon="percent" />
              </i>{" "}
              اعمال محاسبات
            </Link>
          </div>

          <div>
            <Link
              href="#"
              className="btn btn-primary btn-add"
              onClick={() => getDefaultServices(activeDepId, activeDepName)}
            >
              <i className="me-1">
                <FeatherIcon icon="refresh-cw" />
              </i>{" "}
              بازگشت به تنظیمات مرکز
            </Link>
          </div>
        </div>

        {/* <!--  services Table --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header border-bottom-0">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="card-title">لیست سرویس ها</h5>
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
                <div className="col-sm-12 font-size-12">
                  <TariffListTable
                    data={services}
                    updateService={updateService}
                    deleteService={deleteService}
                    SetLoeingModalData={SetLoeingModalData}
                  />
                </div>
              )}
            </div>

            <div id="tablepagination" className="dataTables_wrapper"></div>
          </div>
        </div>
      </div>

      <TariffCalcModal
        applyKCalculations={applyKCalculations}
        data={editedServices}
        isLoading={isLoading}
        calculationsOptions={calculationsOptions}
        applyPercentCalculations={applyPercentCalculations}
        applyPriceCalculations={applyPriceCalculations}
      />

      <AddTariffModal addService={addService} />

      <EditTariffModal data={editedServices} editService={editService} />

      <LoeingModal
        data={loeingData}
        addLoeing={addLoeing}
        Service={activeServiceId}
        ServiceName={activeServiceName}
        deleteLoeing={deleteLoeing}
        updateLoeing={updateLoeing}
      />

      <AddLoeingModal data={loeingData} addLoeing={addLoeing} />

      <EditLoeingModal data={editedLoeing} editLoeing={editLoeing} />
    </div>
  );
};

export default Tariff;
