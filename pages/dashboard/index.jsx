// "use client"; //This is a client component
import React, { useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import Select from "react-select";
import Image from "next/image";
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

const Dashboard = () => {
  const options = [
    { value: "This Week", label: "This Week" },
    { value: "This Month", label: "This Month" },
  ];
  const options1 = [
    { value: "Patients", label: "Patients" },
    { value: "Doctors", label: "Doctors" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const settings = {
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
    arrow: "true",
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    width: 400,
    dots: false,
    autoplay: false,
    infinite: "true",
    speed: 500,
    items: 5,
    slidestoshow: 5,
    slidestoscroll: 1,
    centerpadding: "15px",
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
        margin: 10,
      },
      576: {
        items: 2,
        margin: 15,
      },
      768: {
        items: 2,
        margin: 15,
      },
      992: {
        items: 2,
        margin: 15,
      },
      1170: {
        items: 2,
        margin: 15,
      },
      1550: {
        items: 5,
      },
    },
  };
  return (
    <>
      <div className="main-wrapper">
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <h4 className="mb-3">بررسی اجمالی</h4>
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon bg-primary">
                        <FeatherIcon icon="user-plus" />
                      </span>
                      <div className="dash-count">
                        <h5 className="dash-title">پزشکان</h5>
                        <div className="dash-counts">
                          <p>4505</p>
                        </div>
                      </div>
                    </div>
                    <p className="trade-level mb-0">
                      <span className="text-danger me-1">
                        <i className="fas fa-caret-down me-1" />
                        1.15%
                      </span>{" "}
                      هفته گذشته
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon bg-blue">
                        <FeatherIcon icon="users" />
                      </span>
                      <div className="dash-count">
                        <h5 className="dash-title">بیمار</h5>
                        <div className="dash-counts">
                          <p>2000</p>
                        </div>
                      </div>
                    </div>
                    <p className="trade-level mb-0">
                      <span className="text-success me-1">
                        <i className="fas fa-caret-up me-1" />
                        4.5%
                      </span>{" "}
                      هفته گذشته
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon bg-warning">
                        <Image src={calender} alt="User Image" />
                      </span>
                      <div className="dash-count">
                        <h5 className="dash-title">درخواست نوبت</h5>
                        <div className="dash-counts">
                          <p>4500</p>
                        </div>
                      </div>
                    </div>
                    <p className="trade-level mb-0">
                      <span className="text-success me-1">
                        <i className="fas fa-caret-up me-1" />
                        9.65%
                      </span>{" "}
                      هفته گذشته
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon bg-danger">
                        <Image src={chart} alt="User Image" />
                      </span>
                      <div className="dash-count">
                        <h5 className="dash-title">در آمد</h5>
                        <div className="dash-counts">
                          <p>$62523</p>
                        </div>
                      </div>
                    </div>
                    <p className="trade-level mb-0">
                      <span className="text-danger me-1">
                        <i className="fas fa-caret-up me-1" />
                        40.5%
                      </span>{" "}
                      هفته گذشته
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* <Appointments /> */}
              {/* <IncomeReport /> */}
            </div>
            <div className="row">{/* <TodayAppointment /> */}</div>
            <div className="row">
              {/* <RecentActivities /> */}
              {/* <TopDoctors /> */}
            </div>

            <div className="row">
              {/* Popular by Speciality */}
              <div className="col-xl-4 col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title">Popular by Speciality </h5>
                      </div>
                      <div className="col-auto select-option">
                        <Select
                          className="select"
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder={"This Week"}
                          id="long-value-select"
                          instanceId="long-value-select"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr className="speciality-item">
                            <td className="spl-name">
                              <div className="spl-box">
                                <Image src={urology} alt="User Image" />
                              </div>
                              <div className="spl-count">
                                <h6>Urology</h6>
                                <p>Patients : 400</p>
                              </div>
                            </td>
                            <td className="con-revenue">
                              <p className="text-muted">Revenue</p>
                              <h6>$6000K</h6>
                            </td>
                            <td className="spl-consult">
                              <p className="text-muted">Consultations</p>
                              <h6>200</h6>
                            </td>
                          </tr>
                          <tr className="speciality-item">
                            <td className="spl-name">
                              <div className="spl-box">
                                <Image src={neurology} alt="User Image" />
                              </div>
                              <div className="spl-count">
                                <h6>Neurology</h6>
                                <p>Patients : 980 </p>
                              </div>
                            </td>
                            <td className="con-revenue">
                              <p className="text-muted">Revenue</p>
                              <h6>$6000K</h6>
                            </td>
                            <td className="spl-consult">
                              <p className="text-muted">Consultations</p>
                              <h6>98</h6>
                            </td>
                          </tr>
                          <tr className="speciality-item">
                            <td className="spl-name">
                              <div className="spl-box">
                                <Image src={ortho} alt="User Image" />
                              </div>
                              <div className="spl-count">
                                <h6>Orthopedic</h6>
                                <p>Patients : 600</p>
                              </div>
                            </td>
                            <td className="con-revenue">
                              <p className="text-muted">Revenue</p>
                              <h6>$6000K</h6>
                            </td>
                            <td className="spl-consult">
                              <p className="text-muted">Consultations</p>
                              <h6>78</h6>
                            </td>
                          </tr>
                          <tr className="speciality-item">
                            <td className="spl-name">
                              <div className="spl-box">
                                <Image src={cardio} alt="User Image" />
                              </div>
                              <div className="spl-count">
                                <h6>Urology</h6>
                                <p>Patients : 400</p>
                              </div>
                            </td>
                            <td className="con-revenue">
                              <p className="text-muted">Revenue</p>
                              <h6>$6000K</h6>
                            </td>
                            <td className="spl-consult">
                              <p className="text-muted">Consultations</p>
                              <h6>65</h6>
                            </td>
                          </tr>
                          <tr className="speciality-item">
                            <td className="spl-name">
                              <div className="spl-box">
                                <Image src={dental} alt="User Image" />
                              </div>
                              <div className="spl-count">
                                <h6>Urology</h6>
                                <p>Patients : 400</p>
                              </div>
                            </td>
                            <td className="con-revenue">
                              <p className="text-muted">Revenue</p>
                              <h6>$6000K</h6>
                            </td>
                            <td className="spl-consult">
                              <p className="text-muted">Consultations</p>
                              <h6>59</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title">Upcoming Appointments</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card-body up-content">
                    <div className="nav nav-tabs">
                      <div className="nav nav-tabs upcomimg-app">
                        <div className="pricing-carousel owl-carousel owl-theme"></div>
                      </div>
                    </div>
                    <div className="tab-content upcoming-content">
                      <div id="home" className="tab-pane in active">
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar05}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar09}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Rayan </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar13}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar08}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Leo </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="menu1" className="tab-pane">
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar07}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Rayan </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar08}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-6 col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar05}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-6 col-sm-4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar05}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-6 col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="menu2" className="tab-pane">
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-sm-6">
                                <div className="app-img">
                                  <Image src="" alt="" className="img-fluid" />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="menu3" className="tab-pane">
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Alex </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Abdul Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar02}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar12}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-6">
                                <div className="app-img">
                                  <Image src="" alt="" className="img-fluid" />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="menu4" className="tab-pane">
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar13}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-6">
                                <div className="app-img">
                                  <Image src="" alt="" className="img-fluid" />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar13}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-6">
                                <div className="app-img">
                                  <Image src="" alt="" className="img-fluid" />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar13}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Lester </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-6">
                                <div className="app-img">
                                  <Image src="" alt="" className="img-fluid" />
                                  <div className="app-name">
                                    <h6>Chris Harris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-4">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-4">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-sm-4">
                                <div className="float-sm-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="menu5" className="tab-pane">
                        <div className="appointment-items">
                          <div className="app-user">
                            <div className="row">
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar12}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Dr. Shofia </h6>
                                    <p>Orthopaedics</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="app-img">
                                  <Image
                                    src={avatar10}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="app-name">
                                    <h6>Harris Chris</h6>
                                    <p>ID : 781212, M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="app-time">
                            <p>
                              <i className="me-1">
                                <FeatherIcon icon="clock" />
                              </i>{" "}
                              06:00pm - 06:20pm
                            </p>
                          </div>
                          <div className="app-infos">
                            <div className="row align-items-center">
                              <div className="col-4 col-sm-6">
                                <p>Duration</p>
                                <p className="mb-0">20 Min</p>
                              </div>
                              <div className="col-8 col-sm-6">
                                <p>Consultation Fee</p>
                                <h6>$30.00K</h6>
                              </div>
                              <div className="col-4">
                                <div className="float-end">
                                  <div className="mode-app text-yellow">
                                    <i>
                                      <FeatherIcon icon="video" />
                                    </i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4"></div>
                          </div>
                        </div>
                      </div>
                      <div className="appointment-items">
                        <div className="app-user">
                          {/* <div className="row">
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Dr. Lester </h6>
                                  <p>Orthopaedics</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Chris Harris</h6>
                                  <p>ID : 781212, M</p>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4">
                              <div className="float-sm-end">
                                <div className="mode-app text-yellow">
                                  <i>
                                    <FeatherIcon icon="video" />
                                  </i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="menu6" className="tab-pane">
                      <div className="appointment-items">
                        <div className="app-user">
                          {/* <div className="row">
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Dr. Lester </h6>
                                  <p>Orthopaedics</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Chris Harris</h6>
                                  <p>ID : 781212, M</p>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4">
                              <div className="float-end">
                                <div className="mode-app text-yellow">
                                  <i>
                                    <FeatherIcon icon="video" />
                                  </i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="appointment-items">
                        {/* <div className="app-user">
                          <div className="row">
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Dr. Lester </h6>
                                  <p>Orthopaedics</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Chris Harris</h6>
                                  <p>ID : 781212, M</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4"></div>
                          </div>
                        </div>
                      </div>
                      <div className="appointment-items">
                        {/* <div className="app-user">
                          <div className="row">
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Dr. Lester </h6>
                                  <p>Orthopaedics</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Chris Harris</h6>
                                  <p>ID : 781212, M</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4">
                              <div className="float-sm-end">
                                <div className="mode-app text-yellow">
                                  <i>
                                    <FeatherIcon icon="video" />
                                  </i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="menu7" className="tab-pane">
                      <div className="appointment-items">
                        {/* <div className="app-user">
                          <div className="row">
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Dr. Lester </h6>
                                  <p>Orthopaedics</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Chris Harris</h6>
                                  <p>ID : 781212, M</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4">
                              <div className="float-end">
                                <div className="mode-app text-yellow">
                                  <i>
                                    <FeatherIcon icon="video" />
                                  </i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="appointment-items">
                        {/* <div className="app-user">
                          <div className="row">
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Dr. Lester </h6>
                                  <p>Orthopaedics</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Chris Harris</h6>
                                  <p>ID : 781212, M</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4"></div>
                          </div>
                        </div>
                      </div>
                      <div className="appointment-items">
                        {/* <div className="app-user">
                          <div className="row">
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Dr. Lester </h6>
                                  <p>Orthopaedics</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="app-img">
                                <Image src="" alt="" className="img-fluid" />
                                <div className="app-name">
                                  <h6>Chris Harris</h6>
                                  <p>ID : 781212, M</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="app-time">
                          <p>
                            <i className="me-1">
                              <FeatherIcon icon="clock" />
                            </i>{" "}
                            06:00pm - 06:20pm
                          </p>
                        </div>
                        <div className="app-infos">
                          <div className="row align-items-center">
                            <div className="col-4 col-sm-4">
                              <p>Duration</p>
                              <p className="mb-0">20 Min</p>
                            </div>
                            <div className="col-8 col-sm-4">
                              <p>Consultation Fee</p>
                              <h6>$30.00K</h6>
                            </div>
                            <div className="col-sm-4">
                              <div className="float-end">
                                <div className="mode-app text-yellow">
                                  <i>
                                    <FeatherIcon icon="video" />
                                  </i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Upcoming Appointments */}
          </div>
          <div className="row">
            {/* Recent Prescriptions */}
            <div className="col-xl-4 col-md-6">
              <div className="card recent-card">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title">Recent Prescriptions</h5>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive recent-tab">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>
                            <div className="pres-list">
                              <div className="pres-head">
                                <h6>Abacavir</h6>
                                <p>#8995447</p>
                              </div>
                              <div className="pres-body">
                                <div>
                                  <p>Prescribed By </p>
                                  <h6>Dr. Cullin Drew</h6>
                                </div>
                                <div>
                                  <p>Prescribed For</p>
                                  <h6>Amanda</h6>
                                </div>
                                <div>
                                  <p>Type </p>
                                  <h6 className="text-muted">One time</h6>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="pres-list">
                              <div className="pres-head">
                                <h6>Calcium</h6>
                                <p>#8799488</p>
                              </div>
                              <div className="pres-body">
                                <div>
                                  <p>Prescribed By </p>
                                  <h6>Dr. Mark Briffa</h6>
                                </div>
                                <div>
                                  <p>Prescribed For</p>
                                  <h6>Theiry</h6>
                                </div>
                                <div>
                                  <p>Type </p>
                                  <h6 className="text-muted">One time</h6>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="pres-list mb-0">
                              <div className="pres-head">
                                <h6>Abacavir</h6>
                                <p>#8995447</p>
                              </div>
                              <div className="pres-body">
                                <div>
                                  <p>Prescribed By </p>
                                  <h6>Dr. Linda</h6>
                                </div>
                                <div>
                                  <p>Prescribed For</p>
                                  <h6>Hendry</h6>
                                </div>
                                <div>
                                  <p>Type </p>
                                  <h6 className="text-muted">One time</h6>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /Recent Prescriptions */}
            {/* Top Countries */}
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">Top Countries</h5>
                    </div>
                    <div className="col-auto select-option">
                      <Select
                        className="select"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options1}
                        placeholder={"Patients"}
                        id="long-value-select"
                        instanceId="long-value-select"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="country-item">
                    <div className="con-name">
                      {/* <div className="flag-box">
                        <img
                          className="rounded-circle"
                          src=""
                          alt="User Image"
                        />
                      </div> */}
                      <div className="flag-name">
                        <p className="user-name">
                          <span>United States</span>{" "}
                          <span className="d-block text-muted">
                            800 Patients
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="con-revenue">
                      <p className="text-muted">Revenue</p>
                      <h6>$6000K</h6>
                    </div>
                  </div>
                  <div className="country-item">
                    <div className="con-name">
                      {/* <div className="flag-box">
                        <Image
                          className="rounded-circle"
                          src=""
                          alt="User Image"
                        />
                      </div> */}
                      <div className="flag-name">
                        <p className="user-name">
                          <span>United Kingdom</span>{" "}
                          <span className="d-block text-muted">
                            450 Patients
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="con-revenue">
                      <p className="text-muted">Revenue</p>
                      <h6>$4000K</h6>
                    </div>
                  </div>
                  <div className="country-item">
                    <div className="con-name">
                      {/* <div className="flag-box">
                        <Image
                          className="rounded-circle"
                          src=""
                          alt="User Image"
                        />
                      </div> */}
                      <div className="flag-name">
                        <p className="user-name">
                          <span>UAE</span>{" "}
                          <span className="d-block text-muted">
                            300 Patients
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="con-revenue">
                      <p className="text-muted">Revenue</p>
                      <h6>$3000K</h6>
                    </div>
                  </div>
                  <div className="country-item">
                    <div className="con-name">
                      {/* <div className="flag-box">
                        <Image
                          className="rounded-circle"
                          src=""
                          alt="User Image"
                        />
                      </div> */}
                      <div className="flag-name">
                        <p className="user-name">
                          <span>India</span>{" "}
                          <span className="d-block text-muted">
                            300 Patients
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="con-revenue">
                      <p className="text-muted">Revenue</p>
                      <h6>$3000K</h6>
                    </div>
                  </div>
                  <div className="country-item">
                    <div className="con-name">
                      {/* <div className="flag-box">
                        <Image
                          className="rounded-circle"
                          src=""
                          alt="User Image"
                        />
                      </div> */}
                      <div className="flag-name">
                        <p className="user-name">
                          <span>UAE</span>{" "}
                          <span className="d-block text-muted">
                            300 Patients
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="con-revenue">
                      <p className="text-muted">Revenue</p>
                      <h6>$3000K</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Top Countries */}
            {/* Doctor Ratings */}
            <div className="col-xl-4">
              <div className="row">
                <div className="col-sm-6 d-flex">
                  <div className="spl-items flex-fill">
                    <Link href="/admin/reviews">
                      <i>
                        <FeatherIcon icon="star" />
                      </i>
                      <h6>Doctor Ratings</h6>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 d-flex">
                  <div className="spl-items flex-fill">
                    <Link href="/admin/transactions-list">
                      <i>
                        <FeatherIcon icon="credit-card" />
                      </i>
                      <h6>Transactions</h6>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 d-flex">
                  <div className="spl-items flex-fill">
                    <Link href="/admin/settings">
                      <i>
                        <FeatherIcon icon="sliders" />
                      </i>
                      <h6>Settings</h6>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 d-flex">
                  <div className="spl-items flex-fill">
                    <Link href="/admin/appointment-list">
                      <i>
                        <FeatherIcon icon="calendar" />
                      </i>
                      <h6>Appointments</h6>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 d-flex">
                  <div className="spl-items flex-fill">
                    <Link href="/admin/specialities">
                      <i>
                        <FeatherIcon icon="package" />
                      </i>
                      <h6>Specialities</h6>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 d-flex">
                  <div className="spl-items flex-fill">
                    <Link href="/admin/patient-list">
                      <i>
                        <FeatherIcon icon="users" />
                      </i>
                      <h6>Patients</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* /Doctor Ratings */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};
export default Dashboard;
