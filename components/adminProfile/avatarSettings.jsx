import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const AvatarSettings = ({ UserData }) => {
  return (
    <>
      <div className="col-xl-6 col-12">
        <div className="card">
          <div className="card-body pt-0">
            <div className="card-header">
              <p className="font-16 fw-bold text-secondary">تغییر آواتار</p>
            </div>
            <form>
              <div className="settings-form">
                <p className="font-12 lblAbs">آواتار فعلی</p>
                <div className="upload-images">
                  <img
                    src={UserData.Avatar}
                    alt="Image"
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  />
                  <Link href="#" className="btn-icon logo-hide-btn">
                    <i>
                      <FeatherIcon icon="x-circle" />
                    </i>
                  </Link>
                </div>
                <div className="form-group">
                  <div className="change-photo-btn mt-4">
                    <div>
                      <i>
                        <FeatherIcon icon="upload" />
                      </i>
                      <p>آپلود آواتار جدید</p>
                    </div>
                    <input
                      type="file"
                      className="upload"
                      name="img"
                      // onChange={displayNewAvatar}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex gap-1 justify-center margin-top-2 media-flex-column">
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save font-13"
                    id="submitUserBtn"
                  >
                    ثبت
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-dark rounded btn-save font-13"
                    id="submitUserBtn"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarSettings;
