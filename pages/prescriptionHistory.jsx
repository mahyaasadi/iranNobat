import { useState, useEffect } from "react";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
import { ErrorAlert } from "class/AlertManage";
import { getSession } from "lib/session";
import Loading from "components/commonComponents/loading/loading";
import SearchPrescHistory from "components/dashboard/prescriptionHistory/SearchPrescHistory";
import PrescriptionsListTable from "components/dashboard/prescriptionHistory/prescriptionsHistoryList";

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

  //get prescriptions list
  const getPrescriptionsList = () => {
    setIsLoading(true);

    let url = "BimehTamin/CenterPrescription";
    let data = { CenterID: CenterID };

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setPrescriptionsList(response.data.result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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
                <PrescriptionsListTable data={prescriptionsList} />
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrescriptionHistory;
