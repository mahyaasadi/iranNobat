import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/loading/loading";
import { ErrorAlert, SuccessAlert, WarningAlert } from "class/AlertManage.js";
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
        destination: `/login`,
      },
    };
  }
};

let CenterID = null;
const Permissions = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  resetServerContext();
  const Router = useRouter();

  const [usersPermissionList, setUsersPermissionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([
    { id: 1, name: "عدم دسترسی" },
    { id: 2, name: "دسترسی" },
  ]);

  const dropCheckedPermission = (id, droppableId) => {
    let item = null;

    if (droppableId == 1) {
      item = {
        draggableId: id,
        type: "DEFAULT",
        source: {
          index: 0,
          droppableId: "1",
        },
        reason: "DROP",
        mode: "FLUID",
        destination: {
          droppableId: "2",
          index: 0,
        },
        combine: null,
      };
    } else {
      item = {
        draggableId: id,
        type: "DEFAULT",
        source: {
          index: 0,
          droppableId: "2",
        },
        reason: "DROP",
        mode: "FLUID",
        destination: {
          droppableId: "1",
          index: 0,
        },
        combine: null,
      };
    }
    onDragEnd(item);
  };

  const [rolePermissionStatus, setRolePermissionStatus] = useState({
    roleAccessList: [],
  });

  const handleCheckedPermissions = (e) => {
    const { value, checked } = e.target;
    const { roleAccessList } = rolePermissionStatus;

    console.log(`${value} is ${checked}`);

    checked
      ? (setRolePermissionStatus({
          roleAccessList: [...roleAccessList, value],
        }),
        setCheckedState(true))
      : (setRolePermissionStatus({
          roleAccessList: roleAccessList.filter((e) => e !== value),
        }),
        setCheckedState(false));
  };

  // get all permissions
  let permissionItems = [];
  const getUserPermissions = (arr) => {
    let url = "Permision/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then(async function (response) {
        if (response.data) {
          setIsLoading(false);

          let allDenay = response.data;
          if (arr) {
            await arr.map((per) => {
              allDenay = allDenay.filter((x) => x._id !== per.PermisionID._id);
              setUsersPermissionList(allDenay);
            });
          }

          for (let i = 0; i < allDenay.length; i++) {
            const item = allDenay[i];
            let obj = {
              id: item._id,
              name: item.Name,
              category: 1,
            };
            permissionItems.push(obj);
          }
          setItems(permissionItems);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // get selected Role
  const getSelectedRole = () => {
    let roleID = Router.query.id;
    let url = `Roles/getOne/${roleID}`;
    setIsLoading(true);
    if (roleID) {
      axiosClient
        .get(url)
        .then((response) => {
          console.log("Selected Role: ", response.data);
          getUserPermissions(response.data.PermisionsID);

          for (let i = 0; i < response.data.PermisionsID.length; i++) {
            const item = response.data.PermisionsID[i];

            let accessObj = {
              id: item.PermisionID._id,
              name: item.PermisionID.Name,
              category: 2,
            };

            permissionItems.push(accessObj);
            setItems(permissionItems);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const [items, setItems] = useState([]);
  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);
    return arrCopy;
  };

  const onDragEnd = (result) => {
    console.log("result", result);
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === "Categories") {
      // a category was moved
      setCategories(rearangeArr(categories, source.index, destination.index));
    } else if (destination.droppableId !== source.droppableId) {
      // find the source in items array and change with destination droppable id
      setItems((items) =>
        items.map((item) =>
          item.id === result.draggableId
            ? {
                ...item,
                category: parseInt(result.destination.droppableId),
              }
            : item
        )
      );
    } else {
      // rearange the array if it is in the same category
      setItems(rearangeArr(items, source.index, destination.index));
    }
  };

  const changeRolePermission = (e) => {
    e.preventDefault();

    let roleID = Router.query.id;
    let url = `Roles/changeRolesPermisions/${roleID}`;

    let PermisionsID = [];
    let accessList = items.filter((x) => x.category === 2);
    accessList.map((item) => PermisionsID.push(item.id));

    let data = {
      CenterID: CenterID,
      PermisionsID: PermisionsID,
    };

    setIsLoading(true);
    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        SuccessAlert("موفق", "سطح دسترسی با موفقیت ثبت گردید!");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (Router.isReady) {
      const roleID = Router.query.id;
      if (!roleID) return null;
      getSelectedRole();
    }
  }, [Router.isReady]);

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     return "Changes you made may not be saved";
  //   };
  // }, [items])

  return (
    <>
      <Head>
        <title>تنظیمات سطح دسترسی</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="card-body permissionCard">
                <div className="permissionHeader">
                  <p>تنظیم سطح دسترسی | {Router.query.name}</p>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="Categories" type="droppableItem">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        className="mediaColumnContainer"
                      >
                        {categories.map((category, index) => (
                          <div key={index} className="col-12 col-xl-5">
                            <Droppable droppableId={category.id.toString()}>
                              {(provided) => (
                                <div className="" ref={provided.innerRef}>
                                  <ul
                                    className="list-unstyled p-4 mb-3"
                                    id="dropzone"
                                    dir="rtl"
                                  >
                                    <p className="mb-1 text-secondary font-14 fw-bold text-center">
                                      {category.name}
                                    </p>
                                    <hr className="mb-4" />

                                    <div className="permissionListContainer">
                                      {items
                                        .filter(
                                          (item) =>
                                            item.category === category.id
                                        )
                                        .map((item, index) => (
                                          <Draggable
                                            draggableId={item.id.toString()}
                                            id={item.id.toString()}
                                            key={item.id}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                              >
                                                <div className="checkbox permissionCheckbox">
                                                  <div className="checkbox-wrapper checkbox-wrapper-per">
                                                    {/* <input
                                                    type="checkbox"
                                                    name="roleAccessList"
                                                    value={item.name}
                                                    id={item.id}
                                                    className="checkbox-input"
                                                    onChange={() =>
                                                      dropCheckedPermission(
                                                        item.id.toString(),
                                                        item.category
                                                      )
                                                    }
                                                  /> */}
                                                    <div className="permissionCheckboxTile permissionItem">
                                                      <div
                                                        className="checkbox"
                                                        key={index}
                                                      >
                                                        <div className="marginb-sm d-flex align-items-center">
                                                          <input
                                                            type="checkbox"
                                                            id={item.id}
                                                            value={item.name}
                                                            name="roleAccessList"
                                                            className="PerCheckbox-input"
                                                            onChange={() =>
                                                              dropCheckedPermission(
                                                                item.id.toString(),
                                                                item.category
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            className="permissionLabel font-13"
                                                            htmlFor={item.name}
                                                          >
                                                            {item.name}
                                                          </label>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        ))}
                                    </div>

                                    {provided.placeholder}
                                  </ul>
                                </div>
                              )}
                            </Droppable>
                          </div>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <div className="submitPermissions-btn d-flex justify-center w-100">
                  <button
                    type="submit"
                    className="btn btn-secondary rounded col-lg-3 col-7 font-14"
                    onClick={changeRolePermission}
                  >
                    ثبت
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Permissions;
