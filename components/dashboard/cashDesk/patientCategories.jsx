import { useState } from "react";
import Image from "next/image";
import { resetServerContext } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { numberWithComma } from "class/numberWithComma";

const PatientCategories = ({
  patientsInfo,
  setPatientsInfo,
  openActionModal,
}) => {
  resetServerContext();

  const [categories, setCategories] = useState([
    { id: 1, name: "در انتظار" },
    { id: 2, name: "پرداخت کامل" },
    { id: 3, name: "بدهکار" },
    { id: 4, name: "عودتی" },
  ]);

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
      patientsInfo.map((x) => {
        openActionModal(x.id, x.item);
      });

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="Categories" type="droppableItem">
        {(provided) => (
          <div ref={provided.innerRef} className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-12 col-lg-6 col-xxl-3">
                <Droppable droppableId={category.id.toString()}>
                  {(provided) => (
                    <div ref={provided.innerRef}>
                      <ul
                        className="list-unstyled mb-3"
                        id="dropzone"
                        dir="rtl"
                      >
                        <p className="mb-1 text-secondary font-14 fw-bold text-center">
                          {category.name}
                        </p>
                        <hr className="mb-4" />

                        <div className="patientListContainer">
                          {patientsInfo
                            .filter((item) => item.category === category.id)
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
                                      <div className="checkbox-wrapper checkbox-wrapper-per w-100">
                                        <div
                                          className="patientInfoCheckboxTile permissionItem"
                                          onDoubleClick={() =>
                                            openActionModal(item.id, item.item)
                                          }
                                        >
                                          <div
                                            className="d-flex align-items-center flex-col"
                                            key={index}
                                          >
                                            <div className="p-1 d-flex gap-3">
                                              <div className="">
                                                <p className="text-align-end mb-2 font-13">
                                                  {item.name}
                                                </p>
                                                <p className="text-align-end font-12 mb-2">
                                                  کد ملی : {item.nationalID}
                                                </p>
                                                <p className="font-12">
                                                  سهم بیمار :
                                                  {item.totalPatientCost.toLocaleString()}
                                                </p>
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
                                                    borderRadius: "10px",
                                                  }}
                                                />
                                              </div>
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
  );
};

export default PatientCategories;
