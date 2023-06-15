"use client"; //This is a client component
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/css/style.css";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "components/loading/Loading";
import DoctorsListTable from "components/dashboard/doctors/doctorsListTable/doctorsListTable";
import AddDoctorModal from "components/dashboard/doctors/addDoctorModal/addDoctorModal";
import EditDoctorModel from "components/dashboard/doctors/editDoctorModal/editDoctorModal";
import DeleteDoctorModal from "components/dashboard/doctors/deleteDoctorsModal/deleteDoctorModal";
import { sort } from "components/imagepath";
let CenterID = Cookies.get("CenterID");

const DoctorsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);

  //get doctors list
  useEffect(() => {
    try {
      getDoctorData();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [specialty, setSpecialty] = useState("");

  // Add Physician
  const getDoctorData = () => {
    axios
      .get(
        `https://irannobat.ir:8444/api/CenterProfile/getCenterPhysician/${CenterID}`
      )
      .then(function (response) {
        setDoctorsList(response.data);
      });
  };
  const addPhysician = (e) => {
    e.preventDefault();
    axios
      .post(`https://irannobat.ir:8444/api/CenterProfile/AddPhysician`, {
        CenterID: CenterID,
        Name: name,
        Title: title,
        Spe: specialty,
      })
      .then((response) => {
        console.log(response.data);
        setDoctorsList([...doctorsList, response.data]);
        $("#addPhysicianModal").modal("hide");
        // document.getElementById("addPhysicianModel").reset();
        // reset values in input fields
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameInput = (e) => setName(e.target.value);
  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleSpecialtyInput = (e) => setSpecialty(e.target.value);

  // Edit Physician
  const editPhysician = () => {
    console.log("Edit");
  };

  // Delete Physician
  const deletePhysician = () => {
    console.log("Delete");
  };

  const [show1, setShow1] = useState(false);
  const toggleFilterMenu1 = () => setShow1(!show1);

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
                  data-bs-target="#addPhysicianModal"
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

          {/* <!-- Doctors List --> */}
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
                  data={doctorsList}
                  editDoctor={editPhysician}
                  deleteDoctor={deletePhysician}
                />
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
          {/* <!-- /Doctors List --> */}
        </div>
        <AddDoctorModal
          addPhysician={addPhysician}
          name={name}
          title={title}
          specialty={specialty}
          handleNameInput={handleNameInput}
          handleTitleInput={handleTitleInput}
          handleSpecialtyInput={handleSpecialtyInput}        
        />
        <EditDoctorModel />
        <DeleteDoctorModal />
      </div>
      {/* <!-- /Page Wrapper --> */}
      );
    </>
  );
};

export default DoctorsList;
