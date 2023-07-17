import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/loading";

const SmsPanelSettings = () => {
  return (
    <>
      <Head>
        <title>تنظیمات پنل پیامک</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card col-6 smsCard">
            <div className="card-body">
              <form id="">
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <div className="">تنظیمات پنل پیامک</div>
                    <hr className="margin-bottom-" />
                    <div className="input-group mb-3">
                      <label className="lblAbs font-12">نام کاربری</label>
                      <input
                        type="text"
                        name="nationalCode"
                        required
                        className="form-control rounded GetPatientInput w-25"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <label className="lblAbs font-12">رمز عبور</label>
                      <input
                        type="text"
                        name="nationalCode"
                        required
                        className="form-control rounded GetPatientInput w-25"
                      />
                    </div>
                  </div>

                  <div className="submit-section">
                    <button
                      type="submit"
                      className="btn btn-primary btn-save w-100 rounded"
                    >
                      ثبت
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SmsPanelSettings;
