"use client"; //This is a client component
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/css/style.css";
import SelectField from "components/commonComponents/selectfield";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import Loading from "components/loading/Loading";
import axios from "axios";
import Cookies from "js-cookie";
import DoctorsListTable from "components/dashboard/doctorsListTable/doctorsListTable";
import {
  avatar02,
  product1,
  product2,
  product4,
  product5,
  sort,
} from "components/imagepath";

const DoctorsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doctorsListData, setDoctorsList] = useState([]);

  //get doctors list
  useEffect(() => {
    let CenterID = Cookies.get("CenterID");
    console.log(CenterID);
    setIsLoading(true);
    try {
      axios
        .get(
          `https://irannobat.ir:8444/api/CenterProfile/getCenterPhysician/${CenterID}`
        )
        .then(function (response) {
          setIsLoading(false);
          console.log(response.data);
          setDoctorsList(response.data);
        });
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  // Edit Physician
  const editPhysician = () => {
    console.log("Edit");
  };

  // Delete Physician
  const deletePhysician = () => {
    console.log("Delete")
  }

  const [show1, setShow1] = useState(false);
  const toggleFilterMenu1 = () => {
    console.log(show1);
    setShow1(!show1);
  };

  const [stateValue, setStateValue] = useState();

  return (
    <>
      {/* <!-- Page Wrapper --> */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* <!-- Page Header --> */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addproduct"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
              </div>
            </div>
          </div>
          {/* <!-- /Page Header --> */}

          {/* <!-- Product List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">لیست پزشکان</h5>
                    </div>
                    <div className="col-auto d-flex flex-wrap">
                      <div className="form-custom me-2">
                        <div
                          id="tableSearch"
                          className="dataTables_wrapper"
                        ></div>
                      </div>
                      <div className="SortBy">
                        <div className="selectBoxes order-by">
                          <p
                            className="mb-0"
                            onClick={(value) => toggleFilterMenu1()}
                          >
                            <Image src={sort} className="me-2" alt="icon" />
                            بر اساس
                          </p>
                          <span className="down-icon">
                            <i>
                              {" "}
                              <FeatherIcon icon="chevron-down" />
                            </i>
                          </span>
                        </div>
                        <div
                          id="checkBox"
                          style={{ display: show1 ? "block" : "none" }}
                        >
                          <form action="/admin/product-list">
                            <p className="lab-title"> بر اساس </p>
                            <label className="custom_radio w-100">
                              <input type="radio" name="sort" />
                              <span className="checkmark"></span> شماره شناسه
                            </label>
                            <label className="custom_radio w-100">
                              <input type="radio" name="sort" />
                              <span className="checkmark"></span> نام
                            </label>
                            <label className="custom_radio w-100 mb-4">
                              <input type="radio" name="sort" />
                              <span className="checkmark"></span> عنوان
                            </label>
                            <p className="lab-title"> ترتیب بر اساس</p>
                            <label className="custom_radio w-100">
                              <input type="radio" name="sort" />
                              <span className="checkmark"></span> صعودی
                            </label>
                            <label className="custom_radio w-100 mb-4">
                              <input type="radio" name="sort" />
                              <span className="checkmark"></span> نزولی
                            </label>
                            <button
                              type="submit"
                              className="btn w-100 btn-primary"
                            >
                              ثبت
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DoctorsListTable
                  data={doctorsListData}
                  editDoctor={editPhysician}
                  deleteDoctor={deletePhysician}
                />
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
          {/* <!-- /Product List --> */}
        </div>
      </div>
      {/* <!-- /Page Wrapper --> */}
      {/* <!-- Modal --> */}
      <div
        className="modal fade contentmodal"
        id="addproduct"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <h3 className="mb-0">اضافه کردن پزشک</h3>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i>
                  <FeatherIcon icon="x-circle" />
                </i>
              </button>
            </div>
            <div className="modal-body">
              <form action="/admin/pharmacy-list">
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      نام پزشک <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      تخصص <span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      عنوان <span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">
                      ثبت تغییرات
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Modal --> */}
      {/* <!-- Modal --> */}
      <div
        className="modal fade contentmodal"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <h3 className="mb-0">ویرایش اطلاعات </h3>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i>
                  <FeatherIcon icon="x-circle" />
                </i>
              </button>
            </div>
            <div className="modal-body">
              <form action="/admin/pharmacy-list">
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      نام پزشک <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      تخصص <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      عنوان <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">
                      ثبت تغییرات
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Modal --> */}
      {/* <!-- Modal --> */}
      <div
        className="modal fade contentmodal"
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header border-bottom-0 justify-content-end">
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <div className="del-icon">
                  <i>
                    <FeatherIcon icon="x-circle" />
                  </i>
                </div>
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-wrap text-center">
                <div className="del-icon">
                  <i className="delete-icon">
                    <FeatherIcon icon="x-circle" />
                  </i>
                </div>
                <h2>آیا اطمینان به حذف دارید؟</h2>
                <div className="submit-section">
                  <Link
                    href="/admin/pharmacy-list"
                    className="btn btn-success me-2"
                  >
                    بله
                  </Link>
                  <Link
                    href="#"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    خیر
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Modal --> */}
      );
    </>
  );
};

export default DoctorsList;
