import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const UploadImageModal = ({
  uploadImage,
  imgTitle,
  imgDescription,
  handleImgTitleTitleInput,
  handleImgDescriptionInput,
}) => {
    
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
            <h3 className="mb-0">آپلود تصویر</h3>
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
                  />
                  <label className="focus-label">
                    مشخصات<span className="text-danger">*</span>
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
                  />
                </div>
                <div>
                  <img
                    src=""
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
