import React, { useState, useEffect } from "react";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig";
import { QuestionAlert } from "class/AlertManage";
import { getSession } from "lib/session";
import Loading from "components/commonComponents/loading/loading";
import discountPercentDataClass from "class/discountPercentDataClass";
import DiscountModal from "components/dashboard/discounts/discountModal";
import DiscountsListTable from "components/dashboard/discounts/discountsListTable";

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
const Discounts = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [discountsList, setDiscountsList] = useState([]);
  const [editDiscountData, setEditDiscountData] = useState([]);
  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  let SelectDiscountPercent = "";
  const FUSelectDiscountPercent = (Percent) =>
    (SelectDiscountPercent = Percent);

  // get discounts list
  const getDiscountsData = () => {
    setIsLoading(true);

    axiosClient
      .get(`CenterDiscount/getAll/${CenterID}`)
      .then(function (response) {
        setDiscountsList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);
        console.log(error);
      });
  };

  // Add Discount
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const addDiscount = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterDiscount/add";
    let data = {
      CenterID: CenterID,
      Name: formProps.discountName,
      Des: formProps.discountDescription,
      Value: formProps.discountValue,
      Percent: parseInt(SelectDiscountPercent),
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setDiscountsList([...discountsList, response.data]);
        setShowModal(false);
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Edit Discount
  const updateDiscount = (data) => {
    setEditDiscountData(data);
    setModalMode("edit");
    setShowModal(true);
  };

  const editDiscount = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterDiscount/update";
    let Data = {
      CenterID: CenterID,
      DiscountID: formProps.EditDiscountID,
      Name: formProps.EditDiscountName,
      Des: formProps.EditDiscountDes,
      Value: formProps.EditDiscountValue,
      Percent: parseInt(formProps.EditDiscountPercent),
    };

    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditDiscountID, response.data);
        setShowModal(false);
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
      console.log("no match");
    } else
      setDiscountsList([
        ...discountsList.slice(0, index),
        g,
        ...discountsList.slice(index + 1),
      ]);
  };

  // Delete Discount
  const deleteDiscount = async (id) => {
    let result = await QuestionAlert("حذف تخفیف!", "آیا از حذف اطمینان دارید؟");

    if (result) {
      setIsLoading(true);
      let url = `CenterDiscount/delete/${id}`;
      let data = {
        CenterID: CenterID,
        DiscountID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setDiscountsList(discountsList.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => getDiscountsData(), []);

  return (
    <>
      <Head>
        <title>تخفیفات</title>
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
                        <h5 className="card-title font-14">
                          لیست تخفیفات پذیرش
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

                  <DiscountsListTable
                    data={discountsList}
                    updateDiscount={updateDiscount}
                    deleteDiscount={deleteDiscount}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <DiscountModal
        mode={modalMode}
        show={showModal}
        isLoading={isLoading}
        data={editDiscountData}
        onHide={handleCloseModal}
        FUSelectDiscountPercent={FUSelectDiscountPercent}
        discountPercentDataClass={discountPercentDataClass}
        onSubmit={modalMode == "edit" ? editDiscount : addDiscount}
      />
    </>
  );
};

export default Discounts;
