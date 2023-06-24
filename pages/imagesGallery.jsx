import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/loading";
import ImagesListTable from "components/dashboard/imagesGallery/imagesListTable/imagesListTable";

let CenterID = Cookies.get("CenterID");

const ImagesGallery = () => {
  const [imagesData, setImagseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get CannedMessages list
  const getImagesGallery = () => {
    let url = `https://irannobat.ir:8444/api/CenterProfile/getCenterGallery/${CenterID}`;

    axios.get(url).then(function (response) {
      setImagseData(response.data);
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

  //   const getBase64FromUrl = async (url) => {
  //     const data = await fetch(url);
  //     const blob = await data.blob();
  //     return new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = () => {
  //         const base64data = reader.result;
  //         resolve(base64data);
  //       };
  //     });
  //   };

  //   getBase64FromUrl("/CenterProfileImage/167084132240x40.jpg").then(console.log);

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
                  data-bs-target="#addImageModal"
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

                <ImagesListTable data={imagesData} />
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Add Modal --> */}
      <div
        className="modal fade contentmodal"
        id="addImageModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <h3 className="mb-0">Add Product</h3>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i>
                  <FeatherIcon icon="x-circle" />
                </i>
              </button>
            </div>
            <div className="modal-body">
              <form action="/admin/pharmacy-list">
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      Product Name <span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" />
                    <label className="focus-label">
                      Price <span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Edit Modal --> */}
      <div
        className="modal fade contentmodal"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <h3 className="mb-0">Edit Product</h3>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i>
                  <FeatherIcon icon="x-circle" />
                </i>
              </button>
            </div>
            <div className="modal-body">
              <form action="/admin/pharmacy-list">
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <input
                      type="text"
                      className="form-control floating"
                      defaultValue="Safi Natural"
                    />
                    <label className="focus-label">
                      Product Name <span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="form-group form-focus">
                    <input
                      type="text"
                      className="form-control floating"
                      defaultValue="$330.00"
                    />
                    <label className="focus-label">
                      Price <span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ImagesGallery;
