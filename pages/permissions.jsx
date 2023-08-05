import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/loading/loading";
// import Item from "components/dashboard/permissions/item.js";

let CenterID = Cookies.get("CenterID");

const Permissions = () => {
  resetServerContext();
  const Router = useRouter();

  const [usersPermissionList, setUsersPermissionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([
    { id: 1, name: "عدم دسترسی" },
    { id: 2, name: "دسترسی" },
  ]);

  let permissionItems = [];

  // get all permissions
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
          console.log(permissionItems);
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
          console.log(
            "PermisionsID.length :",
            response.data.PermisionsID.length
          );

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // getUserPermissions();
    if (Router.isReady) {
      const roleID = Router.query.id;
      if (!roleID) return null;
      getSelectedRole();
    }
  }, [Router.isReady]);

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
                        className="permissionCardsContainer"
                      >
                        {categories.map((category, index) => (
                          <div key={index} className="col-12 col-lg-5">
                            <Droppable droppableId={category.id.toString()}>
                              {(provided) => (
                                <div
                                  className="permissionListContainer"
                                  ref={provided.innerRef}
                                >
                                  <ul
                                    className="list-unstyled p-4 mb-3"
                                    id="dropzone"
                                    dir="rtl"
                                  >
                                    <p className="mb-4 text-secondary font-16 fw-bold">
                                      {category.name}
                                    </p>
                                    {items
                                      .filter(
                                        (item) => item.category === category.id
                                      )
                                      .map((item, index) => (
                                        <Draggable
                                          draggableId={item.id.toString()}
                                          key={item.id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              {/* <li className="mb-3 d-flex align-items-center justify-content-between border permissionItem">
                                              <Item item={item} />
                                            </li> */}
                                              {/*  */}
                                              <div className="checkbox permissionCheckbox">
                                                <label className="checkbox-wrapper">
                                                  <input
                                                    type="checkbox"
                                                    name="Dep"
                                                    // value={departmentData._id}
                                                    // id={
                                                    //   "Dep" + departmentData._id
                                                    // }
                                                    className="checkbox-input"
                                                    // defaultChecked={
                                                    //   departmentData.Checked
                                                    // }
                                                  />
                                                  <div className="checkbox-tile permissionCheckboxTile permissionItem">
                                                    <span className="checkbox-icon"></span>

                                                    <div className="checkbox-items">
                                                      <span className="checkbox-label">
                                                        <div>{item.name}</div>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </label>
                                              </div>
                                              {/*  */}
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
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
