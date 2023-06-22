// "use client"; //This is a client component
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Select from "react-select";
import Image from "next/image";
import OverviewStats from "components/dashboard/overview/overviewStats"
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
  
const [selectedOption, setSelectedOption] = useState();

const [todayData, setTodayData] = useState([])
const [lastWeekData, setLastWeekData] = useState([])
const [thisMonthData, setThisMonthData] = useState([])

const [talkingValue, setTalkingValue] = useState("")
const [totalReq, setTotalReq] = useState("")
const [turnGivenValue, setTurnGivenValue] = useState("")
const [WaitingForPaymentValue, setWaitingForPaymentValue] = useState("")

const overviewOptions = [
  { value: "امروز ", label: "امروز" },
  { value: "هفته گذشته", label: "هفته گذشته" },
  { value: "این ماه", label: "این ماه" },
];
  
// today stats
  const getTodayStats = () => {
    axios
      .post("https://irannobat.ir:8444/api/Dashboard/TodayStatistics", {
        CenterID: CenterID,
      })
      .then(function (response) {
        // console.log(response.data)
        setTodayData(response.data)
        console.log(todayData)
      });
  };

  useEffect(() => {
    try {
      getTodayStats();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // last week stats
  const getLastWeekStats = () => {
    axios
      .post("https://irannobat.ir:8444/api/Dashboard/LastWeekStatistics", {
        CenterID: CenterID,
      })
      .then(function (response) {
        setLastWeekData(response.data)
        console.log(lastWeekData)
      });
  };

  useEffect(() => {
    try {
      getLastWeekStats();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // this month stats
  const getThisMonthStats = () => {
    axios
      .post("https://irannobat.ir:8444/api/Dashboard/MonthStatistics", {
        CenterID: CenterID,
      })
      .then(function (response) {
        setThisMonthData(response.data)
        console.log(thisMonthData);
      });
  };

  useEffect(() => {
    try {
      getThisMonthStats();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <div className="card-header dashboard-header">
              <div className="dashboard-row row align-items-center">
                <div className="col">
                  <h5 className="card-title">بررسی اجمالی</h5>
                </div>

                <div className="col-auto select-option">
                  <Select
                    className="select"
                    // defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={overviewOptions}
                    placeholder={"امروز"}
                    id="long-value-select"
                    instanceId="long-value-select"
                  />
                </div>

              </div>
            </div>
            
            <OverviewStats
              todayData={todayData}
              lastWeekData={lastWeekData}
              thisMonthData={thisMonthData}
              
              talkingValue={talkingValue}
              totalReq={totalReq}
              turnGivenValue={turnGivenValue}
              WaitingForPaymentValue={WaitingForPaymentValue}
              getTodayStats={getTodayStats}
              getLastWeekStats={getLastWeekStats}
              getThisMonthStats={getThisMonthStats}
            />

          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
