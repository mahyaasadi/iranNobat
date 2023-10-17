import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig";
import Loading from "components/commonComponents/loading/loading";
import PatientsCategories from "components/dashboard/cashDesk/patientCategories";

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
const CashDesk = ({ UserData, UserRoles, Menus }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [patientsInfo, setPatientsInfo] = useState([]);

  const getPatientsInfo = () => {
    setIsLoading(true);
    let url = `Reception/CashDeskPatient/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        console.log("reception info", response.data);

        let patientItems = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let obj = {
            id: item._id,
            category: 1,
            name: item.Patient.Name,
            avatar: item.Patient.Avatar,
            nationalID: item.Patient.NationalID,
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

  useEffect(() => {
    getPatientsInfo();
  }, []);

  return (
    <>
      <Head>
        <title>صندوق</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <PatientsCategories
            patientsInfo={patientsInfo}
            setPatientsInfo={setPatientsInfo}
          />
        </div>
      </div>
    </>
  );
};

export default CashDesk;
