import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import JDate from "jalali-date";
import moment from "jalali-moment";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, DateObject } from "react-multi-date-picker";
import ShiftDetailsModal from "components/dashboard/monthlySchedule/shiftDetailsModal";
import AddShiftModal from "components/dashboard/monthlySchedule/addShiftModal";
import CopyShiftModal from "components/dashboard/monthlySchedule/copyShiftModal";

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
        destination: `/login`,
      },
    };
  }
};

const MonthlySchedule = ({ Menus, UserData, UserRoles }) => {
  const dateObject = new DateObject();
  const toDateObject = (day) => new DateObject(dateObject).setDay(day);

  const [value, setValue] = useState(new Date());
  console.log("value : ", value);

  return (
    <>
      <Head>
        <title>برنامه ماهیانه</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body calendar-body p-0">
              <Calendar
                calendar={persian}
                locale={persian_fa}
                monthYearSeparator="|"
                value={value}
                onChange={setValue}
                mapDays={({ date }) => {
                  const newDate = new DateObject(date).convert(
                    persian,
                    persian_fa
                  );

                  let props = {};
                  let isWeekend = [6, 6].includes(date.weekDay.index);
                  if (isWeekend) {
                    props.className = "highlight highlight-red";
                    return props;
                  }

                  return {
                    children: (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0 10px",
                          fontSize: "11px",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          {newDate.format("D")}
                        </div>
                        <div className="scheduleFeatures" id="scheduleFeatures">
                          <i className="d-flex flex-column">
                            <Link
                              className="text-black"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#shiftDetailsModal"
                            >
                              <button className="btn featureBtn">
                                <FeatherIcon icon="settings" />
                              </button>
                            </Link>

                            <Link
                              className="text-black"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#copyShiftModal"
                            >
                              <button className="btn featureBtn">
                                <FeatherIcon icon="copy" />
                              </button>
                            </Link>
                          </i>
                        </div>
                      </div>
                    ),
                  };
                }}
              />
            </div>
          </div>
        </div>

        <ShiftDetailsModal value={value} />

        <AddShiftModal />

        <CopyShiftModal value={value} />
      </div>
    </>
  );
};

export default MonthlySchedule;
