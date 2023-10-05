import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/commonComponents/loading/loading";
import PatientInfo from "components/dashboard/prescription/patientInfo";
import PrescriptionCard from "components/dashboard/prescription/prescriptionCard";
import ArteshDoctorsListTable from "components/dashboard/prescription/arteshDoctorsListTable";
import AddToListItem from "components/dashboard/prescription/addToListItem";
import { TaminPrescType, TaminServiceType } from "class/taminprescriptionData";
import TaminHeader from "components/dashboard/prescription/TaminVsArteshHeader";
import { ErrorAlert, SuccessAlert, WarningAlert } from "class/AlertManage.js";

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

const getDrugInstructionsList = async () => {
  let url = "TaminEprsc/DrugInstruction";
  return await axiosClient.post(url);
};

const getDrugAmountList = async () => {
  let url = "TaminEprsc/DrugAmount";
  let result = await axiosClient.post(url);
  return result;
};

const ChangeActiveServiceTypeID = (id) => (ActiveServiceTypeID = id);

const selectPrescriptionType = () => console.log("select");

export const getServerSideProps = async ({ req, res }) => {
  let DrugAmountList = await getDrugAmountList();
  let drugInstructionList = await getDrugInstructionsList();

  const result = getSession(req, res);

  if (result) {
    const { UserData, UserRoles } = result;
    const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
    if (data) {
      const Menus = await data.json();
      return {
        props: {
          Menus,
          UserData,
          UserRoles,
          drugAmountList: DrugAmountList.data.res.data,
          drugInstructionList: drugInstructionList.data.res.data,
        },
      };
    }
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
const Prescription = ({
  Menus,
  UserData,
  UserRoles,
  drugAmountList,
  drugInstructionList,
}) => {
  const Router = useRouter();
  CenterID = UserData.CenterID;

  let selectInstructionData = [];
  for (let i = 0; i < drugInstructionList.length; i++) {
    const item = drugInstructionList[i];
    let obj = {
      value: item.drugInstId,
      label: item.drugInstConcept,
    };
    selectInstructionData.push(obj);
  }
  drugInstructionList = selectInstructionData;

  selectInstructionData = [];
  for (let i = 0; i < drugAmountList.length; i++) {
    const item = drugAmountList[i];
    let obj = {
      value: item.drugAmntId,
      label: item.drugAmntConcept,
    };
    selectInstructionData.push(obj);
  }
  drugAmountList = selectInstructionData;
  selectInstructionData = null;

  const [isLoading, setIsLoading] = useState(true);
  const [patientsInfo, setPatientsInfo] = useState([]);
  const [TaminSrvSearchList, setTaminSrvSearchList] = useState([]);
  const [PrescriptionItemsData, setPrescriptionItemsData] = useState([]);
  const [taminHeaderList, settaminHeaderList] = useState(TaminPrescType);
  const [TaminServiceTypeList, setTaminServiceTypeList] =
    useState(TaminServiceType);

  const [editSrvData, setEditSrvData] = useState([]);
  const [srvEditMode, setSrvEditMode] = useState(false);
  const [favEprescItems, setFavEprescItems] = useState([]);

  let insuranceType = null;

  const [SelectedInstruction, setSelectedInstruction] = useState(null);
  const [SelectedInstructionLbl, setSelectedInstructionLbl] = useState(null);
  const [SelectedAmount, setSelectedAmount] = useState(null);
  const [SelectedAmountLbl, setSelectedAmountLbl] = useState(null);

  const FUSelectInstruction = (instruction) => {
    const findInsLbl = drugInstructionList.find((x) => x.value == instruction);
    setSelectedInstructionLbl(findInsLbl ? findInsLbl.label : instruction);
  };

  const FUSelectDrugAmount = (amount) => {
    // SelectedAmount = amount?.value;
    // SelectedAmountLbl = amount ? amount.label : "";

    const findAmntLbl = drugAmountList.find((x) => x.value == amount);
    setSelectedAmountLbl(findAmntLbl ? findAmntLbl.label : amount);
  };

  const ActiveSearch = () => {
    ActiveSrvCode = null;
    $("#srvSearchInput").val("");
    $("#BtnActiveSearch").hide();
    $("#srvSearchInput").prop("readonly", false);
    $("#BtnServiceSearch").show();
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
    // console.log({ Img });
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
    if (Img) {
      ActivePrscImg = Img;
    }
  };

  // change insurance type
  const changeInsuranceType = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Patient/ChangeInsurance";
    let data = {
      CenterID: CenterID,
      IID: formProps.insuranceTypeOptions,
      NID: formProps.patientNID,
    };

    console.log({ data });

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
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
        .then((response) => {
          setTaminSrvSearchList(response.data);

          $(".SearchDiv").show();
          $(".unsuccessfullSearch").hide();
          if (response.data.length === 0) {
            $(".unsuccessfullSearch").show();
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
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

        if (
          addPrescriptionitems.length > 0 &&
          addPrescriptionitems.find(({ srvId }) => srvId.srvCode === SrvCode)
        ) {
          // console.log(srvId);
          ErrorAlert("خطا", "سرویس انتخابی تکراری می باشد");
          return false;
        }

        // count badge
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

  // add to list
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

      // console.log({ prescData });
      // console.log({ prescItems });

      addPrescriptionitems.push(prescData);
      addPrescriptionSrvNameitems.push(onlyVisitPrescData);
      setPrescriptionItemsData([...PrescriptionItemsData, prescItems]);

      ActiveSearch();
      $("#QtyInput").val("1");
      setSelectedAmount(null);
      setSelectedInstruction(null);
    }
  };

  const updatePrescriptionAddItem = async (obj) => {
    let arr = [];
    for (let i = 0; i < obj.data.length; i++) {
      const presc = obj.data[i];
      let drugAmntId = presc.drugAmntId;
      let drugAmntLbl = drugAmountList.find((o) => o.value === drugAmntId);

      if (drugAmntLbl) {
        drugAmntLbl = drugAmntLbl.label;
      }

      let drugInstId = presc.drugInstId;
      let InstructionLbl = drugInstructionList.find(
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

      // console.log({ prescData });
      // console.log({ prescItems });

      if (prescData) {
        addPrescriptionitems.push(prescData);
        arr.push(prescItems);
      }
    }
    setPrescriptionItemsData(arr);
  };

  // only Visit
  const registerEpresc = (visit) => {
    if (visit === 1) {
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
          // console.log(response.data);
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
        noteDetailsEprscId: 4333946612,
        srvId: {
          srvId: 63005,
          srvType: {
            srvType: "01",
            srvTypeDes: "دارويي",
            status: "1",
            statusstDate: "13940101",
            custType: "3",
            prescTypeId: 1,
          },
          srvCode: "05760",
          srvName:
            "FORMOTEROL 12MCG Pre-dispensed singledose Strips-Blister/CAP",
          srvName2: null,
          srvBimSw: "1",
          srvSex: null,
          srvPrice: 8390,
          srvPriceDate: "13990723",
          doseCode: null,
          parTarefGrp: null,
          status: "1",
          statusstDate: "13980201",
          bGType: "1",
          gSrvCode: null,
          agreementFlag: null,
          isDeleted: null,
          visible: "1",
          dentalServiceType: null,
          wsSrvCode: "05760",
          hosprescType: "0",
          countIsRestricted: null,
          terminology: null,
          srvCodeComplete: "0000005760",
        },
        srvQty: 3,
        srvRem: 3,
        srvPrice: 8390,
        timesAday: {
          drugAmntId: 186,
          drugAmntCode: "186",
          drugAmntSumry: "Syrup/Susp\n",
          drugAmntLatin: "0.5 cc",
          drugAmntConcept: "نيم سي سي-Syrup/Susp\n",
          visibled: "1",
        },
        dose: null,
        doseCode: 0,
        repeat: null,
        isBrand: null,
        dateDo: null,
        isOk: "0",
        drugInstruction: {
          drugInstId: 61,
          drugInstCode: "61",
          drugInstSumry: null,
          drugInstLatin: null,
          drugInstConcept: "دو بار در روز",
        },
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
        drugAmntId: 186,
        drugInstId: 61,
        isDentalService: null,
        noteHeadEprscId: null,
        toothId: null,
        referenceStatus: null,
        repeatDays: null,
        readOnly: false,
      },
      {
        noteDetailsEprscId: 4333946613,
        srvId: {
          srvId: 64413,
          srvType: {
            srvType: "01",
            srvTypeDes: "دارويي",
            status: "1",
            statusstDate: "13940101",
            custType: "3",
            prescTypeId: 1,
          },
          srvCode: "52185",
          srvName: "Codeine/guaifenesine  10 mg/100 mg/5 mL, 60 mL ORAL SYRUP",
          srvName2: null,
          srvBimSw: null,
          srvSex: null,
          srvPrice: 0,
          srvPriceDate: "13980216",
          doseCode: null,
          parTarefGrp: null,
          status: "2",
          statusstDate: "13980216",
          bGType: "1",
          gSrvCode: null,
          agreementFlag: null,
          isDeleted: null,
          visible: "1",
          dentalServiceType: null,
          wsSrvCode: "52185",
          hosprescType: "0",
          countIsRestricted: null,
          terminology: null,
          srvCodeComplete: "0000052185",
        },
        srvQty: 3,
        srvRem: 3,
        srvPrice: 0,
        timesAday: {
          drugAmntId: 185,
          drugAmntCode: "185",
          drugAmntSumry: "INJ\n",
          drugAmntLatin: "2",
          drugAmntConcept: "دو عدد-INJ\n",
          visibled: "1",
        },
        dose: null,
        doseCode: 0,
        repeat: null,
        isBrand: null,
        dateDo: null,
        isOk: "0",
        drugInstruction: {
          drugInstId: 62,
          drugInstCode: "62",
          drugInstSumry: null,
          drugInstLatin: null,
          drugInstConcept: "سه بار در روز",
        },
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
        drugAmntId: 185,
        drugInstId: 62,
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
          console.log(response.data);
          updatePrescriptionAddItem(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  // edit prescItem
  const handleEditPrescItem = (srvData) => {
    setEditSrvData(srvData);
    setSrvEditMode(true);
    console.log({ SelectedInstructionLbl });
    console.log({ SelectedAmountLbl });
  };

  const editPrescItem = async (e) => {
    e.preventDefault();

    // let formData = new FormData(e.target);
    // const formProps = Object.fromEntries(formData);

    // // let url = "";
    // let data = {
    //   srvCode: formProps.srvCode,
    //   srvName: formProps.srvSearchInput,
    //   qty: formProps,
    //   instruction: formProps,
    //   amount: formProps,
    // };

    // console.log({ data });

    // let { prescData, prescItems } = await prescItemCreator(
    //   presc.srvId.srvType.prescTypeId,
    //   drugInstId,
    //   drugAmntId,
    //   presc.srvId.srvCode,
    //   presc.srvId.srvName,
    //   presc.srvQty,
    //   "",
    //   InstructionLbl,
    //   drugAmntLbl,
    //   presc.srvId.srvType.srvTypeDes,
    //   presc.srvId.srvType.srvType,
    //   presc.srvId.parTarefGrp?.parGrpCode
    // );
  };

  const cancelEditPresc = (e) => {
    e.preventDefault();

    $("#srvSearchInput").val("");
    $("#QtyInput").val("1");
    setSelectedAmount(null);
    setSelectedInstruction(null);
    FUSelectInstruction(null);
    FUSelectDrugAmount(null);

    // console.log({ SelectedInstructionLbl, SelectedAmountLbl });
  };

  // favourite items
  const getFavEprescItems = () => {
    let url = `FavEprscItem/getTamin/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setFavEprescItems(response.data);
        // setTaminSrvSearchList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const selectFavEprescItem = async (selectedPrescData) => {
    let url = "FavEprscItem/addTamin";
    let data = {
      CenterID: CenterID,
      prescItem: selectedPrescData,
    };

    console.log({ data });

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        console.log({ favEprescItems });
        setFavEprescItems([...response.data, favEprescItems]);
        SuccessAlert("موفق", "سرویس به لیست علاقه مندی ها اضافه گردید!");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // prescriptionHeadID = Router.query.id;
    // ActivePatientID = Router.query.pid;

    // if (ActivePatientID) {
    //   $("#frmPatientInfoBtnSubmit").click();
    // }

    // if (prescriptionHeadID) getEprscData();

    updatePrescriptionAddItem(responseObj);

    // window.onbeforeunload = function () {
    //   return 'Changes you made may not be saved';
    // }
    getFavEprescItems();
  }, []);

  useEffect(() => {
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
                UserData={UserData}
                isLoading={isLoading}
              />
            </div>

            <div className="col-xxl-9 col-xl-8 col-lg-6 col-12">
              <PrescriptionCard
                ActiveSearch={ActiveSearch}
                registerEpresc={registerEpresc}
                SelectSrvSearch={SelectSrvSearch}
                SearchTaminSrv={SearchTaminSrv}
                TaminSrvSearchList={TaminSrvSearchList}
                favEprescItems={favEprescItems}
                ServiceList={TaminServiceTypeList}
                lists={taminHeaderList}
                onSelect={selectPrescriptionType}
                changePrescId={changePrescId}
                ChangeActiveServiceTypeID={ChangeActiveServiceTypeID}
                FuAddToListItem={FuAddToListItem}
                FUSelectInstruction={FUSelectInstruction}
                FUSelectDrugAmount={FUSelectDrugAmount}
                handleOnFocus={handleOnFocus}
                handleOnBlur={handleOnBlur}
                isLoading={isLoading}
                editSrvData={editSrvData}
                srvEditMode={srvEditMode}
                drugInstructionList={drugInstructionList}
                drugAmountList={drugAmountList}
                editPrescItem={editPrescItem}
                cancelEditPresc={cancelEditPresc}
                setSrvEditMode={setSrvEditMode}
                SelectedInstruction={SelectedInstruction}
                setSelectedInstruction={setSelectedInstruction}
                setEditSrvData={setEditSrvData}
                SelectedAmount={SelectedAmount}
                setSelectedAmount={setSelectedAmount}
              />

              <div className="prescList">
                <AddToListItem
                  data={PrescriptionItemsData}
                  setPrescriptionItemsData={setPrescriptionItemsData}
                  handleEditPrescItem={handleEditPrescItem}
                  selectFavEprescItem={selectFavEprescItem}
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
