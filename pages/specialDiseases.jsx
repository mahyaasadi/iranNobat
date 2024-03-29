import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import SpecialDiseasesListTable from "components/dashboard/specialDiseases/specialDiseasesListTable";
import SpecialDiseasesModal from "@/components/dashboard/specialDiseases/specialDiseasesModal";

export const getServerSideProps = async ({ req, res }) => {
  const result = await getSession(req, res);

  if (result) {
    const { UserData, UserRoles } = result;
    const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
    const Menus = await data.json();
    return { props: { Menus, UserData, UserRoles } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

let CenterID = null;
const SpecialDiseases = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [diseasesList, setDiseasesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editDiseaseData, setEditDiseaseData] = useState([]);
  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // get diseases list
  const getDiseasesData = () => {
    setIsLoading(true);
    let url = `Center/getSpecialDiseases/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        setDiseasesList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoading(false);
      });
  };

  // add new disease
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true)
  };

  const addDisease = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Center/addSpecialDiseases";
    let data = {
      CenterID: CenterID,
      Name: formProps.diseaseName,
      EngName: formProps.diseaseEngName,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setDiseasesList([...diseasesList, response.data]);
        setShowModal(false)

        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // edit disease
  const updateDisease = (data) => {
    setEditDiseaseData(data);
    setModalMode("edit")
    setShowModal(true)
  };

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

    axiosClient
      .post(url, data)
      .then((response) => {
        updateItem(formProps.diseaseId, response.data);
        setShowModal(false)
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
      console.log("no match");
    } else
      setDiseasesList([
        ...diseasesList.slice(0, index),
        g,
        ...diseasesList.slice(index + 1),
      ]);
  };

  // delete disease
  const deleteDisease = async (id) => {
    let result = await QuestionAlert(
      "حذف بیماری !",
      "آیا از حذف بیماری خاص اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = "Center/DeleteSpecialDiseases";
      let data = {
        CenterID: CenterID,
        SDID: id,
      };

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

  useEffect(() => getDiseasesData(), []);

  return (
    <>
      <Head>
        <title>بیماری های خاص</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end">
                  <button
                    onClick={openAddModal}
                    className="btn btn-primary btn-add font-14 media-font-12"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    اضافه کردن
                  </button>
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
              </div>
            </div>
          </div>
        )}

        <SpecialDiseasesModal
          mode={modalMode}
          data={editDiseaseData}
          isLoading={isLoading}
          onHide={handleCloseModal}
          show={showModal}
          onSubmit={modalMode == "edit" ? editDisease : addDisease}
        />
      </div>
    </>
  );
};

export default SpecialDiseases;