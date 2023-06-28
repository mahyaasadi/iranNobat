import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import TariffHeader from "components/dashboard/tariff/tariffHeader";
import TariffListTable from "components/dashboard/tariff/tariffListTable";

let CenterID = Cookies.get("CenterID");

const Tariff = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [services, setServices] = useState([]);

  //get departments -> Tariff Header
  const getDepartments = () => {
    let UrlGetDep = `https://irannobat.ir:8444/api/Center/GetDepartments/${CenterID}`;
    axios.get(UrlGetDep).then(function (response) {
      setDepartmentsData(response.data);
    });
  };

  useEffect(() => {
    try {
      getDepartments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //get services
  const getServices = (DepID) => {
    let url = `https://irannobat.ir:8444/api/CenterServicessInfo/getByDepID/${CenterID}/${DepID}`;

    axios.get(url).then(function (response) {
      console.log("services", response.data.ServicesInfo);
      setServices(response.data.ServicesInfo);
    });
  };

  useEffect(() => {
    try {
      getServices();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <TariffHeader data={departmentsData} getServices={getServices} />

        <div className="row align-items-center mt-4 mb-3">
          <div className="col-md-12 d-flex justify-content-end">
            <div href="#" className="btn btn-primary btn-add">
              بازگشت به تنظیمات مرکز
            </div>
          </div>
        </div>

        {/* <!--  services Table --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header border-bottom-0">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="card-title">لیست خدمات</h5>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="form-custom me-2">
                      <div
                        id="tableSearch"
                        className="dataTables_wrapper"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 font-size-12">
                <TariffListTable data={services} />
              </div>
            </div>

            <div id="tablepagination" className="dataTables_wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tariff;
