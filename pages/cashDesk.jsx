import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig";
import Loading from "components/commonComponents/loading/loading";
import PatientsCategories from "components/dashboard/cashDesk/patientCategories";
import CashDeskActions from "components/dashboard/cashDesk/actionsModal";

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

let CenterID,
  ActiveReceptionID = null;
const CashDesk = ({ UserData, UserRoles, Menus }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [patientsInfo, setPatientsInfo] = useState([]);
  const [kartData, setKartData] = useState([]);
  const [kartsOptionList, setKartsOptionsList] = useState([]);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [selectedKart, setSelectedKart] = useState(null);
  const [actionModalData, setActionModalData] = useState([]);

  // const [debt, setDebt] = useState("");

  // const handleDebtInput = (e) => {
  //   let value = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  //   value = Number(value).toLocaleString(); // Convert to formatted string
  //   setDebt(value);
  // };

  const handleCloseActionsModal = () => setShowActionsModal(false);

  const openActionModal = (receptionID, data) => {
    setShowActionsModal(true);
    ActiveReceptionID = receptionID;
    setActionModalData(data);
  };

  const getPatientsInfo = () => {
    setIsLoading(true);
    let url = `Reception/CashDeskPatient/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        // console.log("reception info", response.data);

        let patientItems = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let calculatedCost = 0;

          item.Calculated?.map((x) => {
            calculatedCost += parseInt(x.RowTotalPatientCost);
          });

          let obj = {
            id: item._id,
            category: 1,
            name: item.Patient.Name,
            avatar: item.Patient.Avatar,
            nationalID: item.Patient.NationalID,
            totalPatientCost: calculatedCost,
            item,
          };
          patientItems.push(obj);
        }
        setPatientsInfo(patientItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // get all kartsData
  const getKartsData = () => {
    setIsLoading(true);
    let url = `CashDeskKart/getAll/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        // console.log("karts", response.data);
        setKartData(response.data);

        let kartOptions = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let obj = {
            value: item._id,
            label: item.Name,
          };
          kartOptions.push(obj);
        }
        setKartsOptionsList(kartOptions);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const applyCashDeskActions = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Reception/CashDeskAction";
    let data = {
      ReceptionID: ActiveReceptionID,
      CashPayment: formProps.cashPayment,
      CartPayment: formProps.cartPayment,
      Cart: selectedKart,
      Debt: formProps.debt,
      ReturnPayment: formProps.returnPayment,
    };

    console.log({ data });

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        e.target.reset();
        setShowActionsModal(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPatientsInfo();
    getKartsData();
  }, []);

  return (
    <>
      <Head>
        <title>صندوق</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? <Loading /> : (
          <div className="content container-fluid">
            <PatientsCategories
              patientsInfo={patientsInfo}
              setPatientsInfo={setPatientsInfo}
              openActionModal={openActionModal}
            />
          </div>
        )}

        <CashDeskActions
          show={showActionsModal}
          onHide={handleCloseActionsModal}
          kartsOptionList={kartsOptionList}
          selectedKart={selectedKart}
          setSelectedKart={setSelectedKart}
          applyCashDeskActions={applyCashDeskActions}
          data={actionModalData}
        // debt={debt}
        // handleDebtInput={handleDebtInput}
        />
      </div>
    </>
  );
};

export default CashDesk;
