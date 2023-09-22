import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import Link from "next/link";
import FeatherIcon from "feather-icons-react";

// let cropper;
const AvatarSettings = ({ UserData, changeUserAvatar, isLoading }) => {
  const [avatarSrc, setAvatarSrc] = useState(UserData.Avatar);
  const [cropper, setCropper] = useState(null);
  const imageElement = useRef(null);

  const displayNewAvatar = (e) => {
    if (e.target.files.length !== 0) {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
      setAvatarSrc(imageUrl);
    }
  };

  // useEffect(() => {
  //   console.log("ooo");
  //   if (avatarSrc !== UserData.Avatar && imageElement.current) {
  //     if (cropper) {
  //       cropper.destroy();
  //     }

  //     cropper = new Cropper(imageElement.current, {
  //       aspectRatio: 1,
  //     });
  //   }

  //   // return () => {
  //   //   if (cropper) {
  //   //     cropper.destroy();
  //   //   }
  //   // };
  // }, [avatarSrc, UserData.Avatar]);

  useEffect(() => {
    console.log('avatarSrc:', avatarSrc);
    console.log('imageElement.current:', imageElement.current);
    if (avatarSrc !== UserData.Avatar && imageElement.current) {
      if (cropper) {
        cropper.destroy();
      }

      const newCropper = new Cropper(imageElement.current, {
        aspectRatio: 1,
      });

      setCropper(newCropper);
    }

    return () => {
      if (cropper) {
        cropper.destroy();
        setCropper(null);
      }
    };
  }, [avatarSrc]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ cropper });
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();

      if (!croppedCanvas) {
        return;
      }

      croppedCanvas.toBlob(async (blob) => {

        console.log({ blob });
        let formData = new FormData();
        formData.append('editUserAvatar', blob);
        formData.append('userId', UserData._id);

        await changeUserAvatar(formData);
      });
    }

    console.log("hii");
  };

  return (
    <>
      <div className="col-xl-6 col-12">
        <div className="card">
          <div className="card-body p-4">
            <div className="card-header">
              <p className="font-16 fw-bold text-secondary">تغییر آواتار</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="settings-form">
                <p className="font-12 lblAbs">آواتار فعلی</p>
                <div className="upload-images">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="userId"
                    value={UserData._id}
                  />

                  <img
                    src={avatarSrc}
                    ref={imageElement}
                    alt="Image"
                    id="currentAvatar"
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
                      name="editUserAvatar"
                      onChange={displayNewAvatar}
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
