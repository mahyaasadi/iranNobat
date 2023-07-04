import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Loading from "components/loading/loading";
import PatientInformation from "components/dashboard/prescription/patientInformation";
import PrescriptionCard from "components/dashboard/prescription/prescriptionCard";
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
  ActivePrscImg = null;

const changePrescId = (id, Img) => {
  precId = id;
  if (typeof Img !== "undefined") {
    ActivePrscImg = Img;
  }
};

const selectPrescriptionType = () => {
  console.log("select");
};

const SelectSrvSearch = (name, code) => {
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

  //get patient info
  const getPatientInfo = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "https://irannobat.ir:8444/api/Patient/checkByNid";
    let data = {
      CenterID: CenterID,
      NID: formProps.nationalCode,
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setPatientsInfo(response.data.user);
        $("#patientInfoSection").show("")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="row prescription-main-container">
        <PatientInformation
          getPatientInfo={getPatientInfo}
          data={patientsInfo}
        />
        <PrescriptionCard
          lists={taminHeaderList}
          onSelect={selectPrescriptionType}
          changePrescId={changePrescId}
        />
      </div>
    </>
  );
};

export default Prescription;

// 0011066504
