import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/loading/loading";
import TariffHeader from "components/dashboard/tariff/tariffHeader";
import TariffListTable from "components/dashboard/tariff/tariffListTable";
import serviceGroupDifDataClass from "class/serviceGroupDifDataClass";
import ServiceGroupListTable from "components/dashboard/serviceGroupDetails/serviceGroupListTable";
import EditServiceGroupModal from "components/dashboard/serviceGroupDetails/editServiceGroupModal";
import EditServiceModal from "components/dashboard/serviceGroupDetails/editServiceModal";
import AddSrvGroupModal from "components/dashboard/serviceGroupDetails/addSrvGroupModal";
import AddTariffModal from "components/dashboard/tariff/addTariffModal";
import { getSession } from "lib/session";

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
const ServiceGroupDetails = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [services, setServices] = useState([]);
  const [editedServices, setEditedServices] = useState([]);
  const [groupDetail, setGroupDetail] = useState([]);
  const [editedGroupDetail, setEditedGroupDetail] = useState([]);
  const [srvGroupList, setSrvGroupList] = useState([]);
  const [srvGroupDifOptions, setSrvGroupDifOptions] = useState(
    serviceGroupDifDataClass
  );

  let selectSrvGroupName,
    selectSrvGroupDif = "";
  const FUSelectSrvGroupName = (srvGroupName) => {
    selectSrvGroupName = srvGroupName;
  };

  const FUSelectSrvGroupDif = (srvGroupDif) => {
    selectSrvGroupDif = srvGroupDif;
  };

  //get departments -> In Tariff Header
  const getDepartments = () => {
    setIsLoading(true);
    let url = `Center/GetDepartments/${CenterID}`;

    axiosClient
      .get(url)
      .then(function (response) {
        setIsLoading(false);
        setDepartmentsData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDepartments();
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

  //Add SrvGroup
  const addGroup = (e) => {
    e.preventDefault();

    let url = "CenterServicessInfo/addGroup";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      CenterID: CenterID,
      Name: formProps.addGroupName,
      POT: formProps.addGroupPOT,
      Color: formProps.addGroupColor,
      Dif: formProps.addGroupDif,
    };

    $("#addSrvGroupModal").modal("hide");
    setIsLoading(true);
    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setGroupDetail([...groupDetail, response.data]);
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // add service
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
      CenterGroup: formProps.groupName,
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

    console.log(addData);
    axiosClient
      .post(url, addData)
      .then((response) => {
        setServices([...services, response.data]);
        setIsLoading(false);
        console.log("added", response.data);
        $("#addTariffModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  //edit service
  const editServiceGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/EditServiceGroup";
    let data = {
      CenterID: CenterID,
      ServiceID: formProps.srvGroupId,
      CenterGroup: selectSrvGroupName,
    };

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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

  const updateServiceGroup = (data) => {
    setEditedGroupDetail(data);
    $("#editServiceModal").modal("show");
  };

  //Edit Group
  const editGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterServicessInfo/EditGroup ";
    let data = {
      CenterID: CenterID,
      GroupID: formProps.editGroupId,
      Name: formProps.editGroupName,
      POT: formProps.editGroupPOT,
      Dif: formProps.editGroupDif,
      Color: formProps.editGroupColor,
    };

    console.log("edit data", data);

    setIsLoading(true);
    axiosClient
      .put(url, data)
      .then((response) => {
        updateGroupItem(formProps.editGroupId, data);
        $("#editSrvGroupModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateGroupItem = (id, newArr) => {
    console.log(groupDetail);
    let index = groupDetail.findIndex((x) => x._id === id);
    let g = groupDetail[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setGroupDetail([
        ...groupDetail.slice(0, index),
        g,
        ...groupDetail.slice(index + 1),
      ]);
  };

  const updateGroup = (data) => {
    setEditedGroupDetail(data);
    $("#editSrvGroupModal").modal("show");
  };

  //delete SrvGroup
  const deleteSrvGroup = async (id) => {
    setIsLoading(true);
    let result = await QuestionAlert(
      "حذف گروه !",
      "آیا از حذف گروه خدمت مطمئن هستید؟"
    );

    if (result) {
      let url = "CenterServicessInfo/DeleteGroup";
      let data = {
        CenterID: CenterID,
        GroupID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then((response) => {
          console.log(response.data);
          setGroupDetail(groupDetail.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  //delete Service
  const deleteService = async (id) => {
    setIsLoading(true);
    let result = await QuestionAlert(
      "حذف سرویس!",
      "آیا از حذف سرویس مطمئن هستید"
    );

    if (result) {
      let url = `CenterServicessInfo/DeleteService`;
      let data = {
        CenterID: CenterID,
        DepID: activeDepId,
        ServiceID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(() => {
          setServices(services.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>گروه بندی سرویس ها</title>
      </Head>

      <div className="page-wrapper">
        {/* {isLoading ? (
          <Loading />
        ) : ( */}
        <div className="content container-fluid">
          <TariffHeader data={departmentsData} getServices={getServices} />

          <div className="tariff-btn-container">
            <div className="media-md-w-100 d-flex gap-2">
              <Link
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#addSrvGroupModal"
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
                      <p className="card-title font-16">لیست گروه ها</p>
                    </div>
                  </div>

                  <div className="flex-col">
                    <div className="col-sm-12">
                      <ServiceGroupListTable
                        data={groupDetail}
                        updateGroup={updateGroup}
                        deleteSrvGroup={deleteSrvGroup}
                      />
                    </div>
                    <div className="col d-flex justify-between align-items-center margint-5 marginb-1 media-srvHeader">
                      <p className="card-title font-16">لیست خدمات</p>
                      <div className="media-md-w-100">
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
                    </div>

                    <div className="col-sm-12">
                      <TariffListTable
                        data={services}
                        updateServiceGroup={updateServiceGroup}
                        deleteService={deleteService}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
        {/* )} */}

        <AddTariffModal
          addService={addService}
          srvGroupList={srvGroupList}
          FUSelectSrvGroupName={FUSelectSrvGroupName}
        />

        <AddSrvGroupModal
          data={groupDetail}
          addGroup={addGroup}
          srvGroupDifOptions={srvGroupDifOptions}
          FUSelectSrvGroupDif={FUSelectSrvGroupDif}
        />

        <EditServiceGroupModal
          groupDetail={editedGroupDetail}
          editGroup={editGroup}
          srvGroupDifOptions={srvGroupDifOptions}
          FUSelectSrvGroupDif={FUSelectSrvGroupDif}
        />

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
