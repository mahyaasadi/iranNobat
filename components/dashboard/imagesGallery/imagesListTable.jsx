import FeatherIcon from "feather-icons-react";
import { Tooltip } from "primereact/tooltip";

const ImagesListTable = ({ data, deleteImage }) => {
  return (
    <>
      <div className="row p-4">
        {data.map((item, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 articleCard" key={index}>
            <div className="card">
              <div className="card-body">
                <img
                  className="rounded-md centerImg"
                  src={"https://irannobat.ir/CenterProfileImage/" + item.Image}
                  alt="centerImg"
                ></img>

                {/* imgDetails */}
                <div className="p-2 height-5">
                  <div className="mt-2 font-13 text-secondary">
                    عنوان : {item.Title}
                  </div>
                  {item.Des ? (
                    <div className="mt-2 font-12 text-secondary">
                      توضیحات : {item.Des.substr(0, 10) + " ..."}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <hr />

                <div className="d-flex justify-flex-end gap-1 flex-wrap">
                  <button
                    className="btn btn-sm btn-outline-danger removeBtn"
                    onClick={() => deleteImage(item)}
                    data-pr-position="top"
                  >
                    <Tooltip target=".removeBtn">حذف</Tooltip>
                    <FeatherIcon
                      icon="trash-2"
                      style={{ width: "16px", height: "16px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImagesListTable;
