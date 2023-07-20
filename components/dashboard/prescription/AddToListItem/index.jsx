const AddToListItem = ({
  SrvName,
  SrvCode,
  Img,
  SrvTypeDes,
  SrvQty,
  TimesADay,
  DrugInstruction,
  // DeleteService,
  SetPrescriptionItemsData,
  data
}) => {

  let Drug = null;
  if (TimesADay) {
    Drug = (
      <>
        <div className="srvTypeInfo">تعداد مصرف در روز : {TimesADay}</div>
        <div className="srvTypeInfo">دستور مصرف : {DrugInstruction}</div>
      </>
    );
  } else {
    <div></div>;
  }

  const DeleteService = (id) => {
    SetPrescriptionItemsData(data.filter((a) => a.SrvCode !== id));
    console.log(id)
  }

  return (
    <>
      <div dir="rtl">
        <div className="card PrescItem" id="{response.data.res.info.checkCode}">
          <div className="card-body">
            <div className="row">
              <div className="col-auto">
                <img src={Img} height="30" />
              </div>
              <div className="row col">
                <div className="col d-flex gap-2 marginb-1 font-13">
                  <p>{SrvCode}</p>
                  <p>|</p>
                  <p>{SrvName}</p>
                </div>
                <hr />
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  <div className="srvTypeInfo">نوع نسخه : {SrvTypeDes}</div>
                  <div className="srvTypeInfo">تعداد : {SrvQty}</div>
                  {Drug}
                </div>
              </div>

              <div className="col-auto prescMediaBtn">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-rounded margin-left-4 "
                >
                  <i className="fe fe-star"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-rounded"
                  onClick={() => DeleteService(SrvCode)}
                >
                  <i className="fe fe-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddToListItem;
