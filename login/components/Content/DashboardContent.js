"use client"; //This is a client component
import "components/Header/Header"
import "components/Sidebar/Sidebar"
import Image from "next/image";
import doctorThumb from "src/assets/img/doctors/doctor-thumb-01.jpg";
import doctorThumb2 from "src/assets/img/doctors/doctor-thumb-02.jpg";
import doctorThumb3 from "src/assets/img/doctors/doctor-thumb-03.jpg";
import doctorThumb4 from "src/assets/img/doctors/doctor-thumb-04.jpg";
import doctorThumb5 from "src/assets/img/doctors/doctor-thumb-05.jpg";
import randomPatient from "src/assets/img/patients/patient1.jpg";
import randomPatient2 from "src/assets/img/patients/patient2.jpg";
import "src/assets/css/bootstrap.rtl.min.css";
import "src/assets/css/font-awesome.min.css";
import "src/assets/css/feathericon.min.css";
import "src/assets/plugins/morris/morris.css";
import "src/assets/css/style.css";
import Sidebar from "components/Sidebar/Sidebar";

const DashboardContent = () => {
  return (
    // <!-- Page Wrapper -->
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* <!-- Page Header --> */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome Admin!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>

          {/* <!-- /Page Header --> */}

          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="dash-widget-header">
                    <span className="dash-widget-icon text-primary border-primary">
                      <i className="fe fe-users"></i>
                    </span>
                    <div className="dash-count">
                      <h3>168</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Doctors</h6>
                    <div className="progress progress-sm">
                      <div className="progress-bar bg-primary w-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="dash-widget-header">
                    <span className="dash-widget-icon text-success">
                      <i className="fe fe-credit-card"></i>
                    </span>
                    <div className="dash-count">
                      <h3>487</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Patients</h6>
                    <div className="progress progress-sm">
                      <div className="progress-bar bg-success w-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-danger border-danger">
                    <i className="fe fe-money"></i>
                  </span>
                  <div className="dash-count">
                    <h3>485</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Appointment</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-danger w-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-warning border-warning">
                    <i className="fe fe-folder"></i>
                  </span>
                  <div className="dash-count">
                    <h3>$62523</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Revenue</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-warning w-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            {/* <!-- Sales Chart --> */}
            <div className="card card-chart">
              <div className="card-header">
                <h4 className="card-title">Revenue</h4>
              </div>
              <div className="card-body">
                <div id="morrisArea"></div>
              </div>
            </div>
            {/* <!-- /Sales Chart --> */}
          </div>
          <div className="col-md-12 col-lg-6">
            {/* <!-- Invoice Chart --> */}
            <div className="card card-chart">
              <div className="card-header">
                <h4 className="card-title">Status</h4>
              </div>
              <div className="card-body">
                <div id="morrisLine"></div>
              </div>
            </div>
            {/* <!-- /Invoice Chart --> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex">
            {/* <!-- Recent Orders --> */}
            <div className="card card-table flex-fill">
              <div className="card-header">
                <h4 className="card-title">Doctors List</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Doctor Name</th>
                        <th>Speciality</th>
                        <th>Earned</th>
                        <th>Reviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={doctorThumb}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Dr. Ruby Perrin</a>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>$3200.00</td>
                        <td>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star-o text-secondary"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={doctorThumb2}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Dr. Darren Elder</a>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>$3100.00</td>
                        <td>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star-o text-secondary"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={doctorThumb3}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Dr. Deborah Angel</a>
                          </h2>
                        </td>
                        <td>Cardiology</td>
                        <td>$4000.00</td>
                        <td>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star-o text-secondary"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={doctorThumb4}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Dr. Sofia Brient</a>
                          </h2>
                        </td>
                        <td>Urology</td>
                        <td>$3200.00</td>
                        <td>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star-o text-secondary"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={doctorThumb5}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Dr. Marvin Campbell</a>
                          </h2>
                        </td>
                        <td>Orthopaedics</td>
                        <td>$3500.00</td>
                        <td>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star text-warning"></i>
                          <i className="fe fe-star-o text-secondary"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <!-- /Recent Orders --> */}
          </div>
        </div>

        <div className="col-md-6 d-flex">
          {/* <!-- Feed Activity --> */}
          <div className="card  card-table flex-fill">
            <div className="card-header">
              <h4 className="card-title">Patients List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Phone</th>
                      <th>Last Visit</th>
                      <th>Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h2 className="table-avatar">
                          <a
                            href="profile.html"
                            className="avatar avatar-sm me-2"
                          >
                            <Image
                              className="avatar-img rounded-circle"
                              src={randomPatient}
                              alt="User Image"
                              width="30"
                              height="30"
                            />
                          </a>
                          <a href="profile.html">Charlene Reed </a>
                        </h2>
                      </td>
                      <td>8286329170</td>
                      <td>20 Oct 2019</td>
                      <td className="text-end">$100.00</td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className="table-avatar">
                          <a
                            href="profile.html"
                            className="avatar avatar-sm me-2"
                          >
                            <Image
                              className="avatar-img rounded-circle"
                              src={randomPatient2}
                              alt="User Image"
                              width="30"
                              height="30"
                            />
                          </a>
                          <a href="profile.html">Travis Trimble</a>
                        </h2>
                      </td>
                      <td>2077299974</td>
                      <td>22 Oct 2019</td>
                      <td className="text-end">$200.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <!-- /Feed Activity --> */}
        </div>

        <div className="row">
          <div className="col-md-12">
            {/* <!-- Recent Orders --> */}
            <div className="card card-table">
              <div className="card-header">
                <h4 className="card-title">Appointment List</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Doctor Name</th>
                        <th>Speciality</th>
                        <th>Patient Name</th>
                        <th>Apointment Time</th>
                        <th>Status</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={doctorThumb}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Dr. Ruby Perrin</a>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={randomPatient}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Charlene Reed </a>
                          </h2>
                        </td>
                        <td>
                          9 Nov 2019{" "}
                          <span className="text-primary d-block">
                            11.00 AM - 11.15 AM
                          </span>
                        </td>
                        <td>
                          <div className="status-toggle">
                            <input
                              type="checkbox"
                              id="status_1"
                              className="check"
                              checked
                            ></input>
                            <label for="status_1" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="text-end">$200.00</td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={doctorThumb2}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Dr. Darren Elder</a>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="profile.html"
                              className="avatar avatar-sm me-2"
                            >
                              <Image
                                className="avatar-img rounded-circle"
                                src={randomPatient2}
                                alt="User Image"
                                width="30"
                                height="30"
                              />
                            </a>
                            <a href="profile.html">Travis Trimble </a>
                          </h2>
                        </td>

                        <td>
                          5 Nov 2019{" "}
                          <span className="text-primary d-block">
                            11.00 AM - 11.35 AM
                          </span>
                        </td>
                        <td>
                          <div className="status-toggle">
                            <input
                              type="checkbox"
                              id="status_2"
                              className="check"
                              checked
                            ></input>
                            <label for="status_2" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="text-end">$300.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <!-- /Recent Orders --> */}
          </div>
        </div>
      </div>
    </div>
  );
};



export default DashboardContent;