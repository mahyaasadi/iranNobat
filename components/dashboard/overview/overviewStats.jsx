import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { eventsAccepted, payment, talking } from "components/imagePath";

const OverviewStats = ({ stats }) => {
  return (

    // total requests
    <div className="row">
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-totalReq">
                <FeatherIcon icon="users" />
              </span>
              <div className="dash-count">
                <h5 className="dash-title">تعداد درخواست ها</h5>
                <div className="dash-counts">
                  <p>{stats.Total}</p>
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
                <Image src={talking} alt="User Image" />
              </span>
              <div className="dash-count">
                <h5 className="dash-title">در حال مکالمه</h5>
                <div className="dash-counts">
                  <p>{stats.Talking}</p>
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
                <Image src={payment} alt="User Image" />
              </span>
              <div className="dash-count">
                <h5 className="dash-title">در انتظار پرداخت</h5>
                <div className="dash-counts">
                  <p>{stats.WaitingForPayment}</p>
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
                <Image src={eventsAccepted} alt="User Image" />
              </span>
              <div className="dash-count">
                <h5 className="dash-title">نوبت های داده شده</h5>
                <div className="dash-counts">
                  <p>{typeof(stats.TurnGiven) === undefined ? 0 : stats.TurnGiven}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default OverviewStats