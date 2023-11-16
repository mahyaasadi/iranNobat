import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/commonComponents/loading/loading";
import PatientInfo from "components/dashboard/prescription/patientInfo/patientInfoCard";
import PrescriptionCard from "components/dashboard/prescription/prescriptionCard";
import AddToListItem from "components/dashboard/prescription/addToListItem";
import { TaminPrescType, TaminServiceType } from "class/taminprescriptionData";
import FavPrescListModal from "components/dashboard/prescription/FavPrescListModal";
import PrescPinInput from "components/dashboard/prescription/prescPinInput";
import AddNewPatient from "components/dashboard/prescription/patientInfo/addNewPatient";
import { ErrorAlert, SuccessAlert, WarningAlert } from "class/AlertManage.js";

let prescId = 1;
let ActiveServiceTypeID = "01";
let ActivePrscName = "دارو";
let addPrescriptionitems = [];
let addPrescriptionSrvNameitems = [];

let ActiveSrvCode,
  ActiveSrvName,
  ActivePrscImg,
  ActiveEditSrvCode,
  ActiveSrvTypePrsc,
  ActiveInsuranceID,
  ActiveParaCode,
  ActivePatientID,
  PrID,
  count,
  prescriptionHeadID,
  ActiveCenterID = null;

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
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [patientStatIsLoading, setPatientStatIsLoading] = useState(false);
  const [patientsInfo, setPatientsInfo] = useState([]);

  const [TaminSrvSearchList, setTaminSrvSearchList] = useState([]);
  const [PrescriptionItemsData, setPrescriptionItemsData] = useState([]);
  const [taminHeaderList, settaminHeaderList] = useState(TaminPrescType);
  const [TaminServiceTypeList, setTaminServiceTypeList] =
    useState(TaminServiceType);

  const [editSrvData, setEditSrvData] = useState([]);
  const [srvEditMode, setSrvEditMode] = useState(false);
  const [favEprescItems, setFavEprescItems] = useState([]);

  const [SelectedInstruction, setSelectedInstruction] = useState(null);
  const [SelectedInstructionLbl, setSelectedInstructionLbl] = useState(null);
  const [SelectedAmount, setSelectedAmount] = useState(null);
  const [SelectedAmountLbl, setSelectedAmountLbl] = useState(null);

  const [showFavModal, setShowFavModal] = useState(false);
  const handleClosefavModal = () => setShowFavModal(false);

  const [showPinModal, setShowPinModal] = useState(false);
  const openPinModal = () => setShowPinModal(true);
  const handleClosePinModal = () => setShowPinModal(false);

  const FUSelectInstruction = (instruction) => {
    const findInsLbl = drugInstructionList.find((x) => x.value == instruction);
    setSelectedInstructionLbl(findInsLbl ? findInsLbl.label : instruction);
    setSelectedInstruction(instruction);
  };

  const FUSelectDrugAmount = (amount) => {
    const findAmntLbl = drugAmountList.find((x) => x.value == amount);
    setSelectedAmountLbl(findAmntLbl ? findAmntLbl.label : amount);
    setSelectedAmount(amount);
  };

  // Patients Info
  const getPatientInfo = (e) => {
    e.preventDefault();
    setPatientStatIsLoading(true);

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
        if (response.data.error == "1") {
          $("#newPatientModal").modal("show");
        } else {
          ActiveInsuranceID = response.data.user.Insurance;
          setPatientsInfo(response.data.user);
          $("#patientInfoSection").show("");
        }
        setPatientStatIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPatientStatIsLoading(false);
      });
  };

  const addNewPatient = (props) => {
    let url = "Patient/addPatient";
    let data = props;
    data.CenterID = CenterID;

    console.log({ data });

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setPatientsInfo(response.data);
        $("#newPatientModal").modal("hide");
        SuccessAlert("موفق", "اطلاعات بیمار با موفقیت ثبت گردید!");
        if (response.data.errors) {
          ErrorAlert("خطا", "ثبت اطلاعات بیمار با خطا مواجه گردید!");
        }
        // e.target.reset();
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("خطا", "ثبت اطلاعات بیمار با خطا مواجه گردید!");
      });
  };

  const changeInsuranceType = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Patient/ChangeInsurance";
    let editData = {
      CenterID: CenterID,
      IID: formProps.insuranceTypeOptions,
      NID: formProps.patientNID,
    };

    console.log({ editData });

    axiosClient
      .post(url, editData)
      .then((response) => {
        console.log("changeInsurance", response.data);
        if (response.data.isCovered) {
          if (editData.IID === "1") {
            patientsInfo.InsuranceName = "سلامت ایرانیان";
            patientsInfo.Insurance = "1";
          } else if (editData.IID === "2") {
            patientsInfo.InsuranceName = "تامین اجتماعی";
            patientsInfo.Insurance = "2";
          } else if (editData.IID === "3") {
            patientsInfo.InsuranceName = "ارتش";
            patientsInfo.Insurance = "3";
          } else {
            patientsInfo.InsuranceName = "آزاد";
            patientsInfo.Insurance = "4";
          }
          SuccessAlert("موفق", "!تغییر نوع بیمه با موفقیت انجام شد");
        } else {
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

  // Search Services
  const handleOnFocus = () => {
    if (ActiveSrvCode === null && $("#srvSearchInput").val().length > 2) {
      $(".SearchDiv").show();
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      $(".SearchDiv").hide();
    }, 200);
  };

  const SearchTaminSrv = (e) => {
    e.preventDefault();

    if (ActiveSrvCode == null || srvEditMode) {
      setSearchIsLoading(true);

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
          } else {
            $(".unsuccessfullSearch").hide();
          }
          setSearchIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setSearchIsLoading(false);
        });
    }
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

  // Tab Change
  const changePrescId = (Sid, Img, name, id) => {
    ActiveServiceTypeID = Sid;
    ActivePrscName = name;
    prescId = id;

    // count = $("#srvItemCountId" + prescId).html();

    // $(".unsuccessfullSearch").hide();

    // if (ActiveSrvCode) {
    //   ActiveSearch();
    // }
    // else {
    //   if ($("#srvSearchInput").val().length > 0) {
    //     $("#srvSearchInput").val("");
    //   }
    // }
    if (Img) {
      ActivePrscImg = Img;
    }
  };

  // Edit Service
  const updateItem = (id, newArr) => {
    let index = PrescriptionItemsData.findIndex((x) => x.SrvCode === id);
    let g = PrescriptionItemsData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else {
      setTimeout(() => {
        setPrescriptionItemsData([
          ...PrescriptionItemsData.slice(0, index),
          g,
          ...PrescriptionItemsData.slice(index + 1),
        ]);
      }, 5);
    }
  };

  const DeleteService = (id, prescId, prescItems) => {
    addPrescriptionitems = addPrescriptionitems.filter(
      (a) => a.srvId.srvCode !== id
    );
    if (prescItems) updateItem(id, prescItems);
  };

  // Presc Item Creator
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
        return false;
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

        if (!srvEditMode) {
          if (
            addPrescriptionitems.length > 0 &&
            addPrescriptionitems.find(({ srvId }) => srvId.srvCode === SrvCode)
          ) {
            ErrorAlert("خطا", "سرویس انتخابی تکراری می باشد");
            return false;
          }
        } else {
          DeleteService(ActiveEditSrvCode, prescId, prescItems);
          setSrvEditMode(false);
          ActiveSrvCode = null;
        }

        // count badge
        count = $("#srvItemCountId" + prescId).html();

        if (count == "") count = 0;

        count = parseInt(count);
        count++;

        $("#srvItemCountId" + prescId).html(count);

        // hide if count = 0
        // if (count === 0) $("#srvItemCountId" + prescId).hide();

        return { prescData, prescItems };
      }
    }
  };

  // Add to list
  const FuAddToListItem = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

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
      let visitPrescData = {
        Name: ActiveSrvName,
        Code: ActiveSrvCode,
      };

      addPrescriptionitems.push(prescData);
      addPrescriptionSrvNameitems.push(visitPrescData);
      setPrescriptionItemsData([...PrescriptionItemsData, prescItems]);

      ActiveSearch();
    }
    $("#QtyInput").val("1");
    setSelectedAmount(null);
    setSelectedAmountLbl(null);
    setSelectedInstruction(null);
    setSelectedInstructionLbl(null);
  };

  const updatePrescriptionAddItem = async (obj) => {
    let arr = [];
    for (let i = 0; i < obj.data.length; i++) {
      const presc = obj.data[i];
      let drugAmntId = presc.drugAmntId;
      let drugAmntLbl = drugAmountList.find((o) => o.value === drugAmntId);

      if (drugAmntLbl) drugAmntLbl = drugAmntLbl.label;

      let drugInstId = presc.drugInstId;
      let InstructionLbl = drugInstructionList.find(
        (o) => o.value === drugInstId
      );

      if (InstructionLbl) InstructionLbl = InstructionLbl.label;

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
        arr.push(prescItems);
      }
    }
    setPrescriptionItemsData(arr);
  };

  const getPinInputValue = (code) => {
    if (prescriptionHeadID) {
      setShowPinModal(true);
    }

    // registerEpresc(0, code);
    deletePresc(code);
  };

  // delete prescription
  const deletePresc = (code) => {
    let url = "TaminEprsc/PrescriptionDelete";

    let data = {
      headerID: prescriptionHeadID,
      prID: PrID,
      CenterID: CenterID,
      otpCode: code,
    };

    console.log({ data });

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        // setPrescriptionsList(prescriptionsList.filter((a) => a._id !== prID));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // only Visit
  const registerEpresc = async (visit, code) => {
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
      //   axiosClient.post(url, data).then(async function (response) {
      //     console.log(response.data);
      //     if (response.data.res.trackingCode !== null) {
      //       SuccessAlert(
      //         "نسخه نهایی با موفقیت ثبت شد!",
      //         "کد رهگیری شما : " + `${response.data.res.trackingCode}`
      //       );
      //     } else if (response.data.res.error_Code !== null) {
      //       ErrorAlert("خطا!", response.data.res.error_Msg);
      //     } else if (response.data.res == null) {
      //       ErrorAlert("خطا", "سرور در حال حاضر در دسترس نمی باشد!");
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      // });

      let data = {
        CenterID,
        NID: ActivePatientID,
        PMN: $("#PatientTel").html(),
        PTI: prescId,
        Comment: $("#eprscItemDescription").val(),
        note: addPrescriptionitems,
        SrvNames: addPrescriptionSrvNameitems,
        prescTypeName: ActivePrscName,
      };

      let url = prescriptionHeadID
        ? "TaminEprsc/PrescriptionEdit"
        : "TaminEprsc/PrescriptionAdd";

      let dataToSend = { ...data, otpCode: code };

      if (prescriptionHeadID) {
        dataToSend = {
          ...dataToSend,
          PrID: PrID,
          headerID: prescriptionHeadID,
        };
      }

      console.log({ dataToSend, url });

      try {
        const response = await axiosClient.post(url, dataToSend);
        console.log(response.data);
        // handle the response...
      } catch (error) {
        console.error(error);
      }
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

  // get prescription data by headId to edit
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

  // edit prescItem
  const handleEditPrescItem = (srvData, force) => {
    setEditSrvData(srvData);
    setSrvEditMode(true);

    setTimeout(() => {
      setShowFavModal(false);
    }, 200);

    ActiveSrvCode = srvData.SrvCode;
    ActiveSrvName = srvData.SrvName;
    ActiveEditSrvCode = srvData.SrvCode;
  };

  //------ favourite items -------//
  const openFavModal = () => setShowFavModal(true);

  const getFavEprescItems = () => {
    let url = `FavEprscItem/getTamin/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        setFavEprescItems(response.data);
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
        setFavEprescItems([...[response.data], favEprescItems]);
        SuccessAlert("موفق", "سرویس به لیست علاقه مندی ها اضافه گردید!");
      })
      .catch((err) => console.log(err));
  };

  const handleAddFavItem = async (srv) => {
    const findDrugInstVal = drugInstructionList.find(
      (x) => x.label == srv.DrugInstruction
    );

    const findDrugAmntVal = drugAmountList.find(
      (x) => x.label == srv.TimesADay
    );

    const result = await prescItemCreator(
      srv.prescId,
      findDrugInstVal.value,
      findDrugAmntVal,
      srv.SrvCode,
      srv.SrvName,
      srv.Qty,
      srv.Img,
      srv.DrugInstruction,
      srv.TimesADay,
      ActivePrscName,
      srv.PrescType,
      ""
    );

    if (result) {
      let { prescData, prescItems } = result;
      console.log({ result });
    } else {
      console.log("prescData undefind");
    }
  };

  useEffect(() => {
    prescriptionHeadID = Router.query.id;
    ActivePatientID = Router.query.pid;
    PrID = Router.query.prId;
    ActiveCenterID = Router.query.centerID;

    setTimeout(() => {
      if (ActivePatientID) {
        $("#frmPatientInfoBtnSubmit").click();
      }
    }, 1000);

    if (prescriptionHeadID) getEprscData();

    // updatePrescriptionAddItem(responseObj);

    // window.onbeforeunload = function () {
    //   return 'Changes you made may not be saved';
    // }

    getFavEprescItems();
    $(".unsuccessfullSearch").hide();
  }, [Router.query.id]);

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
                setPatientsInfo={setPatientsInfo}
                changeInsuranceType={changeInsuranceType}
                ActivePatientID={ActivePatientID}
                UserData={UserData}
                isLoading={isLoading}
                patientStatIsLoading={patientStatIsLoading}
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
                FUSelectInstruction={FUSelectInstruction}
                FUSelectDrugAmount={FUSelectDrugAmount}
                handleOnFocus={handleOnFocus}
                handleOnBlur={handleOnBlur}
                isLoading={isLoading}
                editSrvData={editSrvData}
                srvEditMode={srvEditMode}
                drugInstructionList={drugInstructionList}
                drugAmountList={drugAmountList}
                setSrvEditMode={setSrvEditMode}
                SelectedInstruction={SelectedInstruction}
                setSelectedInstruction={setSelectedInstruction}
                setEditSrvData={setEditSrvData}
                SelectedAmount={SelectedAmount}
                setSelectedAmount={setSelectedAmount}
                openFavModal={openFavModal}
                openPinModal={openPinModal}
                deletePresc={deletePresc}
                searchIsLoading={searchIsLoading}
              />

              <div className="prescList">
                <AddToListItem
                  data={PrescriptionItemsData}
                  setPrescriptionItemsData={setPrescriptionItemsData}
                  handleEditPrescItem={handleEditPrescItem}
                  selectFavEprescItem={selectFavEprescItem}
                  DeleteService={DeleteService}
                />
              </div>
            </div>
          </div>
        </div>

        <FavPrescListModal
          data={favEprescItems}
          show={showFavModal}
          onHide={handleClosefavModal}
          isLoading={isLoading}
          FuAddToListItem={FuAddToListItem}
          handleAddFavItem={handleAddFavItem}
          handleEditPrescItem={handleEditPrescItem}
        />

        {prescriptionHeadID && showPinModal && (
          <PrescPinInput
            show={showPinModal}
            onHide={handleClosePinModal}
            getPinInputValue={getPinInputValue}
          />
        )}

        <AddNewPatient
          addNewPatient={addNewPatient}
          UserData={UserData}
          ActivePatientID={ActivePatientID}
        />
      </div>
    </>
  );
};

export default Prescription;
