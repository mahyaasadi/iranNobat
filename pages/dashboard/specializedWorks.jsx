"use client"; //This is a client component
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { sort } from "components/imagepath";
import Loading from "components/loading/Loading";
import SpecializedWorksListTable from "components/dashboard/specializedWorks/specializedWorksListTable";
import AddSpeWorkModal from "components/dashboard/specializedWorks/addspeWorkModal/addSpeWorkModal";
import EditSpeWorkModal from "components/dashboard/specializedWorks/editSpeWorkModal/editSpeWorkModal";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/css/style.css";

let CenterID = Cookies.get("CenterID");

const SpecializedWorks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show1, setShow1] = useState(false);
  const [speWorks, setSpeWorks] = useState([]);
  const [editSpeWork, setEditSpeWork] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [engName, setEngName] = useState("");

  const handleNameInput = (e) => setName(e.target.value);
  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleEngNameInput = (e) => setEngName(e.target.value);

  const toggleFilterMenu1 = () => setShow1(!show1);

  //reset form inputs
  const reset = () => {
    setName("");
    setTitle("");
    setEngName("");
  };

  //get specializedWorks list
  const getSpecializedWorks = () => {
    axios
      .get(
        `https://irannobat.ir:8444/api/CenterProfile/getCenterSpecializedWorks/${CenterID}`
      )
      .then(function (response) {
        setSpeWorks(response.data);
        setIsLoading(false);
        console.log(response.data);
      });
  };

  useEffect(() => {
    try {
      getSpecializedWorks();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  // Add SpeWork
  const addSpeWork = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterProfile/AddSpecializedWorks";
    let data = {
      CenterID: CenterID,
      Name: name,
      Title: title,
      EngName: engName,
    };

    axios
      .post(url, data)
      .then((response) => {
        setSpeWorks([...speWorks, response.data]);
        $("#addSpeWorkModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit SpeWorks
  const editSpeWorks = (e) => {
    e.preventDefault();

    let url =
      "https://irannobat.ir:8444/api/CenterProfile/UpdateSpecializedWorks";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let Data = {
      CenterID: CenterID,
      SpecializedWorksID: formProps.EditSpeWorkID,
      Name: formProps.EditSpeWorkName,
      Title: formProps.EditSpeWorkTitle,
      EngName: formProps.EditSpeWorkEngName,
    };
    console.log(Data);
    axios
      .put(url, Data)
      .then((response) => {
        console.log(response.data);
        updateItem(formProps.EditSpeWorkID, response.data);
        $("#editSpeWorkModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateItem = (id, newArr) => {
    let index = speWorks.findIndex((x) => x._id === id);

    let g = speWorks[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setSpeWorks([
        ...speWorks.slice(0, index),
        g,
        ...speWorks.slice(index + 1),
      ]);
  };

  const updateSpeWork = (data) => {
    setEditSpeWork(data);
  };

  // Delete SpeWork
  const deleteSpeWork = (id) => {
    Swal.fire({
      title: "حذف کار تخصصی !",
      text: "آیا از حذف کار تخصصی مطمئن هستید",
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
          SpecializedWorksID: id,
        };
        let url =
          "https://irannobat.ir:8444/api/CenterProfile/DeleteSpecializedWorks";
        axios
          .delete(url, { data })
          .then(function (response) {
            setSpeWorks(speWorks.filter((a) => a._id !== id));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

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
                  data-bs-target="#addSpeWorkModal"
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

          {/* <!-- SpeWorks List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">لیست کارهای تخصصی مرکز</h5>
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
                            <Image src={sort} className="me-2" alt="icon" /> بر
                            اساس
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
                              اعمال
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
                  <SpecializedWorksListTable
                    data={speWorks}
                    deleteSpeWork={deleteSpeWork}
                    updateSpeWork={updateSpeWork}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
          {/* <!-- /SpeWorks List --> */}
        </div>

        <AddSpeWorkModal
          name={name}
          title={title}
          engName={engName}
          handleNameInput={handleNameInput}
          handleTitleInput={handleTitleInput}
          handleEngNameInput={handleEngNameInput}
          addSpeWork={addSpeWork}
        />

        <EditSpeWorkModal
          name={name}
          title={title}
          engName={engName}
          data={editSpeWork}
          editSpeWorks={editSpeWorks}
          handleNameInput={handleNameInput}
          handleTitleInput={handleTitleInput}
          handleEngNameInput={handleEngNameInput}
        />
      </div>
      {/* <!-- /Modal --> */}
    </>
  );
};
export default SpecializedWorks;
