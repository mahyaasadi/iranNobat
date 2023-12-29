import { useEffect, useState } from "react";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import DoctorsListTable from "components/dashboard/doctors/doctorsListTable";
import { getSession } from "lib/session";
import DoctorModal from "@/components/dashboard/doctors/doctorModal";

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
const DoctorsList = ({ Menus, UserRoles, UserData }) => {
  CenterID = UserRoles.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);
  const [editDoctor, setEditDoctor] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showModal, setShowModal] = useState(false);

  const handleNameInput = (e) => setName(e.target.value);
  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleSpecialtyInput = (e) => setSpecialty(e.target.value);

  const handleCloseModal = () => setShowModal(false);

  //reset form inputs
  const reset = () => {
    setName("");
    setTitle("");
    setSpecialty("");
  };

  //get doctors list
  const getDoctorsData = () => {
    setIsLoading(true);

    if (CenterID) {
      axiosClient
        .get(`CenterProfile/getCenterPhysician/${CenterID}`)
        .then(function (response) {
          setDoctorsList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Add Physician
  const openAddModal = () => {
    setModalMode("add");
    reset();
    setShowModal(true);
  }

  const addPhysician = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "CenterProfile/AddPhysician";
    let data = {
      CenterID: CenterID,
      Name: name,
      Title: title,
      Spe: specialty,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setDoctorsList([...doctorsList, response.data]);
        setShowModal(false)
        reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Edit Physician
  const editPhysician = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "CenterProfile/UpdatePhysician";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let Data = {
      CenterID: CenterID,
      PhysicianID: formProps.EditDoctorID,
      Name: formProps.EditDoctorName,
      Title: formProps.EditDoctorTitle,
      Spe: formProps.EditDoctorSpe,
    };

    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditDoctorID, response.data);
        setShowModal(false)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateItem = (id, newArr) => {
    let index = doctorsList.findIndex((x) => x._id === id);
    let g = doctorsList[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setDoctorsList([
        ...doctorsList.slice(0, index),
        g,
        ...doctorsList.slice(index + 1),
      ]);
  };

  const updatePhysician = (data) => {
    setEditDoctor(data);
    setShowModal(true)
    setModalMode("edit")
  };

  // Delete Physician
  const deletePhysician = async (id) => {
    let result = await QuestionAlert(
      "حذف پزشک !",
      "?آیا از حذف پزشک مطمئن هستید"
    );

    if (result) {
      setIsLoading(true);
      let url = "CenterProfile/DeletePhysician";
      let data = {
        CenterID: CenterID,
        PhysicianID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setDoctorsList(doctorsList.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <>
      <Head>
        <title>پزشکان</title>
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
                    className="btn btn-primary btn-add font-14"
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
                        <h5 className="card-title font-16">لیست پزشکان</h5>
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

                  <DoctorsListTable
                    data={doctorsList}
                    deletePhysician={deletePhysician}
                    updatePhysician={updatePhysician}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <DoctorModal
          mode={modalMode}
          onSubmit={modalMode === "add" ? addPhysician : editPhysician}
          data={editDoctor}
          name={name}
          title={title}
          specialty={specialty}
          handleNameInput={handleNameInput}
          handleTitleInput={handleTitleInput}
          handleSpecialtyInput={handleSpecialtyInput}
          isLoading={isLoading}
          show={showModal}
          onHide={handleCloseModal}
        />

      </div>
    </>
  );
};

export default DoctorsList;
