// "use client"; //This is a client component
import { useState, useEffect } from "react";
import Link from "next/link";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Select from "react-select";
import Image from "next/image";
import JDate from "jalali-date";
import Loading from "components/loading/loading";
import OverviewStats from "components/dashboard/overview/overviewStats";

let CenterID = Cookies.get("CenterID");
const jdate = new JDate();

const Dashboard = () => {
  const [selectedDuration, setSelectedDuration] = useState("today");
  const [stats, setStats] = useState(null);
  const [statsIsLoading, setStatsIsLoading] = useState(true);

  const overviewOptions = [
    { value: "today", label: "امروز : " + jdate.format("dddd DD MMMM YYYY") },
    { value: "lastWeek", label: "هفته گذشته" },
    {
      value: "lastMonth",
      label: "ماه جاری : " + jdate.format("MMMM YYY"),
    },
  ];

  const getStats = (duration) => {
    setStatsIsLoading(true);
    let url = "Dashboard";

    if (duration === "today") {
      url += "/TodayStatistics";
    } else if (duration === "lastWeek") {
      url += "/LastWeekStatistics";
    } else if (duration === "lastMonth") {
      url += "/MonthStatistics";
    }

    axiosClient.post(url, { CenterID }).then((response) => {
      setStats(response.data);
      setStatsIsLoading(false);
    });
  };

  useEffect(() => {
    try {
      getStats(selectedDuration);
    } catch (error) {
      setStatsIsLoading(true);
      console.log(error);
    }
  }, [selectedDuration]);

  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <div className="overview-container">
              <div className="dashboard-header">
                <div className="col overview-title">
                  <p className="card-title">بررسی اجمالی</p>
                </div>

                <div className="dashboard-selector font-13">
                  <Select
                    className="select"
                    onChange={(e) => setSelectedDuration(e.value)}
                    options={overviewOptions}
                    placeholder={"امروز : " + jdate.format("dddd DD MMMM YYYY")}
                    id="long-value-select"
                    instanceId="long-value-select"
                  />
                </div>
              </div>
            </div>

            {!statsIsLoading ? <OverviewStats stats={stats} /> : <Loading />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
