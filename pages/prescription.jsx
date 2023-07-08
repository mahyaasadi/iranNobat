import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loading from "components/loading/loading";
import PrescriptionCard from "components/dashboard/prescription/prescriptionCard/prescriptionCard";
import PatientInfo from "components/dashboard/prescription/PatientInfo";
import TaminHeader from "components/dashboard/prescription/TaminVsArteshHeader";
import ArteshDoctorsListTable from "components/dashboard/prescription/arteshDoctorsListTable";
import PrescriptionItems from "components/dashboard/prescription/PrescriptionItems";
import {
  TaminPrescType,
  TaminServiceType,
} from "components/dashboard/prescription/taminprescriptionData";

let CenterID = Cookies.get("CenterID");

let precId = "01";
let ActiveSrvCode,
  ActiveSrvName,
  ActivePrscImg,
  ActiveTaminSrvCode,
  ActivePatientID,
  ActivePatientTel = null;

const changePrescId = (id, Img) => {
  precId = id;
  if (typeof Img !== "undefined") {
    ActivePrscImg = Img;
  }
};

const selectPrescriptionType = () => {
  console.log("select");
};

const SelectSrvSearch = (name, code, Tamin) => {
  ActiveTaminSrvCode = Tamin;
  ActiveSrvCode = code;
  ActiveSrvName = name;
  $("#SrvSearchInput").val(name);
  $(".SearchDiv").hide();
};

const Prescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [patientsInfo, setPatientsInfo] = useState([]);
  const [TaminSrvSerachList, setTaminSrvSerachList] = useState([]);
  const [PrescriptionItemsData, SetPrescriptionItemsDta] = useState([]);
  const [taminHeaderList, settaminHeaderList] = useState(TaminPrescType);
  const [TaminServiceTypeList, setTaminServiceTypeList] =
    useState(TaminServiceType);

  let insuranceType = null;

  //get patient info
  const getPatientInfo = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    ActivePatientID = formProps.nationalCode;

    let url = "https://irannobat.ir:8444/api/Patient/checkByNid";
    let data = {
      CenterID: CenterID,
      NID: formProps.nationalCode,
    };

    axios
      .post(url, data)
      .then((response) => {
        setIsLoading(false);
        // setInsuranceType(response.data.user.InsuranceTypeName);
        console.log(response.data);
        setPatientsInfo(response.data.user);
        $("#patientInfoSection").show("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Change Insurance Type
  const selectInsuranceType = (type) => {
    insuranceType = type;
  };

  const changeInsuranceType = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "https://irannobat.ir:8444/api/Patient/ChangeInsurance";
    let data = {
      CenterID: CenterID,
      IID: formProps.insuranceTypeOptions,
      NID: ActivePatientID,
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log("changeInsurance", response.data);
        if (response.data.isCovered) {
          Swal.fire({
            title: "!تغییر نوع بیمه با موفقیت انجام شد",
            icon: "success",
            allowOutsideClick: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "تایید",
          });
        }
        else if (response.data.isCovered !== "true") {
          Swal.fire({
            title: "!خطا در تغییر نوع بیمه",
            text: "شما تحت پوشش این بیمه نمی باشید",
            icon: "warning",
            allowOutsideClick: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "تایید",
          });
        }
        $("#changeInsuranceTypeModal").hide("")
      })
      .catch((error) => console.log(error));
  };

  const SearchTaminSrv = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let data = {
      Text: formProps.srvSerachInput,
      srvType: precId,
    };
    // console.log(data);
    axios
      .post("https://irannobat.ir:8444/api/TaminServices/SearchSrv", data)
      .then(function (response) {
        // console.log(response.data);
        setTaminSrvSerachList(response.data);
        $(".SearchDiv").show();
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const SelectSrvSearch = (name, code) => {
    ActiveSrvCode = code;
    ActiveSrvName = name;
    $("#srvSerachInput").val(name);
    $(".SearchDiv").hide();
  };

  // add to list button
  const FuAddToListItem = () => {
    if (ActiveSrvCode == null || ActiveSrvName == null) {
      Swal.fire({
        title: "اطلاعات ناقص وارد شده است!",
        icon: "warning",
        allowOutsideClick: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "تایید",
      });
    } else {
      let Item = {
        SrvName: ActiveSrvName,
        SrvCode: ActiveSrvCode,
        Img: ActivePrscImg,
      };
      $("#srvSerachInput").val("");
      SetPrescriptionItemsDta([...PrescriptionItemsData, Item]);
      Swal.fire({
        title: "با موفقیت به لیست اضافه شد!",
        icon: "success",
        allowOutsideClick: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "تایید",
      });
    }
  };

  // only Visit
  const registerEpresc = (visit) => {
    if (visit == 1) {
      console.log("visit");
      let url = "https://irannobat.ir:8444/api/TaminEprsc/PrescriptionAdd";
      let Data = {
        CenterID,
        NID: ActivePatientID,
        PMN: $("#PatientTel").html(),
        PTI: 3,
        Comment: $("#eprscItemDescription").val(),
        note: [],
        SrvNames: [],
        prescTypeName: "ویزیت",
      };
      console.log(Data);

      axios
        .post(url, Data)
        .then(function (response) {
          console.log(response.data);
          if (response.data.res.trackingCode !== null) {
            Swal.fire({
              title: "ویزیت با موفقیت ثبت شد!",
              text: "کد رهگیری شما : " + `${response.data.res.trackingCode}`,
              icon: "success",
              allowOutsideClick: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "تایید",
            });
          } else if (response.data.res.error_Msg == "نسخه تکراری است") {
            Swal.fire({
              title: "نسخه ثبت شده تکراری می باشد!",
              icon: "warning",
              allowOutsideClick: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "تایید",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
              <PatientInfo
                getPatientInfo={getPatientInfo}
                data={patientsInfo}
                insuranceType={insuranceType}
                changeInsuranceType={changeInsuranceType}
                selectInsuranceType={selectInsuranceType}
              />
            </div>

            <div className="col-xl-9 col-lg-8 col-sm-6 col-12">
              <PrescriptionCard
                registerEpresc={registerEpresc}
                SelectSrvSearch={SelectSrvSearch}
                SearchTaminSrv={SearchTaminSrv}
                TaminSrvSerachList={TaminSrvSerachList}
                ServiceList={TaminServiceTypeList}
                lists={taminHeaderList}
                onSelect={selectPrescriptionType}
                changePrescId={changePrescId}
                FuAddToListItem={FuAddToListItem}
              />

              <PrescriptionItems data={PrescriptionItemsData} />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;

// 0011066504
