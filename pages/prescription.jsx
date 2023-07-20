import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "components/loading/loading";
import { taminPrescriptionCreator } from "class/taminPrescriptionCreator.js";
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
let addPrescriptionitems = [];
let addPrescriptionSrvNameitems = [];
let ActivePrscName = "دارو";

let ActiveSrvCode,
  ActiveSrvName,
  ActivePrscImg,
  ActivePatientTel,
  ActiveSrvTypePrsc,
  ActiveInsuranceID,
  ActiveParaCode,
  ActivePatientID = null;
let count = 0

const ChangeActiveServiceTypeID = (id) => {
  ActiveServiceTypeID = id;
};

const selectPrescriptionType = () => {
  console.log("select");
};

const Prescription = () => {
  const Router = useRouter();
  const prescriptionHeadID = Router.query.id;
  ActivePatientID = Router.query.pid;

  const [isLoading, setIsLoading] = useState(true);
  const [patientsInfo, setPatientsInfo] = useState([]);
  const [TaminSrvSearchList, setTaminSrvSearchList] = useState([]);
  const [PrescriptionItemsData, SetPrescriptionItemsData] = useState([]);
  const [selectAmountArray, setSelectAmountArray] = useState([]);
  const [selectInstructionArray, setSelectInstructionArray] = useState([]);
  const [taminHeaderList, settaminHeaderList] = useState(TaminPrescType);
  const [TaminServiceTypeList, setTaminServiceTypeList] =
    useState(TaminServiceType);

  let insuranceType = null;

  // Drug instruction & amount
  let SelectedInstruction,
    SelectedInstructionLbl,
    SelectedAmount,
    SelectedAmountLbl = "";

  // get amount options full list
  const FUSelectAmountArray = (amountArray) => {
    setSelectAmountArray(amountArray);
  };

  // set the selected value for drug amount
  const FUSelectDrugAmount = (amount) => {
    SelectedAmount = amount;
    let amountObj = selectAmountArray.find((o) => o.value === SelectedAmount);
    SelectedAmountLbl = amountObj.label;
  };

  // get instruction options full list
  const FUSelectInstructionArray = (instructionArray) => {
    setSelectInstructionArray(instructionArray);
  };

  const FUSelectInstructionType = (instruction) => {
    SelectedInstruction = instruction;
    let instructionObj = selectInstructionArray.find(
      (o) => o.value === SelectedInstruction
    );
    SelectedInstructionLbl = instructionObj.label;
  };

  const ActiveSearch = () => {
    ActiveSrvCode = null;
    $("#BtnServiceSearch").show();
    $("#BtnActiveSearch").hide();
    $("#srvSearchInput").prop("readonly", false);

    $("#srvSearchInput").val("");
    $("#srvSearchInput").focus();
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

    $("#srvSearchInput").val(name);
    $("#BtnServiceSearch").hide();
    $("#BtnActiveSearch").show();
    $(".SearchDiv").hide();
    $("#srvSearchInput").prop("readonly", true);
  };

  //get patient info
  const getPatientInfo = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    ActivePatientID = formProps.nationalCode;

    let url = "Patient/checkByNid";
    let data = {
      CenterID: CenterID,
      NID: formProps.nationalCode,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        ActiveInsuranceID = response.data.user.Insurance;
        setPatientsInfo(response.data.user);
        $("#patientInfoSection").show("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnFocus = () => {
    // console.log(ActiveSrvCode);
    if (ActiveSrvCode !== null && $("#srvSearchInput").val().length > 2) {
      $(".SearchDiv").show();
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      $(".SearchDiv").hide();
    }, 200);
  };

  // Change Insurance Type
  const selectInsuranceType = (type) => {
    insuranceType = type;
  };

  const changePrescId = (Sid, Img, name, id) => {
    ActiveServiceTypeID = Sid;
    ActivePrscName = name;
    prescId = id;
    if (ActiveSrvCode) {
      ActiveSearch();
    } else {
      if ($("#srvSearchInput").val().length > 0) {
        $("#srvSearchInput").val("");
      }
    }
    if (Img !== undefined) {
      ActivePrscImg = Img;
    }
  };
  const changeInsuranceType = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Patient/ChangeInsurance";
    let data = {
      CenterID: CenterID,
      IID: formProps.insuranceTypeOptions,
      NID: formProps.patientNID,
    };

    console.log(data);

    axiosClient
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

  //search services
  const SearchTaminSrv = (e) => {
    e.preventDefault();
    if (ActiveSrvCode == null) {
      setIsLoading(true);

      let formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      let data = {
        Text: formProps.srvSearchInput,
        srvType: ActiveServiceTypeID,
      };

      axiosClient
        .post("TaminServices/SearchSrv", data)
        .then(function (response) {
          console.log(response.data);
          setTaminSrvSearchList(response.data);
          $(".SearchDiv").show();
          setIsLoading(false);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  // add to list function
  const FuAddToListItem = (e) => {
    e.preventDefault();
    if (prescId == 1 && SelectedInstruction == null) {
      ErrorAlert("خطا", "در اقلام دارویی زمان مصرف باید انتخاب گردد");
    } else if (prescId == 1 && SelectedAmount == null) {
      ErrorAlert("خطا", "در اقلام دارویی  تعداد در وعده باید انتخاب گردد");
    } else {
      if (ActiveSrvCode == null || ActiveSrvName == null) {
        ErrorAlert("خطا", "خدمتی انتخاب نشده است");
      } else {
        let prescItems = {
          SrvName: ActiveSrvName,
          SrvCode: ActiveSrvCode,
          Img: ActivePrscImg,
          Qty: $("#QtyInput").val(),
          DrugInstruction: SelectedInstructionLbl,
          TimesADay: SelectedAmountLbl,
          PrescType: ActivePrscName,
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

        count = $("#srvItemCount").html();
        count = parseInt(count);
        count++;

        let onlyVisitPrescData = {
          Name: ActiveSrvName,
          Code: ActiveSrvCode,
        };

        addPrescriptionitems.push(prescData);
        addPrescriptionSrvNameitems.push(onlyVisitPrescData);
        SetPrescriptionItemsData([...PrescriptionItemsData, prescItems]);

        ActiveSearch();
        $("#QtyInput").val("1");
        SelectedAmount = null;
        SelectedInstruction = null;
      }
    }
  };

  // only Visit
  const registerEpresc = (visit) => {
    if (visit === 1) {
      console.log("visit");
      let url = "TaminEprsc/PrescriptionAdd";
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

      axiosClient
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
      let url = "TaminEprsc/PrescriptionAdd";
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

      axiosClient
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
          } else if (response.data.res == null) {
            ErrorAlert("خطا", "سرور در حال حاضر در دسترس نمی باشد!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const responseObj = {
    status: 200,
    family: "SUCCESSFUL",
    reason: "OK",
    data: [
      {
        noteDetailsEprscId: 3881192726,
        srvId: {
          srvId: 123730,
          srvType: {
            srvType: "02",
            srvTypeDes: "آزمايشگاه",
            status: "1",
            statusstDate: "13940101",
            custType: "4",
            prescTypeId: 2,
          },
          srvCode: "807307-004",
          srvName:
            "396902002-نمونه از غده تيموس که با بيوپسي سوزني ترانس قفسه سينه (نمونه) به دست آمده است",
          srvName2:
            "396902002-Specimen from thymus gland obtained by transthoracic needle biopsy (specimen)",
          srvBimSw: "1",
          srvSex: null,
          srvPrice: 1488300,
          srvPriceDate: "14000226",
          doseCode: null,
          parTarefGrp: {
            parGrpCode: "001",
            parGrpDesc: "آسيب شناسي",
            parGrpRem: "1",
            status: "1",
            statusStDate: "13830101",
          },
          status: "1",
          statusstDate: "14010231",
          bGType: null,
          gSrvCode: null,
          agreementFlag: null,
          isDeleted: "0",
          visible: null,
          dentalServiceType: null,
          wsSrvCode: "807307-004",
          hosprescType: null,
          countIsRestricted: null,
          terminology: null,
          srvCodeComplete: "807307-004",
        },
        srvQty: 1,
        srvRem: 1,
        srvPrice: 1488300,
        timesAday: null,
        dose: null,
        doseCode: null,
        repeat: null,
        isBrand: null,
        dateDo: null,
        isOk: "0",
        drugInstruction: null,
        isPayable: null,
        organId: null,
        organDesc: null,
        illnessId: null,
        illnessDesc: null,
        planId: null,
        planDesc: null,
        organDet: null,
        organDetDesc: null,
        confirmStatusflag: null,
        drugAmntId: null,
        drugInstId: null,
        isDentalService: null,
        noteHeadEprscId: null,
        toothId: null,
        referenceStatus: null,
        repeatDays: null,
        readOnly: false,
      },
    ],
  };

  //get prescription data by headId to edit
  const getEprscData = () => {
    let url = "TaminEprsc/GetEpresc";
    let data = {
      CenterID,
      headerID: prescriptionHeadID,
    };

    if (prescriptionHeadID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          console.log(response.data.data);
          SetPrescriptionItemsData(response.data.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    SetPrescriptionItemsData(responseObj.data);
    if (ActivePatientID) {
      $("#frmPatientInfoBtnSubmit").click();
    }
    // getEprscData();
  }, [prescriptionHeadID]);

  return (
    <>
      <Head>
        <title>نسخه نویسی</title>
      </Head>
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
                ActivePatientID={ActivePatientID}
              />
            </div>

            <div className="col-xxl-9 col-xl-8 col-lg-6 col-12">
              <PrescriptionCard
                ActiveSearch={ActiveSearch}
                registerEpresc={registerEpresc}
                SelectSrvSearch={SelectSrvSearch}
                SearchTaminSrv={SearchTaminSrv}
                TaminSrvSearchList={TaminSrvSearchList}
                ServiceList={TaminServiceTypeList}
                lists={taminHeaderList}
                onSelect={selectPrescriptionType}
                changePrescId={changePrescId}
                ChangeActiveServiceTypeID={ChangeActiveServiceTypeID}
                FuAddToListItem={FuAddToListItem}
                FUSelectInstructionType={FUSelectInstructionType}
                FUSelectDrugAmount={FUSelectDrugAmount}
                FUSelectAmountArray={FUSelectAmountArray}
                FUSelectInstructionArray={FUSelectInstructionArray}
                handleOnFocus={handleOnFocus}
                handleOnBlur={handleOnBlur}
                count={count}
              />

              <div className="prescList">
                <PrescriptionItems
                  data={PrescriptionItemsData}
                  SetPrescriptionItemsData={SetPrescriptionItemsData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;
