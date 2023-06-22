import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { calender, chart } from "components/imagePath";

const OverviewStats = ({
    getTodayStats,
    getLastWeekStats,
    getThisMonthStats,
    talkingValue,
    totalReq,
    turnGivenValue,
    WaitingForPaymentValue,
    todayData,
    lastWeekData,
    thisMonthData
}) => {

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
                  <p>{todayData.Total}</p>
                </div>
              </div>
            </div>
            <p className="trade-level mb-0">
              هفته گذشته
            </p>
          </div>
        </div>
      </div>

      {/* talking */}
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-talking">
                
              </span>
              <div className="dash-count">
                <h5 className="dash-title">در حال مکالمه</h5>
                <div className="dash-counts">
                  <p>{todayData.Talking}</p>
                </div>
              </div>
            </div>
            <p className="trade-level mb-0">
              هفته گذشته
            </p>
          </div>
        </div>
      </div>

    {/* waiting for payment */}
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-waiting">
                <Image src={chart} alt="User Image" />
              </span>
              <div className="dash-count">
                <h5 className="dash-title">در انتظار پرداخت</h5>
                <div className="dash-counts">
                  <p>62523</p>
                </div>
              </div>
            </div>
            <p className="trade-level mb-0">
              هفته گذشته
            </p>
          </div>
        </div>
      </div>

      {/* turnGiven */}
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-turnGiven">
                <Image src={calender} alt="User Image" />
              </span>
              <div className="dash-count">
                <h5 className="dash-title">نوبت های داده شده</h5>
                <div className="dash-counts">
                  <p>4500</p>
                </div>
              </div>
            </div>
            <p className="trade-level mb-0">
              هفته گذشته
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
export default OverviewStats
