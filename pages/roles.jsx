import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
import FeatherIcon from "feather-icons-react";
import Loading from "components/commonComponents/loading/loading";
import { QuestionAlert } from "class/AlertManage.js";
import RolesListTable from "components/dashboard/roles/rolesListTable";
import RolesModal from "components/dashboard/roles/rolesModal"
import { getSession } from "lib/session";

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
const Roles = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [rolesList, setRolesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRoleData, setEditRoleData] = useState([]);
  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // get all roles
  const getAllRoles = () => {
    let url = `Roles/getAll/${CenterID}`;
    setIsLoading(true);

    axiosClient
      .get(url)
      .then(function (response) {
        setIsLoading(false);
        // console.log("roles :", response.data);
        setRolesList(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add New Role
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true)
  }

  const addRole = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Roles/add";
    let data = {
      CenterID: CenterID,
      Name: formProps.addRoleName,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setRolesList([...rolesList, response.data]);
        setShowModal(false)
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Edit Role
  const editRole = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let RolesID = formProps.roleID;

    let url = `Roles/update/${RolesID}`;
    let data = {
      CenterID: CenterID,
      Name: formProps.editRoleName,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log("edit data", data);
        updateItem(formProps.roleID, response.data);
        setShowModal(false)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateItem = (id, newArr) => {
    let index = rolesList.findIndex((x) => x._id === id);
    let g = rolesList[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setRolesList([
        ...rolesList.slice(0, index),
        g,
        ...rolesList.slice(index + 1),
      ]);
  };

  const updateRole = (data) => {
    setEditRoleData(data);
    setShowModal(true);
    setModalMode("edit")
  };

  // Delete Role
  const deleteRole = async (id) => {
    let result = await QuestionAlert(
      "حذف نقش !",
      "?آیا از حذف نقش مطمئن هستید"
    );

    if (result) {
      setIsLoading(true);
      let url = `Roles/delete/${id}`;
      let data = {
        CenterID: CenterID,
      };

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setRolesList(rolesList.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => getAllRoles(), []);

  return (
    <>
      <Head>
        <title>تنظیمات دسترسی</title>
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
                        <h5 className="card-title font-16">لیست نقش ها</h5>
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

                  <RolesListTable
                    data={rolesList}
                    deleteRole={deleteRole}
                    updateRole={updateRole}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <RolesModal
          mode={modalMode}
          onSubmit={modalMode === "add" ? addRole : editRole}
          data={editRoleData}
          isLoading={isLoading}
          show={showModal}
          onHide={handleCloseModal}
        />
      </div>
    </>
  );
};

export default Roles;

