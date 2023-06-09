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
            <h5 className="mb-0">آپلود تصویر</h5>
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
              <div className="add-wrap">
                <div className="form-group form-focus">
                  <input
                    type="text"
                    name="Title"
                    id="Title"
                    className="form-control floating"
                    required
                  />
                  <label className="focus-label">
                    عنوان<span className="text-danger">*</span>
                  </label>
                </div>

                <div className="form-group form-focus">
                  <input
                    type="text"
                    name="Des"
                    className="form-control floating"
                    required
                  />
                  <label className="focus-label">
                    توضیحات<span className="text-danger">*</span>
                  </label>
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
                  <button type="submit" className="btn btn-primary btn-save">
                    ثبت تغییرات
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadImageModal;
