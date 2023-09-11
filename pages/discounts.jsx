import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/loading/loading";
import discountPercentDataClass from "class/discountPercentDataClass";
import DiscountsListTable from "components/dashboard/discounts/discountsListTable";
import AddDiscountModal from "components/dashboard/discounts/addDiscountModal";
import EditDiscountModal from "components/dashboard/discounts/editDiscountModal";

let CenterID = Cookies.get("CenterID");

export const getStaticProps = async () => {
  const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
  const Menus = await data.json();
  return { props: { Menus } };
};

const Discounts = ({ Menus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [discountsList, setDiscountsList] = useState([]);
  const [editedDiscountList, setEditedDiscountList] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(
    discountPercentDataClass
  );

  let SelectDiscountPercent = "";
  const FUSelectDiscountPercent = (Percent) => {
    SelectDiscountPercent = Percent;
  };

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
        $("#addDiscountModal").modal("hide");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Delete Discount
  const deleteDiscount = async (id) => {
    let result = await QuestionAlert("حذف تخفیف!", "آیا از حذف اطمینان دارید؟");

    if (result) {
      let url = `CenterDiscount/delete/${id}`;
      let data = {
        CenterID: CenterID,
        DiscountID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setDiscountsList(discountsList.filter((a) => a._id !== id));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // Edit Discount
  const updateDiscount = (data) => {
    setEditedDiscountList(data);
    $("#editDiscountModal").modal("show");
  };

  const editDiscount = (e) => {
    e.preventDefault();

    let url = "CenterDiscount/update";
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

    axiosClient
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
      console.log("no match");
    } else
      setDiscountsList([
        ...discountsList.slice(0, index),
        g,
        ...discountsList.slice(index + 1),
      ]);
  };

  useEffect(() => {
    getDiscountsData();
  }, []);

  return (
    <>
      <Head>
        <title>تخفیفات</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addDiscountModal"
                  className="btn btn-primary btn-add font-14"
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
                      <h5 className="card-title font-16">لیست تخفیفات پذیرش</h5>
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
        addDiscount={addDiscount}
        isLoading={isLoading}
        FUSelectDiscountPercent={FUSelectDiscountPercent}
        discountPercentDataClass={discountPercentDataClass}
      />

      <EditDiscountModal
        data={editedDiscountList}
        editDiscount={editDiscount}
        FUSelectDiscountPercent={FUSelectDiscountPercent}
        discountPercentDataClass={discountPercentDataClass}
      />
    </>
  );
};

export default Discounts;
