import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Swal from "sweetalert2";
import Loading from "components/loading/Loading";
import discountPercentDataClass from "class/discountPercentDataClass";
import DiscountsListTable from "components/dashboard/discounts/discountsListTable/discountsListTable";
import AddDiscountModal from "components/dashboard/discounts/addDiscountModal/addDiscountModal";
import EditDiscountModal from "components/dashboard/discounts/editDiscountModal/editDiscountModal";

let CenterID = Cookies.get("CenterID");

const Discounts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [discountsList, setDiscountsList] = useState([]);
  const [editedDiscountList, setEditedDiscountList] = useState([]);
  const [discountName, setDiscountName] = useState("");
  const [description, setDescription] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountPercent, setdiscountPercent] = useState(
    discountPercentDataClass
  );

  const handlediscountNameInput = (e) => setDiscountName(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);
  const handlediscountValueInput = (e) => setDiscountValue(e.target.value);

  let SelectDiscountPercent = "";

  const FUSelectDiscountPercent = (Percent) => {
    SelectDiscountPercent = Percent;
  };

  // reset form inputs
  const reset = () => {
    setDiscountName("");
    setDescription("");
    setDiscountValue("");
  };

  //get discounts list
  const getDiscountsData = () => {
    axios
      .get(`https://irannobat.ir:8444/api/CenterDiscount/getAll/${CenterID}`)
      .then(function (response) {
        console.log(response.data);
        setDiscountsList(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    try {
      getDiscountsData();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  // Add Discount
  const addDiscount = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterDiscount/add";
    let data = {
      CenterID: CenterID,
      Name: discountName,
      Des: description,
      Value: discountValue,
      Percent: parseInt(SelectDiscountPercent),
    };

    axios
      .post(url, data)
      .then((response) => {
        setDiscountsList([...discountsList, response.data]);
        $("#addDiscountModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete Discount
  const deleteDiscount = (id) => {
    Swal.fire({
      title: "حذف تخفیف!",
      text: "آیا از حذف مطمئن هستید",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          CenterID: CenterID,
          DiscountID: id,
        };
        let url = `https://irannobat.ir:8444/api/CenterDiscount/delete/${id}`;

        axios
          .delete(url, { data })
          .then(function () {
            setDiscountsList(discountsList.filter((a) => a._id !== id));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  // Edit Discount
  const editDiscount = (e) => {
    e.preventDefault();

    let url = "https://irannobat.ir:8444/api/CenterDiscount/update";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    let Data = {
      CenterID: CenterID,
      DiscountID: formProps.EditDiscountID,
      Name: formProps.EditDiscountName,
      Des: formProps.EditDiscountDes,
      Value: formProps.EditDiscountValue,
      Percent: parseInt(formProps.EditDiscountPercent),
    };

    axios
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditDiscountID, response.data);
        $("#editDiscountModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateItem = (id, newArr) => {
    let index = discountsList.findIndex((x) => x._id === id);

    let g = discountsList[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setDiscountsList([
        ...discountsList.slice(0, index),
        g,
        ...discountsList.slice(index + 1),
      ]);
  };

  const updateDiscount = (data) => {
    setEditedDiscountList(data);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* <!-- Page Header --> */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addDiscountModal"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Discounts List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">لیست تخفیفات پذیرش</h5>
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

                {isLoading ? (
                  <Loading />
                ) : (
                  <DiscountsListTable
                    data={discountsList}
                    updateDiscount={updateDiscount}
                    deleteDiscount={deleteDiscount}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>

      <AddDiscountModal
        data={discountsList}
        discountName={discountName}
        description={description}
        discountValue={discountValue}
        FUSelectDiscountPercent={FUSelectDiscountPercent}
        handlediscountNameInput={handlediscountNameInput}
        handleDescriptionInput={handleDescriptionInput}
        handlediscountValueInput={handlediscountValueInput}
        addDiscount={addDiscount}
        discountPercentDataClass={discountPercentDataClass}
      />

      <EditDiscountModal
        data={editedDiscountList}
        discountName={discountName}
        description={description}
        discountValue={discountValue}
        FUSelectDiscountPercent={FUSelectDiscountPercent}
        handlediscountNameInput={handlediscountNameInput}
        handleDescriptionInput={handleDescriptionInput}
        handlediscountValueInput={handlediscountValueInput}
        discountPercentDataClass={discountPercentDataClass}
        editDiscount={editDiscount}
      />
    </>
  );
};

export default Discounts;
