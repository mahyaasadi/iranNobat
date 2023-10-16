import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig";
import Loading from "components/commonComponents/loading/loading";
import { resetServerContext } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
const CashDesk = ({ UserData, UserRoles, Menus }) => {
  CenterID = UserData.CenterID;
  resetServerContext();

  const [isLoading, setIsLoading] = useState(true);
  const [patientsInfo, setPatientsInfo] = useState([]);

  const [categories, setCategories] = useState([
    { id: 1, name: "در انتظار" },
    { id: 2, name: "پرداخت کامل" },
    { id: 3, name: "بدهکار" },
    { id: 4, name: "طلبکار" },
  ]);

  const getPatientsInfo = () => {
    setIsLoading(true);
    let url = `Reception/CashDeskPatient/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        console.log("reception info", response.data);

        let patientsArr = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          console.log(item.Patient);
          patientsArr.push(item.Patient);
        }

        let patientItems = [];
        for (let i = 0; i < patientsArr.length; i++) {
          const item = patientsArr[i];
          let obj = {
            id: item._id,
            category: 1,
            name: item.Name,
            avatar: item.Avatar,
            nationalID: item.NationalID,
          };
          patientItems.push(obj);
        }
        setPatientsInfo(patientItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  console.log({ patientsInfo });

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);
    return arrCopy;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === "Categories") {
      setCategories(rearangeArr(categories, source.index, destination.index));
    } else if (destination.droppableId !== source.droppableId) {
      setPatientsInfo((patientsInfo) =>
        patientsInfo.map((item) =>
          item.id === result.draggableId
            ? {
                ...item,
                category: parseInt(result.destination.droppableId),
              }
            : item
        )
      );
    } else {
      setPatientsInfo(
        rearangeArr(patientsInfo, source.index, destination.index)
      );
    }
  };

  useEffect(() => {
    getPatientsInfo();
  }, []);

  return (
    <>
      <Head>
        <title>صندوق</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body permissionCard">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="Categories" type="droppableItem">
                  {(provided) => (
                    <div ref={provided.innerRef} className="row">
                      {categories.map((category, index) => (
                        <div key={index} className="col-12 col-xl-3">
                          <Droppable droppableId={category.id.toString()}>
                            {(provided) => (
                              <div className="" ref={provided.innerRef}>
                                <ul
                                  className="list-unstyled mb-3"
                                  id="dropzone"
                                  dir="rtl"
                                >
                                  <p className="mb-1 text-secondary font-14 fw-bold text-center">
                                    {category.name}
                                  </p>
                                  <hr className="mb-4" />

                                  <div className="permissionListContainer">
                                    {patientsInfo
                                      .filter(
                                        (item) => item.category === category.id
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
                                                  <div className="patientInfoCheckboxTile permissionItem">
                                                    <div
                                                      className="d-flex align-items-center flex-col"
                                                      //   key={index}
                                                    >
                                                      <div className="d-flex gap-2 align-items-center justify-end paddingR-4">
                                                        <div className="font-12">
                                                          {item.name}
                                                        </div>

                                                        <div className="patientAvatar">
                                                          <img
                                                            src={
                                                              "https://irannobat.ir/images/" +
                                                              item.avatar
                                                            }
                                                            alt="patientAvatar"
                                                            onError={({
                                                              currentTarget,
                                                            }) => {
                                                              currentTarget.src =
                                                                "/assets/img/NoAvatar.jpg";
                                                            }}
                                                            style={{
                                                              width: "30px",
                                                              height: "30px",
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="nationalId-container paddingR-2 font-11">
                                                        کد ملی :{" "}
                                                        {item.nationalID}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashDesk;
