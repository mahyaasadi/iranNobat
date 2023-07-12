const AddToListItem = ({
  SrvName,
  SrvCode,
  Img,
  SrvTypeDes,
  SrvQty,
  TimesADay,
  DrugInstruction,
}) => {
  return (
    <div className="card PrescItem" id="{response.data.res.info.checkCode}">
      <div className="card-body">
        <div className="row">
          <div className="col-auto">
            <img src={Img} height="30" />
          </div>
          <div className="row col">
            <div className="col d-flex gap-2">
              <p>{SrvCode}</p>
              <p>|</p>
              <p>{SrvName}</p>
            </div>
            <div className="d-flex gap-4 mt-2">
              <div className="srvTypeInfo">نوع نسخه : {SrvTypeDes}</div>
              <div className="srvTypeInfo">
                مقدار : {SrvQty}
              </div>
              <div className="srvTypeInfo">
                تعداد مصرف در روز : {TimesADay}
              </div>
              <div className="srvTypeInfo">دستور مصرف : {DrugInstruction}</div>
            </div>
          </div>

          <div className="col-auto">
            <button
              type="button"
              className="btn btn-outline-primary btn-rounded"
            >
              <i className="fe fe-star"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-rounded"
              //   onClick="DeleteCheckService()"
            >
              <i className="fe fe-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddToListItem;
