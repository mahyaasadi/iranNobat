import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/loading";
import { ErrorAlert, SuccessAlert } from "class/AlertManage.js";

let CenterID = Cookies.get("CenterID");

export const getStaticProps = async () => {
  const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
  const Menus = await data.json();
  return { props: { Menus } };
};

const SmsPanelSettings = ({ Menus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [panelData, setPanelData] = useState([]);
  const [eye, setEye] = useState(true);

  const onEyeClick = () => setEye(!eye);

  const changeSmsPanelSettings = (e) => {
    e.preventDefault();

    let url = "Center/ChangeSmsPanelPassword";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      userName: formProps.smsPanelUserName,
      password: formProps.smsPanelPassword,
    };

    setIsLoading(true);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        SuccessAlert("موفق", "تغییر رمز عبور با موفقیت انجام شد!");
      })
      .catch((error) => console.log(error));
  };

  const getPanelData = () => {
    let url = "Sms/getCenterPanelData";
    let data = { CenterID };

    axiosClient
      .post(url, data)
      .then((response) => {
        setPanelData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPanelData();
  }, []);

  return (
    <>
      <Head>
        <title>تنظیمات پنل پیامک</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card smsCardContainer">
            <div className="card-body">
              <div className="col-11 col-sm-9 col-md-8 col-lg-7 col-xl-6 smsCard">
                <div className="card-body">
                  {/*  */}
                  <form id="smsSettings" onSubmit={changeSmsPanelSettings}>
                    <div className="form-group form-focus">
                      <div className="smsPanelTitle">تنظیمات پنل پیامک</div>
                      <hr className="margin-bottom-3 seperatorLine" />

                      <div className="input-group mb-4">
                        <label className="lblAbs font-12">نام کاربری</label>
                        <input
                          type="text"
                          name="smsPanelUserName"
                          required
                          className="form-control inputPadding rounded"
                          defaultValue={panelData.userName}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label className="lblAbs font-12">رمز عبور</label>
                        <input
                          type={eye ? "password" : "text"}
                          name="smsPanelPassword"
                          required
                          className="form-control inputPadding rounded"
                          defaultValue={panelData.Password}
                        />
                        <span
                          onClick={onEyeClick}
                          className={`fa toggle-password" ${
                            eye ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="submit-section">
                        <button
                          className="btn btn-primary btn-save w-100 rounded"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm margin-left-4"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          در حال پردازش
                        </button>
                      </div>
                    ) : (
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn btn-primary btn-save w-100 rounded"
                        >
                          ثبت
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SmsPanelSettings;
