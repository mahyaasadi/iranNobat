// "use client"; //This is a client component
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Select from "react-select";
import Image from "next/image";
import OverviewStats from "components/dashboard/overview/overviewStats"
import Loading from "components/loading/loading"
import {
  avatar02,
  avatar03,
  avatar04,
  avatar05,
  avatar06,
  avatar07,
  avatar08,
  avatar09,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  calender,
  cardio,
  chart,
  dental,
  flag01,
  flag02,
  flag03,
  flag04,
  flag05,
  neurology,
  ortho,
  urology,
} from "components/imagepath";

let CenterID = Cookies.get("CenterID");

const Dashboard = () => {

  const [selectedDuration, setSelectedDuration] = useState("today");
  const [stats, setStats] = useState(null)
  const [statsIsLoading, setStatsIsLoading] = useState(true)

  const overviewOptions = [
    { value: "today", label: "امروز" },
    { value: "lastWeek", label: "هفته گذشته" },
    { value: "lastMonth", label: "این ماه" },
  ];

  const getStats = (duration) => {
    let url = "https://irannobat.ir:8444/api/Dashboard"
    setStatsIsLoading(true)
    if (duration === "today") {
      url += "/TodayStatistics"
    }
    else if (duration === "lastWeek") {
      url += "/LastWeekStatistics"
    }
    else if (duration === "lastMonth") {
      url += "/MonthStatistics"
    }
    console.log(duration, url);

    axios.post(url, {
      CenterID: CenterID
    })
      .then((response) => {
        console.log(duration, response.data)
        setStats(response.data);
        setStatsIsLoading(false)
      })
  };

  useEffect(() => {
    try {
      getStats(selectedDuration);
    } catch (error) {
      setStatsIsLoading(true)
      console.log(error);
    }
  }, [selectedDuration]);

  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <div className="">
              <div className="dashboard-header">
                <div className="col overview-title">
                  <h5 className="card-title">بررسی اجمالی</h5>
                </div>

                <div className="dashboard-selector">
                  <Select
                    className="select"
                    // defaultValue={selectedOption}
                    onChange={(e) => setSelectedDuration(e.value)}
                    options={overviewOptions}
                    placeholder={"امروز"}
                    id="long-value-select"
                    instanceId="long-value-select"
                  />
                </div>

              </div>
            </div>

            {!statsIsLoading ? (
              <OverviewStats
                stats={stats}
              />
            ) : (
              <Loading />
            )}

          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
