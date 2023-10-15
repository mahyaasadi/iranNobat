import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import ExtraSmallLoader from "@/components/commonComponents/loading/extraSmallLoader";
import {
  eventsAccepted,
  payment,
  talking,
} from "@/components/commonComponents/imagepath";

const OverviewStats = ({ stats }) => {
  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-totalReq">
                {/* <FeatherIcon icon="users" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{ width: "30px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </span>
              <div className="dash-count mt-1">
                <h5 className="dash-title">تعداد درخواست ها</h5>
                <div className="dash-counts">
                  <p>
                    {stats.Total === undefined ? (
                      <ExtraSmallLoader />
                    ) : (
                      stats.Total.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* talking */}
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-talking">
                {/* <Image src={talking} alt="talking" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{ width: "30px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </span>
              <div className="dash-count">
                <h5 className="dash-title">در حال مکالمه</h5>
                <div className="dash-counts mt-1">
                  <p>
                    {stats.Talking === undefined ? (
                      <ExtraSmallLoader />
                    ) : (
                      stats.Talking.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* waiting for payment */}
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-waiting">
                {/* <Image src={payment} alt="waitingForPayment" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{ width: "30px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </span>
              <div className="dash-count">
                <h5 className="dash-title">در انتظار پرداخت</h5>
                <div className="dash-counts mt-1">
                  <p>
                    {stats.WaitingForPayment === undefined ? (
                      <ExtraSmallLoader />
                    ) : (
                      stats.WaitingForPayment.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* turnGiven */}
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-turnGiven">
                {/* <Image src={eventsAccepted} alt="eventsAccepted" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{ width: "30px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </span>
              <div className="dash-count">
                <h5 className="dash-title">نوبت های داده شده</h5>
                <div className="dash-counts mt-1">
                  <p>
                    {stats.TurnGiven === undefined ? (
                      <ExtraSmallLoader />
                    ) : (
                      stats.TurnGiven.toLocaleString()
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;

