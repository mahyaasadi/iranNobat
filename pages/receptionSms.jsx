import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import { SuccessAlert } from "class/AlertManage.js";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/commonComponents/loading/loading";
import ExtraSmallLoader from "components/commonComponents/loading/extraSmallLoader";
import SendMessagesListTable from "components/dashboard/receptionSms/sendMessagesListTable";

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
        destination: `/`,
      },
    };
  }
};

let CenterID = null;
const ReceptionSms = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [creditIsLoading, setCreditIsLoading] = useState(true);
  const [sendMessages, setSendMessages] = useState([]);
  const [remainingCredit, setRemainingCredit] = useState([]);

  // get remaining credit
  const getPanelCredit = () => {
    setCreditIsLoading(true);

    let url = "Sms/getCredit";
    let data = { CenterID };

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
    setIsLoading(true);
    let url = "Sms/getCenterSendMessage";
    let data = { CenterID };

    axiosClient
      .post(url, data)
      .then((response) => {
        setSendMessages(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const checkMessageDelivery = (id) => {
    setIsLoading(true);

    let url = "Sms/Delivery";
    let data = {
      CenterID,
      uniqID: id,
    };

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceptionSms;
