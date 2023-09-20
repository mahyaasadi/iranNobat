import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig.js";
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

let prescId = 1;
let ActiveServiceTypeID = "01";
let ActivePrscName = "دارو";
let addPrescriptionitems = [];
let addPrescriptionSrvNameitems = [];

let ActiveSrvCode,
  ActiveSrvName,
  ActivePrscImg,
  ActivePatientTel,
  ActiveSrvTypePrsc,
  ActiveInsuranceID,
  ActiveParaCode,
  ActivePatientID,
  count,
  prescriptionHeadID = null;

const ChangeActiveServiceTypeID = (id) => (ActiveServiceTypeID = id);

const selectPrescriptionType = () => console.log("select");

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
        destination: `/login`,
      },
    };
  }
};

let CenterID = null;
const Prescription = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const Router = useRouter();
  // ActivePatientID = Router.query.pid;

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
        ActiveInsuranceID = response.data.user.Insurance;
        setPatientsInfo(response.data.user);
        $("#patientInfoSection").show("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnFocus = () => {
    if (ActiveSrvCode === null && $("#srvSearchInput").val().length > 2) {
      $(".SearchDiv").show();
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      $(".SearchDiv").hide();
    }, 300);
  };

  // Change Insurance Type
  const selectInsuranceType = (type) => {
    insuranceType = type;
  };

  const changePrescId = (Sid, Img, name, id) => {
    ActiveServiceTypeID = Sid;
    ActivePrscName = name;
    prescId = id;

    count = $("#srvItemCountId" + prescId).html();
    // console.log("count", count);
    $(".unsuccessfullSearch").hide();

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
          setTaminSrvSearchList(response.data);
          $(".SearchDiv").show();
          $(".unsuccessfullSearch").hide();
          setIsLoading(false);
          if (response.data.length === 0) {
            $(".unsuccessfullSearch").show();
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  const prescItemCreator = async (
    prescId,
    Instruction,
    Amount,
    SrvCode,
    SrvName,
    Qty,
    PrscImg,
    InstructionLbl,
    AmountLbl,
    PrscName,
    SrvTypePrsc,
    ParaCode
  ) => {
    if (prescId == 1 && Instruction == null) {
      ErrorAlert("خطا", "در اقلام دارویی زمان مصرف باید انتخاب گردد");
      return false;
    } else if (prescId == 1 && Amount == null) {
      ErrorAlert("خطا", "در اقلام دارویی  تعداد در وعده باید انتخاب گردد");
      return false;
    } else {
      if (SrvCode == null || SrvName == null) {
        ErrorAlert("خطا", "خدمتی انتخاب نشده است");
      } else {
        let prescItems = {
          SrvName: SrvName,
          SrvCode: SrvCode,
          Img: PrscImg,
          Qty: $("#QtyInput").val(),
          DrugInstruction: InstructionLbl,
          TimesADay: AmountLbl,
          PrescType: PrscName,
          prescId,
        };

        let prescData = null;
        if (prescId == 1) {
          prescData = {
            srvId: {
              srvType: {
                srvType: SrvTypePrsc,
              },
              srvCode: SrvCode,
            },
            srvQty: parseInt($("#QtyInput").val()),
            timesAday: {
              drugAmntId: Amount,
            },
            repeat: null,
            drugInstruction: {
              drugInstId: Instruction,
            },
            dose: "",
          };
        } else {
          let parTarefGrp = null;

          if (ParaCode === undefined) {
            parTarefGrp = null;
          } else {
            parTarefGrp = {
              parGrpCode: ParaCode,
            };
          }

          prescData = {
            srvId: {
              srvType: {
                srvType: SrvTypePrsc,
              },
              srvCode: SrvCode,
              parTarefGrp: parTarefGrp,
            },
            srvQty: parseInt($("#QtyInput").val()),
          };
        }

        // let findSrvCode = addPrescriptionitems.find(
        //   ({ x }) => x.srvId.srvCode === SrvCode
        // );

        // console.log("findSrvCode", findSrvCode);

        // if (
        //   addPrescriptionitems.length > 0 &&
        //   addPrescriptionitems.find(({ srvId }) => srvId.srvCode === SrvCode)
        // ) {
        //   ErrorAlert("خطا", "سرویس انتخابی تکراری می باشد");
        //   // console.log(srvId);
        //   return false;
        // }

        // count badge //
        count = $("#srvItemCountId" + prescId).html();
        if (count == "") {
          count = 0;
        }

        count = parseInt(count);
        count++;
        $("#srvItemCountId" + prescId).html(count);

        // hide if count = 0
        if (count === 0) {
          $("#srvItemCountId" + prescId).hide();
        }

        return { prescData, prescItems };
      }
    }
  };

  // add to list function
  const FuAddToListItem = async (e) => {
    e.preventDefault();

    let { prescData, prescItems } = await prescItemCreator(
      prescId,
      SelectedInstruction,
      SelectedAmount,
      ActiveSrvCode,
      ActiveSrvName,
      $("#QtyInput").val(),
      ActivePrscImg,
      SelectedInstructionLbl,
      SelectedAmountLbl,
      ActivePrscName,
      ActiveSrvTypePrsc,
      ActiveParaCode
    );

    if (prescData) {
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
  };

  const updatePrescriptionAddItem = async (obj) => {
    obj.data.map(async (presc) => {
      let drugAmntId = presc.drugAmntId;
      let drugAmntLbl = selectAmountArray.find((o) => o.value === drugAmntId);

      if (drugAmntLbl) {
        drugAmntLbl = drugAmntLbl.label;
      }

      let drugInstId = presc.drugInstId;
      let InstructionLbl = selectInstructionArray.find(
        (o) => o.value === drugInstId
      );

      if (InstructionLbl) {
        InstructionLbl = InstructionLbl.label;
      }

      let { prescData, prescItems } = await prescItemCreator(
        presc.srvId.srvType.prescTypeId,
        drugInstId,
        drugAmntId,
        presc.srvId.srvCode,
        presc.srvId.srvName,
        presc.srvQty,
        "",
        InstructionLbl,
        drugAmntLbl,
        presc.srvId.srvType.srvTypeDes,
        presc.srvId.srvType.srvType,
        presc.srvId.parTarefGrp?.parGrpCode
      );

      if (prescData) {
        addPrescriptionitems.push(prescData);
        SetPrescriptionItemsData([...PrescriptionItemsData, prescItems]);
        ActiveSearch();
        $("#QtyInput").val("1");
        SelectedAmount = null;
        SelectedInstruction = null;
      }
    });
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

      console.log({ Data });

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

  // const responseObj = {
  //   status: 200,
  //   family: "SUCCESSFUL",
  //   reason: "OK",
  //   data: [
  //     {
  //       noteDetailsEprscId: 3881192726,
  //       srvId: {
  //         srvId: 123730,
  //         srvType: {
  //           srvType: "02",
  //           srvTypeDes: "آزمايشگاه",
  //           status: "1",
  //           statusstDate: "13940101",
  //           custType: "4",
  //           prescTypeId: 2,
  //         },
  //         srvCode: "807307-004",
  //         srvName:
  //           "396902002-نمونه از غده تيموس که با بيوپسي سوزني ترانس قفسه سينه (نمونه) به دست آمده است",
  //         srvName2:
  //           "396902002-Specimen from thymus gland obtained by transthoracic needle biopsy (specimen)",
  //         srvBimSw: "1",
  //         srvSex: null,
  //         srvPrice: 1488300,
  //         srvPriceDate: "14000226",
  //         doseCode: null,
  //         parTarefGrp: {
  //           parGrpCode: "001",
  //           parGrpDesc: "آسيب شناسي",
  //           parGrpRem: "1",
  //           status: "1",
  //           statusStDate: "13830101",
  //         },
  //         status: "1",
  //         statusstDate: "14010231",
  //         bGType: null,
  //         gSrvCode: null,
  //         agreementFlag: null,
  //         isDeleted: "0",
  //         visible: null,
  //         dentalServiceType: null,
  //         wsSrvCode: "807307-004",
  //         hosprescType: null,
  //         countIsRestricted: null,
  //         terminology: null,
  //         srvCodeComplete: "807307-004",
  //       },
  //       srvQty: 1,
  //       srvRem: 1,
  //       srvPrice: 1488300,
  //       timesAday: null,
  //       dose: null,
  //       doseCode: null,
  //       repeat: null,
  //       isBrand: null,
  //       dateDo: null,
  //       isOk: "0",
  //       drugInstruction: null,
  //       isPayable: null,
  //       organId: null,
  //       organDesc: null,
  //       illnessId: null,
  //       illnessDesc: null,
  //       planId: null,
  //       planDesc: null,
  //       organDet: null,
  //       organDetDesc: null,
  //       confirmStatusflag: null,
  //       drugAmntId: null,
  //       drugInstId: null,
  //       isDentalService: null,
  //       noteHeadEprscId: null,
  //       toothId: null,
  //       referenceStatus: null,
  //       repeatDays: null,
  //       readOnly: false,
  //     },
  //   ],
  // };

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
          updatePrescriptionAddItem(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    prescriptionHeadID = Router.query.id;
    ActivePatientID = Router.query.pid;

    if (ActivePatientID) {
      $("#frmPatientInfoBtnSubmit").click();
    }
    // window.onbeforeunload = function () {
    //   return 'Changes you made may not be saved';
    // }
    getEprscData();
  }, [prescriptionHeadID]);

  useEffect(() => {
    console.log("PrescriptionItemsData", PrescriptionItemsData);
    $(".unsuccessfullSearch").hide();
  }, [PrescriptionItemsData]);

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
              />

              <div className="prescList">
                <PrescriptionItems
                  data={PrescriptionItemsData}
                  SetPrescriptionItemsData={SetPrescriptionItemsData}
                  prescId={prescId}
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
