import Image from "next/image";
import FeatherIcon from "feather-icons-react";

let count,
  Drug = null;

const AddToListItem = ({
  data,
  setPrescriptionItemsData,
  handleEditPrescItem,
  selectFavEprescItem,
}) => {
  console.log({ data });

  // Delete Service from prescItems
  const DeleteService = (id, prescId) => {
    setPrescriptionItemsData(data.filter((a) => a.SrvCode !== id));

    count = $("#srvItemCountId" + prescId).html();
    if (count == "") {
      count = 0;
    }
    count = parseInt(count);
    count--;
    $("#srvItemCountId" + prescId).html(count);

    // if (count === 0) {
    //   $("#srvItemCountId" + prescId).hide();
    // }
  };

  return data.map((srv, index) => {
    // console.log({ srv });
    return (
      <>
        <div dir="rtl" id={index}>
          <div className="card prescItem">
            <div className="card-body">
              <div className="row">
                <div className="d-flex justify-between align-items-center marginb-1">
                  <div className="d-flex gap-2 font-13 align-items-center">
                    {srv.Img ? (
                      <Image
                        src={srv.Img}
                        alt="serviceIcon"
                        width="25"
                        height="25"
                      />
                    ) : (
                      ""
                    )}

                    <div className="d-flex gap-2 font-13 align-items-center">
                      <p className="mb-0">{srv.SrvCode}</p>
                      <p className="mb-0">|</p>
                      <p>{srv.SrvName}</p>
                    </div>
                  </div>

                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="ویرایش"
                      onClick={() => handleEditPrescItem(srv)}
                    >
                      <FeatherIcon icon="edit-2" className="prescItembtns" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="اضافه به لیست علاقه مندی"
                      onClick={() => selectFavEprescItem(srv)}
                    >
                      <FeatherIcon icon="star" className="prescItembtns" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => DeleteService(srv.SrvCode, srv.prescId)}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="حذف"
                    >
                      <FeatherIcon icon="trash" className="prescItembtns" />
                    </button>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="d-flex mt-2 gap-2 flex-wrap">
                    <div className="d-flex gap-2">
                      <div className="srvTypeInfo">
                        نوع نسخه : {srv.PrescType}
                      </div>
                      <div className="srvTypeInfo">تعداد : {srv.Qty}</div>
                    </div>

                    {srv.TimesADay ? (
                      <div className="d-flex gap-2">
                        <div className="srvTypeInfo">
                          تعداد مصرف در روز : {srv.TimesADay}
                        </div>
                        <div className="srvTypeInfo">
                          دستور مصرف : {srv.DrugInstruction}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
};

export default AddToListItem;
