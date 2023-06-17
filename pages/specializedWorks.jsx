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
import { sort } from "components/imagepath";
import Swal from "sweetalert2";

let CenterID = Cookies.get("CenterID");

const SpecializedWorks = () => {
  const [isLoading, setIsLoading] = useState(true);
  let [doctorsList, setDoctorsList] = useState([]);
  const [editDoctor, setEditDoctor] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleNameInput = (e) => setName(e.target.value);
  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleSpecialtyInput = (e) => setSpecialty(e.target.value);

  //reset form inputs
  const reset = (e) => {
    setName("");
    setTitle("");
    setSpecialty("");
  };

  //get doctors list
  const getDoctorsData = () => {
    axios
      .get(
        `https://irannobat.ir:8444/api/CenterProfile/getCenterPhysician/${CenterID}`
      )
      .then(function (response) {
        setDoctorsList(response.data);
        setIsLoading(false);
        console.log(response.data);
      });
  };

  useEffect(() => {
    try {
      getDoctorsData();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  // Add Physician
  const addPhysician = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterProfile/AddPhysician";
    let data = {
      CenterID: CenterID,
      Name: name,
      Title: title,
      Spe: specialty,
    };

    axios
      .post(url, data)
      .then((response) => {
        setDoctorsList([...doctorsList, response.data]);
        $("#addPhysicianModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit Physician
  const editPhysician = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterProfile/UpdatePhysician";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let Data = {
      CenterID: CenterID,
      PhysicianID: formProps.EditDoctorID,
      Name: formProps.EditDoctorName,
      Title: formProps.EditDoctorTitle,
      Spe: formProps.EditDoctorSpe,
    };
      console.log(Data)
    axios
      .put(url, Data)
      .then((response) => {
        console.log(response.data);
        updateItem(formProps.EditDoctorID,response.data)

        $("#editPhysicianModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
const updateItem =(id, newArr)=> {
    var index = doctorsList.findIndex(x=> x._id === id);

    let g = doctorsList[index]
    g = newArr
    if (index === -1){
      // handle error
      console.log('no match')
    }
    else
      setDoctorsList([
        ...doctorsList.slice(0,index),
        g,
        ...doctorsList.slice(index+1)
      ]
  );
  }

  const updatePhysician = (data) => {
    setEditDoctor(data);
  };

  // Delete Physician
  const deletePhysician = (id) => {
    Swal.fire({
      title: "حذف پزشک !",
      text: "آیا از حذف پزشک مطمئن هستید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          CenterID: CenterID,
          PhysicianID: id,
        };
        let url = "https://irannobat.ir:8444/api/CenterProfile/DeletePhysician";
        axios
          .delete(url, { data })
          .then(function (response) {
            setDoctorsList(doctorsList.filter((a) => a._id !== id));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const [show1, setShow1] = useState(false);
  const toggleFilterMenu1 = () => setShow1(!show1);

  return (
    <>
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

                {isLoading ? (
                  <Loading />
                ) : (
                  <SpecializedWorksListTable/>
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
          {/* <!-- /Doctors List --> */}
        </div>
      </div>
      );
    </>
  );
};

export default SpecializedWorks;
