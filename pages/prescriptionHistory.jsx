import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import Head from "next/head";
import Loading from "components/loading/Loading";
import PrescriptionsListTable from "components/dashboard/prescription/prescriptionHistory/prescriptionsListTable";
import DatePicker from "components/commonComponents/datepicker/DatePicker";

let CenterID = Cookies.get("CenterID");
let dateFrom,
  dateTo = null;

const SetDate = (f, t) => {
  dateFrom = f;
  dateTo = t;
};

const PrescriptionHistory = () => {
  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get prescriptions list
  const getPrescriptionsList = () => {
    let url = "BimehTamin/CenterPrescription";
    let data = { CenterID: CenterID };
    setIsLoading(true);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setPrescriptionsList(response.data.result);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
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
                        <button className="btn btn-primary rounded w-100" id="">
                          <i className="fe fe-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* <!-- Prescriptions List --> */}
                {isLoading ? (
                  <Loading />
                ) : (
                  <PrescriptionsListTable data={prescriptionsList} />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionHistory;
