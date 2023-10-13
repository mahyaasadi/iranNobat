import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { getSession } from "lib/session";
import { WarningAlert, QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ImagesListTable from "components/dashboard/imagesGallery/imagesListTable";
import UploadImageModal from "components/dashboard/imagesGallery/uploadImageModal";
import Paginator from "components/commonComponents/paginator";

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
const ImagesGallery = ({ Menus, UserData, UserRoles }) => {
  CenterID = UserData.CenterID;

  const [isLoading, setIsLoading] = useState(true);
  const [imagesData, setImagesData] = useState([]);

  // Pagination => User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  // Number of items to be displayed on each page
  const [itemsPerPage, setItemsPerPage] = useState(6);
  // The first and last record on the current page
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  // Records to be displayed on the current page
  const currentItems = imagesData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(imagesData.length / itemsPerPage);

  //get All Images
  const getImagesGallery = () => {
    setIsLoading(true);
    let url = `CenterProfile/getCenterGallery/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        setImagesData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // Convert imageUrl to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      // console.log(file);

      fileReader.onload = () => {
        // console.log(fileReader.result);
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        // console.log(error);
        reject(error);
      };
    });
  };

  // Upload image
  let img = null;
  const uploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.img && formProps.img.size != 0) {
      img = await convertBase64(formProps.img);
      let url = "CenterProfile/AddGallery";
      let data = {
        CenterID: CenterID,
        Img: img,
        Title: formProps.Title,
        Des: formProps.Des,
      };

      axiosClient
        .post(url, data)
        .then((response) => {
          setImagesData([...imagesData, response.data]);

          $("#uploadImageModal").modal("hide");
          $("#fileUploadPreview").attr("src", " ");
          e.target.reset();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          ErrorAlert("خطا", "آپلود تصویر با خطا مواجه گردید!");
        });
    } else {
      WarningAlert("هشدار!", "تصویری انتخاب نشده است");
    }
  };

  // Delete Message
  const deleteImage = async (data) => {
    let result = await QuestionAlert(
      "حذف تصویر!",
      "آیا از حذف تصویر مطمئن هستید"
    );

    if (result) {
      setIsLoading(true);
      let url = "CenterProfile/DeleteGallery";
      let deleteData = {
        data: {
          CenterID: CenterID,
          GalleryID: data._id,
          Image: data.Image,
          Med: data.Med,
          Thumb: data.Thumb,
          WebpImage: data.WebpImage,
          WebpMed: data.WebpMed,
          WebpThumb: data.WebpThumb,
        },
      };

      await axiosClient
        .delete(url, deleteData)
        .then(function (response) {
          setImagesData(imagesData.filter((a) => a._id !== data._id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          ErrorAlert("خطا", "حذف تصویر با خطا مواجه گردید!");
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getImagesGallery();
  }, []);

  return (
    <>
      <Head>
        <title>گالری تصاویر</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end">
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#uploadImageModal"
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

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">گالری تصاویر</h5>
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

                  <ImagesListTable
                    data={currentItems}
                    deleteImage={deleteImage}
                  />

                  {currentItems.length > 0 && (
                    <Paginator
                      nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  )}
                </div>
                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <UploadImageModal uploadImage={uploadImage} isLoading={isLoading} />

    </>
  );
};

export default ImagesGallery;
