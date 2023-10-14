"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { axiosClient } from "class/axiosConfig.js";
import { ErrorAlert } from "class/AlertManage.js";
import { setSession } from "@/lib/SessionMange";
import { logo } from "@/components/commonComponents/imagepath";
import Loading from "components/commonComponents/loading/loading";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feather.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/select2.min.css";
import "public/assets/css/style.css";

const Login = (req, res) => {
  const router = useRouter();

  const { control, register, watch } = useForm();
  const rememberMe = watch("rememberMe");
  const [isLoading, setIsLoading] = useState(false);
  const [eye, setEye] = useState(true);

  const onEyeClick = () => setEye(!eye);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axiosClient
      .post("AdminUser/loginUser", {
        UserName: document.getElementById("UserName").value,
        Password: document.getElementById("Password").value,
      })
      .then(async function (response) {
        setIsLoading(false);

        let roles = response.data.roles;
        response.data.roles = null;
        const session = response.data;

        let expirationPeriod = rememberMe
          ? 7 * 24 * 60 * 1800
          : 7 * 24 * 60 * 60;

        let rolesSession = await setSession(roles);
        Cookies.set("roles", rolesSession, { expires: expirationPeriod });

        let resSession = await setSession(session);
        Cookies.set("session", resSession, { expires: expirationPeriod });

        if (!resSession && !rolesSession) {
          router.push("/");
        }
        router.push("/dashboard");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
        error.message == "Network Error"
          ? ErrorAlert("خطا", "در حال حاضر ارتباط با سرور برقرار نیست!")
          : ErrorAlert("خطا", "اطلاعات اشتباه وارد شده است!");
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row loginBg p-0 d-flex align-items-center">
          <div className="col-md-6 login-bg p-0">
            <div className="login-banner">
              <Image
                src={logo}
                alt="login-banner"
                unoptimized={true}
                priority={true}
              />
            </div>
          </div>
          <div className="col-md-6 login-wrap-bg">
            <div className="login-page">
              <div className="login-wrapper">
                <div className="loginbox">
                  <h3 className="loginTitle stretch">ایران نوبت</h3>
                  <p className="account-subtitle">دسترسی به داشبورد</p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group form-focus">
                      <Controller
                        control={control}
                        name="UserName"
                        render={({ field: { value, onChange } }) => (
                          <input
                            className="form-control floating"
                            type="text"
                            id="UserName"
                            name="UserName"
                            autoComplete="false"
                            placeholder="نام کاربری"
                            required
                          />
                        )}
                      />
                    </div>
                    <div className="form-group form-focus">
                      <Controller
                        control={control}
                        name="password"
                        render={({ field: { value, onChange } }) => (
                          <div className="pass-group">
                            <input
                              className="form-control floating"
                              type={eye ? "password" : "text"}
                              autoComplete="false"
                              placeholder="رمز عبور"
                              id="Password"
                              required
                            />
                            <span
                              onClick={onEyeClick}
                              className={`fa toggle-password" ${
                                eye ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-6">
                          <label className="custom_check mr-2 mb-0 d-inline-flex">
                            مرا به خاطر داشته باش
                            <input
                              type="checkbox"
                              {...register("rememberMe")}
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="col-6 text-end">
                          <div className="forgot-link">
                            <div>فراموشی رمز ؟</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary loginBtn"
                        type="submit"
                      >
                        ورود
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
