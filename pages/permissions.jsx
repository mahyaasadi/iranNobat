import { useState, useEffect } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/loading/loading";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Item from "components/dashboard/permissions/item.js";

const Permissions = () => {
  const [usersPermissionList, setUsersPermissionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  resetServerContext();

  const [categories, setCategories] = useState([
    { id: 1, name: "عدم دسترسی" },
    { id: 2, name: "دسترسی" },
  ]);

  let permissionItems = []
  const getUserPermissions = () => {
    let url = "Permision/getAll";

    axiosClient.get(url).then(function (response) {
      if (response.data) {
        setIsLoading(false);
        console.log(response.data);
        setUsersPermissionList(response.data);

        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let obj = {
            id: item._id,
            name: item.Name,
            category: 1,
          };
          permissionItems.push(obj);
        }
      }
    });
  };

  const [items, setItems] = useState(permissionItems)

  useEffect(() => {
    getUserPermissions();
    console.log("items :", items);
  }, []);


  // const [items, setItems] = useState([
  //   { id: 1, name: "item1", category: 1 },
  //   { id: 2, name: "item2", category: 1 },
  //   { id: 3, name: "item3", category: 1 },
  //   { id: 4, name: "item4", category: 1 },
  //   { id: 5, name: "item5", category: 1 },
  //   { id: 6, name: "item6", category: 1 },
  // ]);

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
  };

  const onDragEnd = (result) => {
    console.log(result);
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
          item.id === parseInt(result.draggableId)
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

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="container py-5">
            <DragDropContext onDragEnd={onDragEnd}>
              <div>
                <Droppable droppableId="Categories" type="droppableItem">
                  {(provided) => (
                    <div ref={provided.innerRef} className="d-flex gap-2">
                      {categories.map((category, index) => (
                        <div className="col-6">
                          <Droppable droppableId={category.id.toString()}>
                            {(provided) => (
                              <div ref={provided.innerRef}>
                                <ul className="list-unstyled border p-3 mb-3 rounded-md">
                                  <h6 className="h6 mb-3">{category.name}</h6>
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
                                            <li className="mb-3 d-flex align-items-center justify-content-between border p-3">
                                              <Item item={item} />
                                            </li>
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
              </div>
            </DragDropContext>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Permissions;
