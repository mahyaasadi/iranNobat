import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/loading";
import ImagesListTable from "components/dashboard/imagesGallery/imagesListTable/imagesListTable";
import UploadImageModal from "components/dashboard/imagesGallery/uploadImageModal/uploadImageModal";

let CenterID = Cookies.get("CenterID");

const ImagesGallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesData, setImagesData] = useState([]);
  const [imgTitle, setImgTitle] = useState("");
  const [imgDescription, setImgDescription] = useState("");

  // recieved data after uploading
  const [image, setImage] = useState(null);
  const [med, setMed] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [webpImage, setWebpImage] = useState(null);
  const [webpMed, setWebpMed] = useState(null);
  const [webpThumb, setWebpThumb] = useState(null);

  //get Images
  const getImagesGallery = () => {
    let url = `https://irannobat.ir:8444/api/CenterProfile/getCenterGallery/${CenterID}`;

    axios.get(url).then(function (response) {
      setImagesData(response.data);
      console.log(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    try {
      getImagesGallery();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

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

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.img && formProps.img.size != 0) {
      img = await convertBase64(formProps.img);
      let data = {
        CenterID: CenterID,
        Img: img,
        Title: formProps.Title,
        Des: formProps.Des,
      };

      let url = "https://irannobat.ir:8444/api/CenterProfile/AddGallery";
      axios
        .post(url, data)
        .then((response) => {
          setImagesData([...imagesData, response.data]);
          $("#uploadImageModal").modal("hide");
          e.target.reset();
          $("#fileUploadPreview").attr("src", " ");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        title: "خطا !",
        text: "تصویر انتخاب نشده است",
        icon: "error",
        confirmButtonText: "تایید",
      });
    }
  };

  // Delete Message
  const deleteImage = (data) => {
    Swal.fire({
      title: "حذف تصویر!",
      text: "آیا از حذف تصویر مطمئن هستید",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#0db1ca",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        let url = "https://irannobat.ir:8444/api/CenterProfile/DeleteGallery";
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
        console.log(deleteData);
        axios
          .delete(url, deleteData)
          .then(function (response) {
            setImagesData(imagesData.filter((a) => a._id !== data._id));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadImageModal"
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

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">گالری تصاویر</h5>
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
                  <ImagesListTable
                    data={imagesData}
                    deleteImage={deleteImage}
                  />
                )}
              </div>
              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>

      <UploadImageModal uploadImage={uploadImage} />
    </>
  );
};
export default ImagesGallery;
