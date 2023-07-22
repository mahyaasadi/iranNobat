import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosClient } from "class/axiosConfig.js";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/loading/loading";
import TariffHeader from "components/dashboard/tariff/tariffHeader";
import TariffListTable from "components/dashboard/tariff/tariffListTable";
import ServiceGroupListTable from "components/dashboard/serviceGroupDetails/serviceGroupListTable";
import EditServiceGroupModal from "components/dashboard/serviceGroupDetails/editServiceGroupModal";
import EditServiceModal from "components/dashboard/serviceGroupDetails/editServiceModal";

let CenterID = Cookies.get("CenterID");
let activeServiceId = null;
let activeServiceName = null;
let activeDepId = null;
let activeDepName = null;

const ServiceGroupDetails = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [departmentsData, setDepartmentsData] = useState([]);
  const [services, setServices] = useState([]);
  const [editedServices, setEditedServices] = useState([]);
  const [groupDetail, setGroupDetail] = useState([]);
  const [editedGroupDetail, setEditedGroupDetail] = useState([]);
  const [srvGroupList, setSrvGroupList] = useState([]);

  let selectSrvGroupName = "";
  const FUSelectSrvGroupName = (srvGroupName) => {
    selectSrvGroupName = srvGroupName;
  };

  //get departments -> In Tariff Header
  const getDepartments = () => {
    let UrlGetDep = `Center/GetDepartments/${CenterID}`;
    setIsLoading(true);

    axiosClient.get(UrlGetDep).then(function (response) {
      setIsLoading(false);
      setDepartmentsData(response.data);
    });
  };

  useEffect(() => {
    try {
      getDepartments();
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }, []);

  //get services
  const getServices = (DepID, PerFullName) => {
    activeDepId = DepID;
    activeDepName = PerFullName;
    let url = `CenterServicessInfo/getByDepID/${CenterID}/${DepID}`;
    setIsLoading(true);

    axiosClient.get(url).then(function (response) {
      console.log("services", response.data);
      setIsLoading(false);
      if (response.data.ServicesInfo.length > 0) {
        setServices(response.data.ServicesInfo);
        setGroupDetail(response.data.GroupDetail);

        //srvGroupName Options
        let selectServiceGroup = [];
        for (let i = 0; i < response.data.GroupDetail.length; i++) {
          const item = response.data.GroupDetail[i];
          let obj = {
            value: item.Name,
            label: item.Name,
          };
          selectServiceGroup.push(obj);
        }
        setSrvGroupList(selectServiceGroup);
      } else if (
        !response.data.ServiceInfo ||
        response.data.ServicesInfo.length === 0
      ) {
        getDefaultServices(activeDepId, activeDepName);
      }
    });
  };

  //edit service
  const editServiceGroup = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/EditServiceGroup";

    let data = {
      CenterID: CenterID,
      ServiceID: formProps.srvGroupId,
      CenterGroup: selectSrvGroupName,
    };

    console.log("edit data", data);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);

        updateItem(formProps.srvGroupId, {
          _id: formProps.srvGroupId,
          Service: formProps.ServiceName,
          CenterGroup: selectSrvGroupName,
        });
        $("#editServiceModal").modal("hide");
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

  const updateServiceGroup = (data) => {
    setEditedGroupDetail(data);
  };

  return (
    <>
      <Head>
        <title>گروه بندی سرویس ها</title>
      </Head>

      <div className="page-wrapper">
        <div className="content container-fluid">
          <TariffHeader data={departmentsData} getServices={getServices} />

          <div className="tariff-btn-container">
            <div className="media-md-w-100 d-flex gap-2">
              <Link
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#addTariffModal"
                className="btn btn-primary btn-add media-md-w-100 font-14 media-font-12"
              >
                <i className="me-1">
                  <FeatherIcon icon="plus-square" />
                </i>{" "}
                گروه جدید
              </Link>
            </div>
          </div>

          {/* <!--  services Table --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col marginb-1">
                      <p className="card-title font-17">لیست گروه ها</p>
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

                  {isLoading ? (
                    <Loading />
                  ) : (
                    <div className="flex-col">
                      <div className="col-sm-12">
                        <ServiceGroupListTable data={groupDetail} />
                      </div>
                      <div className="col d-flex justify-between align-items-center margint-5 marginb-1">
                        <p className="card-title font-17">لیست سرویس ها</p>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#addTariffModal"
                          className="btn btn-primary btn-add media-md-w-100 font-14 media-font-12"
                        >
                          <i className="me-1">
                            <FeatherIcon icon="plus-square" />
                          </i>{" "}
                          سرویس جدید
                        </Link>
                      </div>

                      <div className="col-sm-12">
                        <TariffListTable
                          data={services}
                          //   groupDetail={editedGroupDetail}
                          updateServiceGroup={updateServiceGroup}
                          //   deleteService={deleteService}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <EditServiceGroupModal />

        <EditServiceModal
          groupDetail={editedGroupDetail}
          services={editedServices}
          editServiceGroup={editServiceGroup}
          srvGroupList={srvGroupList}
          FUSelectSrvGroupName={FUSelectSrvGroupName}
        />
      </div>
    </>
  );
};

export default ServiceGroupDetails;
