import { useState, useEffect } from "react";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
import { ErrorAlert } from "class/AlertManage";
import { getSession } from "lib/session";
import Loading from "components/commonComponents/loading/loading";
import SearchPrescHistory from "components/dashboard/prescriptionHistory/SearchPrescHistory";
import PrescriptionsListTable from "components/dashboard/prescriptionHistory/prescriptionsHistoryList";
import PrescPinInput from "components/dashboard/prescription/prescPinInput";

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
const PrescriptionHistory = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const handleClosePinModal = () => setShowPinModal(false);

  //get prescriptions list
  const getPrescriptionsList = () => {
    setIsLoading(true);

    let url = "BimehTamin/CenterPrescription";
    let data = { CenterID: CenterID };

    axiosClient
      .post(url, data)
      .then((response) => {
        // console.log(response.data);
        setPrescriptionsList(response.data.result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const getPinInputValue = (code) => {
    if (deleteData) {
      deletePresc(
        deleteData.headerID,
        deleteData.prID,
        deleteData.centerID,
        code
      );
    }
    setShowPinModal(false); // Close the modal after sending request
  };

  const prepareDelete = (headerID, prID, centerID) => {
    setDeleteData({ headerID, prID, centerID });
    setShowPinModal(true);
  };

  const deletePresc = (headerID, prID, centerID, otpCode) => {
    let url = "TaminEprsc/PrescriptionDelete";

    let data = { headerID, prID, centerID, otpCode };
    console.log({ data });

    axiosClient
      .delete(url, { data })
      .then((response) => {
        console.log(response.data);
        setPrescriptionsList(prescriptionsList.filter((a) => a._id !== prID));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPrescriptionsList();
  }, []);

  return (
    <>
      <Head>
        <title>سوابق نسخه</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="card">
              <div className="col-sm-12">
                <SearchPrescHistory />
                <PrescriptionsListTable
                  data={prescriptionsList}
                  prepareDelete={prepareDelete}
                />
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          )}
        </div>
        <PrescPinInput
          show={showPinModal}
          // onHide={handleClosePinModal}
          getPinInputValue={getPinInputValue}
        />
      </div>
    </>
  );
};

export default PrescriptionHistory;
