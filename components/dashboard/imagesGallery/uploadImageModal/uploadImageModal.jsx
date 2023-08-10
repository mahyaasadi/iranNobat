import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";

const UploadImageModal = ({ uploadImage }) => {
  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
    $("#fileUploadPreview").attr("src", imageUrl);
  };

  return (
    <div
      className="modal fade contentmodal"
      id="uploadImageModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">آپلود تصویر</p>
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
            <form onSubmit={uploadImage}>
              <div className="form-group ">
                <label className="lblAbs font-12">
                  عنوان<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  name="Title"
                  id="Title"
                  required
                />
              </div>

              <div className="form-group ">
                <label className="lblAbs font-12">توضیحات</label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  name="Des"
                />
              </div>

              <div className="change-photo-btn">
                <div>
                  <i>
                    <FeatherIcon icon="upload" />
                  </i>
                  <p>آپلود فایل</p>
                </div>
                <input
                  type="file"
                  className="upload"
                  name="img"
                  onChange={displayPreview}
                  required
                />
              </div>

              <div className="previewImgContainer">
                <Image
                  src=""
                  alt=""
                  width="200"
                  id="fileUploadPreview"
                  className="d-block m-auto previewImg"
                />
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary btn-save rounded"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadImageModal;
