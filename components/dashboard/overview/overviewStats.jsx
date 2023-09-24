import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import ExtraSmallLoader from "@/components/commonComponents/loading/extraSmallLoader";
import { eventsAccepted, payment, talking } from "@/components/commonComponents/imagepath";

const OverviewStats = ({ stats }) => {
  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-totalReq">
                <FeatherIcon icon="users" />
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
                <Image src={talking} alt="talking" />
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
                <Image src={payment} alt="waitingForPayment" />
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
                <Image src={eventsAccepted} alt="eventsAccepted" />
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

