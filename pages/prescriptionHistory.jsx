import { useState, useEffect } from "react";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/commonComponents/loading/loading";
import DatePicker from "components/commonComponents/datepicker/DatePicker";
import PrescriptionsListTable from "components/dashboard/prescription/prescriptionsHistoryList";
import { getSession } from "lib/session";
import { ErrorAlert } from "class/AlertManage";

let dateFrom,
  dateTo,
  CenterID = null;

const SetDate = (f, t) => {
  dateFrom = f;
  dateTo = t;
};

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
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0 margin-top-1 margin-bottom-4">
                    <form>
                      <div className="row">
                        <div className="col-md-12 col-lg-3 mt-3">
                          <DatePicker SetDate={SetDate} />
                        </div>

                        <div className="col-md-12  col-md-9 col-lg-3 mt-3">
                          <div className="input-group">
                            <label className="lblAbs font-12 ">
                              جستجو طبق کد ملی
                            </label>
                            <input
                              type="text"
                              name="nationalCode"
                              required
                              className="form-control rounded"
                            />
                          </div>
                        </div>

                        <div className="col-md-12  col-md-9 col-lg-3 mt-3">
                          <div className="input-group">
                            <label className="lblAbs font-12 ">
                              جستجو طبق نام بیمار
                            </label>
                            <input
                              type="text"
                              name="patientName"
                              required
                              className="form-control rounded"
                            />
                          </div>
                        </div>

                        <div className="col-md-12 col-md-12 col-lg-3 mt-3">
                          <button
                            className="btn btn-primary rounded w-100"
                            id=""
                          >
                            <i className="fe fe-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <PrescriptionsListTable data={prescriptionsList} />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrescriptionHistory;
