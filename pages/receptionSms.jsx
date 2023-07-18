import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/loading";
import ExtraSmallLoader from "components/loading/extraSmallLoader";
import { ErrorAlert, SuccessAlert } from "class/AlertManage.js";
import SendMessagesListTable from "components/dashboard/receptionSms/sendMessagesListTable";

let CenterID = Cookies.get("CenterID");

const ReceptionSms = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [creditIsLoading, setCreditIsLoading] = useState(true);
  const [sendMessages, setSendMessages] = useState([]);
  const [remainingCredit, setRemainingCredit] = useState([]);

  // get remaining credit
  const getPanelCredit = () => {
    let url = "Sms/getCredit";
    let data = { CenterID };
    setCreditIsLoading(true);

    axiosClient
      .post(url, data)
      .then((response) => {
        setRemainingCredit(parseInt(response.data[1]));
        setCreditIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setCreditIsLoading(false);
      });
  };

  const getSendMessages = () => {
    let url = "Sms/getCenterSendMessage";
    let data = { CenterID };
    setIsLoading(true);

    axiosClient
      .post(url, data)
      .then((response) => {
        // console.log("sendMessages", response.data);
        setSendMessages(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const checkMessageDelivery = (id) => {
    let url = "Sms/Delivery";
    let data = {
      CenterID,
      uniqID: id,
    };

    setIsLoading(true);
    axiosClient
      .post(url, data)
      .then((response) => {
        let arr = JSON.parse(response.data[1]);
        let msg = arr[0].split(":");
        SuccessAlert("وضعیت ارسال", "ارسال شده به شماره  " + msg[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPanelCredit();
    getSendMessages();
  }, []);

  return (
    <>
      <Head>
        <title>ارسال پیامک</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header d-flex justify-between receptionSmsHeader">
            <div className="creditBox col-xxl-3 col-xl-4 col-md-5 col-8 gap-2">
              اعتبار باقیمانده پیامک :
              {creditIsLoading ? (
                <ExtraSmallLoader />
              ) : (
                <div>{remainingCredit.toLocaleString()} ریال</div>
              )}
            </div>

            <div className="btn btn-primary font-14 col-xxl-2 col-xl-3 col-md-4 col-8">
              راهنمایی دریافت نوبت
            </div>
          </div>

          {/* send Messages List */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                {isLoading ? (
                  <Loading />
                ) : (
                  <SendMessagesListTable
                    data={sendMessages}
                    checkMessageDelivery={checkMessageDelivery}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReceptionSms;
