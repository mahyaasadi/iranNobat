import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/loading/loading";
import SpecialDiseasesListTable from "components/dashboard/specialDiseases/specialDiseasesListTable";
import AddSpecialDiseaseModal from "components/dashboard/specialDiseases/addSpecialDiseaseModal";
import EditSpecialDiseaseModal from "components/dashboard/specialDiseases/editSpecialDiseaseModal";
import { getMenusData } from "class/getAllMenus.js";

let CenterID = Cookies.get("CenterID");

export const getStaticProps = async () => {
  const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
  const Menus = await data.json();
  // const Menus = (await getMenusData()) ? getMenusData() : null;
  // const Menus = JSON.stringify(MenusData);
  return { props: { Menus } };
};

const SpecialDiseases = ({ Menus }) => {
  const [diseasesList, setDiseasesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedDisease, setEditedDisease] = useState([]);

  // get diseases list
  const getDiseasesData = () => {
    axiosClient
      .get(`Center/getSpecialDiseases/${CenterID}`)
      .then(function (response) {
        console.log(response.data);
        setDiseasesList(response.data);
        setIsLoading(false);
      });
  };

  // add new disease
  const addDisease = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "Center/addSpecialDiseases";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      CenterID: CenterID,
      Name: formProps.diseaseName,
      EngName: formProps.diseaseEngName,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setDiseasesList([...diseasesList, response.data]);
        $("#addSpecialDiseaseModal").modal("hide");
        setIsLoading(false);
        $("#myFrm")[0].reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // edit disease
  const editDisease = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "Center/EditSpecialDiseases";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      CenterID: CenterID,
      SDID: formProps.diseaseId,
      Name: formProps.editDiseaseName,
      EngName: formProps.editDiseaseEngName,
    };

    console.log("data", data);
    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        updateItem(formProps.diseaseId, response.data);
        $("#editSpecialDiseaseModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateItem = (id, newArr) => {
    let index = diseasesList.findIndex((x) => x._id === id);

    let g = diseasesList[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setDiseasesList([
        ...diseasesList.slice(0, index),
        g,
        ...diseasesList.slice(index + 1),
      ]);
  };

  const updateDisease = (data) => {
    setEditedDisease(data);
    $("#editSpecialDiseaseModal").modal("show");
  };

  // delete disease
  const deleteDisease = async (id) => {
    let result = await QuestionAlert(
      "حذف بیماری !",
      "آیا از حذف بیماری خاص اطمینان دارید؟"
    );
    setIsLoading(true);

    if (result) {
      let url = "Center/DeleteSpecialDiseases";
      let data = {
        CenterID: CenterID,
        SDID: id,
      };

      console.log("data", data);

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setDiseasesList(diseasesList.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    try {
      getDiseasesData();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  return (
    <>
      <Head>
        <title>بیماری های خاص</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addSpecialDiseaseModal"
                  className="btn btn-primary btn-add font-14 media-font-12"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title font-16">
                        لیست بیماری های خاص
                      </h5>
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
                <SpecialDiseasesListTable
                  data={diseasesList}
                  updateDisease={updateDisease}
                  deleteDisease={deleteDisease}
                />
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddSpecialDiseaseModal addDisease={addDisease} />

        <EditSpecialDiseaseModal
          data={editedDisease}
          editDisease={editDisease}
        />
      </div>
    </>
  );
};

export default SpecialDiseases;
