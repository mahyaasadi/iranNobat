import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "components/loading/loading";
import PrescriptionCard from "components/dashboard/prescription/prescriptionCard/prescriptionCard";
import PatientInfo from "components/dashboard/prescription/PatientInfo";
import TaminHeader from "components/dashboard/prescription/TaminVsArteshHeader";
import ArteshDoctorsListTable from "components/dashboard/prescription/arteshDoctorsListTable";
import PrescriptionItems from "components/dashboard/prescription/PrescriptionItems";
import { ErrorAlert, SuccessAlert, WarningAlert } from "class/AlertManage.js";
import {
  TaminPrescType,
  TaminServiceType,
} from "components/dashboard/prescription/taminprescriptionData";

let CenterID = Cookies.get("CenterID");

let prescId = 1;
let ActiveServiceTypeID = "01";
let ActiveSrvCode,
  ActiveSrvName,
  ActivePrscImg,
  ActivePatientID,
  ActivePatientTel,
  ActiveSrvTypePrsc,
  ActiveInsuranceID,
  ActiveParaCode = null;

let addPrescriptionitems = [];
let addPrescriptionSrvNameitems = [];
let ActivePrscName = "دارو";

const changePrescId = (Sid, Img, name, id) => {
  prescId = id;
  ActiveServiceTypeID = Sid;
  ActivePrscName = name;
  if (typeof Img !== "undefined") {
    ActivePrscImg = Img;
  }
};
const ChangeActiveServiceTypeID = (id) => {
  ActiveServiceTypeID = id;
};

const selectPrescriptionType = () => {
  console.log("select");
};

const Prescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [patientsInfo, setPatientsInfo] = useState([]);
  const [TaminSrvSerachList, setTaminSrvSerachList] = useState([]);
  const [PrescriptionItemsData, SetPrescriptionItemsData] = useState([]);
  const [taminHeaderList, settaminHeaderList] = useState(TaminPrescType);
  const [TaminServiceTypeList, setTaminServiceTypeList] =
    useState(TaminServiceType);

  let insuranceType = null;

  // Drug instruction & amount
  let SelectedInstruction,
    SelectedAmount = "";

  const FUSelectInstructionType = (instruction) => {
    SelectedInstruction = instruction;
  };
  const FUSelectDrugAmount = (amount) => {
    SelectedAmount = amount;
  };

  // search in selected services
  const SelectSrvSearch = (name, code, TaminCode, type, paraTarefCode) => {
    ActiveSrvName = name;
    ActiveSrvTypePrsc = type;
    ActiveParaCode = paraTarefCode;
    console.log("ActiveParaCode", ActiveParaCode);

    ActiveInsuranceID == "2"
      ? (ActiveSrvCode = TaminCode)
      : (ActiveSrvCode = code);

    $("#srvSerachInput").val(name);
    $(".SearchDiv").hide();
  };

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
        // console.log(response.data);
        ActiveInsuranceID = response.data.user.Insurance;
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
          SuccessAlert("موفق", "!تغییر نوع بیمه با موفقیت انجام شد");
        } else if (response.data.isCovered !== "true") {
          ErrorAlert(
            "خطا",
            "تغییر بیمه بیمار ، به دلیل عدم پوشش بیمه امکان پذیر نیست"
          );
        }
        $("#changeInsuranceTypeModal").hide("");
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
      srvType: ActiveServiceTypeID,
    };

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

  // add to list button
  const FuAddToListItem = (e) => {
    e.preventDefault();

    if (ActiveSrvCode == null || ActiveSrvName == null) {
      ErrorAlert("خطا", "خدمتی انتخاب نشده است");
    } else {
      let prescItems = {
        SrvName: ActiveSrvName,
        SrvCode: ActiveSrvCode,
        Img: ActivePrscImg,
      };

      let prescData = null;
      if (prescId == 1) {
        prescData = {
          srvId: {
            srvType: {
              srvType: ActiveSrvTypePrsc,
            },
            srvCode: ActiveSrvCode,
          },
          srvQty: parseInt($("#QtyInput").val()),
          timesAday: {
            drugAmntId: SelectedAmount,
          },
          repeat: null,
          drugInstruction: {
            drugInstId: SelectedInstruction,
          },
          dose: "",
        };
      } else {
        let parTarefGrp = null;
        console.log(ActiveParaCode);
        if (ActiveParaCode === undefined) {
          parTarefGrp = null;
        } else {
          parTarefGrp = {
            parGrpCode: ActiveParaCode,
          };
        }
        prescData = {
          srvId: {
            srvType: {
              srvType: ActiveSrvTypePrsc,
            },
            srvCode: ActiveSrvCode,
            parTarefGrp: parTarefGrp,
          },
          srvQty: parseInt($("#QtyInput").val()),
        };
      }
      let justVisitPrescData = {
        Name: ActiveSrvName,
        Code: ActiveSrvCode,
      };

      addPrescriptionitems.push(prescData);
      addPrescriptionSrvNameitems.push(justVisitPrescData);
      console.log(addPrescriptionitems);
      ActiveSrvCode = null;
      $("#srvSerachInput").val("");
      $("#QtyInput").val("1");
      SetPrescriptionItemsData([...PrescriptionItemsData, prescItems]);
    }
  };

  // only Visit
  const registerEpresc = (visit) => {
    if (visit === 1) {
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
            SuccessAlert(
              "ویزیت با موفقیت ثبت شد!",
              "کد رهگیری شما : " + `${response.data.res.trackingCode}`
            );
          } else if (response.data.res.error_Msg == "نسخه تکراری است") {
            WarningAlert("هشدار", "نسخه ثبت شده تکراری می باشد!");
          } else if (ActivePatientID === undefined) {
            WarningAlert("هشدار", "کد ملی وارد شده معتبر نمی باشد");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let url = "https://irannobat.ir:8444/api/TaminEprsc/PrescriptionAdd";
      let Data = {
        CenterID,
        NID: ActivePatientID,
        PMN: $("#PatientTel").html(),
        PTI: prescId,
        Comment: $("#eprscItemDescription").val(),
        note: addPrescriptionitems,
        SrvNames: addPrescriptionSrvNameitems,
        prescTypeName: ActivePrscName,
      };
      console.log(Data);

      axios
        .post(url, Data)
        .then(function (response) {
          console.log(response.data);
          if (response.data.res.trackingCode !== null) {
            SuccessAlert(
              "نسخه نهایی با موفقیت ثبت شد!",
              "کد رهگیری شما : " + `${response.data.res.trackingCode}`
            );
          } else if (response.data.res.error_Code !== null) {
            ErrorAlert("خطا!", response.data.res.error_Msg);
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
            <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-12">
              <PatientInfo
                getPatientInfo={getPatientInfo}
                data={patientsInfo}
                insuranceType={insuranceType}
                changeInsuranceType={changeInsuranceType}
                selectInsuranceType={selectInsuranceType}
              />
            </div>

            <div className="col-xxl-9 col-xl-8 col-lg-6 col-12">
              <PrescriptionCard
                registerEpresc={registerEpresc}
                SelectSrvSearch={SelectSrvSearch}
                SearchTaminSrv={SearchTaminSrv}
                TaminSrvSerachList={TaminSrvSerachList}
                ServiceList={TaminServiceTypeList}
                lists={taminHeaderList}
                onSelect={selectPrescriptionType}
                changePrescId={changePrescId}
                ChangeActiveServiceTypeID={ChangeActiveServiceTypeID}
                FuAddToListItem={FuAddToListItem}
                FUSelectInstructionType={FUSelectInstructionType}
                FUSelectDrugAmount={FUSelectDrugAmount}
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
