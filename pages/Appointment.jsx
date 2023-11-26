// import React, {useEffect, useState} from 'react';
import Head from "next/head";
import "/public/assets/css/appointment.css";
import JDate from "jalali-date";
import Day from "../components/Appointment/Day";

const Appointment = () => {
  const addDayToDate = (day, week) => {
    let h = day * 24;
    return new Date(new Date().getTime() + h * 60 * 60 * 1000);
  };
  let today = new JDate.toJalali(addDayToDate(0));
  let plus1 = new JDate.toJalali(addDayToDate(1));
  let plus2 = new JDate.toJalali(addDayToDate(2));
  let plus3 = new JDate.toJalali(addDayToDate(3));
  let plus4 = new JDate.toJalali(addDayToDate(4));
  let Hours = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j = j + 15) {
      Hours.push(
        <div class="time-marker">
          {i} : {j}
        </div>
      );
    }
  }
  return (
    <>
      <Head>
        <title>نوبت دهی</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Appointment List */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">لیست پذیرش</h5>
                    </div>
                    <div className="col">
                      <a
                        href="/Reception"
                        className="btn btn-primary float-end"
                      >
                        ( F1 ) پذیرش جدید{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="calendar">
                  <div class="timeline">
                    <div class="spacer"></div>
                    {Hours}
                  </div>
                  <div class="days">
                    <Day date={today} />
                    <Day date={plus1} />
                    <Day date={plus2} />
                    <Day date={plus3} />
                    <Day date={plus4} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
