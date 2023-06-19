"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "components/loading/Loading";
import Logo from "public/assets/img/irannobatLogo.png";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feather.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/select2.min.css";
import "public/assets/css/style.css";

const MySwal = withReactContent(Swal);

const Login = () => {
  const { control } = useForm();
  const router = useRouter();
  const [eye, setEye] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const onEyeClick = () => setEye(!eye);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(isLoading);

    await axios
      .post("https://irannobat.ir:8444/api/AdminUser/Login", {
        UserName: document.getElementById("UserName").value,
        Password: document.getElementById("Password").value,
      })
      .then(function (response) {
        setIsLoading(!isLoading);
        sessionStorage.setItem(
          "SEID",
          JSON.stringify(response.data.UserSecretKey)
        );
        router.push("/dashboard");
      })
      .catch(function (error) {
        setIsLoading(isLoading);
        console.log(error);
        MySwal.fire({
          title: "اطلاعات اشتباه وارد شده است",
          confirmButtonText: "بازگشت",
          confirmButtonColor: "#802d38",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: true,
        });
      });
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="row">
        {/* Login Banner */}
        <div className="col-md-6 login-bg">
          <div className="login-banner">
            <Image
              src={Logo}
              alt="login-banner"
              unoptimized={true}
              priority={true}
            />
          </div>
        </div>
        {/* /Login Banner */}

        <div className="col-md-6 login-wrap-bg">
          {/* Login */}
          <div className="login-page">
            <div className="login-wrapper">
              <div className="loginbox">
                <h3>ورود</h3>
                <p className="account-subtitle">دسترسی به داشبورد</p>
                {!setIsLoading ? (
                  <Loading />
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group form-focus">
                      {/* <Controller
                        control={control}
                        name="UserName"
                        render={({ field: { value, onChange } }) => ( */}
                      <input
                        className="form-control floating"
                        type="text"
                        id="UserName"
                        name="UserName"
                        autoComplete="false"
                        placeholder="نام کاربری"
                        required
                      />
                      {/* )}
                      /> */}
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
                            {" "}
                            مرا به خاطر داشته باش
                            <input type="checkbox" name="radio" />
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
                      <button className="btn btn-primary" type="submit">
                        ورود
                      </button>
                    </div>
                    <div className="dont-have">حساب ندارید ؟ </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
