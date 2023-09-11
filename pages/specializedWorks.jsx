import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/loading/loading";
import SpecializedWorksListTable from "components/dashboard/specializedWorks/specializedWorksListTable";
import AddSpeWorkModal from "components/dashboard/specializedWorks/addspeWorkModal";
import EditSpeWorkModal from "components/dashboard/specializedWorks/editSpeWorkModal";
import { getMenusData } from "class/getAllMenus.js";

let CenterID = Cookies.get("CenterID");

export const getStaticProps = async () => {
  const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
  const Menus = await data.json();
  return { props: { Menus } };
};

const SpecializedWorks = ({ Menus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [speWorks, setSpeWorks] = useState([]);
  const [editSpeWork, setEditSpeWork] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [engName, setEngName] = useState("");

  const handleNameInput = (e) => setName(e.target.value);
  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleEngNameInput = (e) => setEngName(e.target.value);

  //reset form inputs
  const reset = () => {
    setName("");
    setTitle("");
    setEngName("");
  };

  //get specializedWorks list
  const getSpecializedWorks = () => {
    axiosClient
      .get(`CenterProfile/getCenterSpecializedWorks/${CenterID}`)
      .then(function (response) {
        setSpeWorks(response.data);
        setIsLoading(false);
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

    let url = "CenterProfile/AddSpecializedWorks";
    let data = {
      CenterID: CenterID,
      Name: name,
      Title: title,
      EngName: engName,
    };

    axiosClient
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

    let url = "CenterProfile/UpdateSpecializedWorks";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let Data = {
      CenterID: CenterID,
      SpecializedWorksID: formProps.EditSpeWorkID,
      Name: formProps.EditSpeWorkName,
      Title: formProps.EditSpeWorkTitle,
      EngName: formProps.EditSpeWorkEngName,
    };

    axiosClient
      .put(url, Data)
      .then((response) => {
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
    $("#editSpeWorkModal").modal("show");
  };

  // Delete SpeWork
  const deleteSpeWork = async (id) => {
    let result = await QuestionAlert(
      "حذف کار تخصصی !",
      "آیا از حذف کار تخصصی مطمئن هستید"
    );

    if (result) {
      let url = "CenterProfile/DeleteSpecializedWorks";
      let data = {
        CenterID: CenterID,
        SpecializedWorksID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function (response) {
          setSpeWorks(speWorks.filter((a) => a._id !== id));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Head>
        <title>کارهای تخصصی مرکز</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end">
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#addSpeWorkModal"
                    className="btn btn-primary btn-add font-14"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    اضافه کردن
                  </Link>
                </div>
              </div>
            </div>

            {/* <!-- SpeWorks List --> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <p className="card-title font-16">
                          لیست کارهای تخصصی مرکز
                        </p>
                      </div>
                      <div className="col-auto d-flex flex-wrap">
                        <div className="form-custom me-2">
                          <div
                            id="tableSearch"
                            className="dataTables_wrapper"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <SpecializedWorksListTable
                    data={speWorks}
                    deleteSpeWork={deleteSpeWork}
                    updateSpeWork={updateSpeWork}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

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
    </>
  );
};
export default SpecializedWorks;
