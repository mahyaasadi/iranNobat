const AddToListItem = ({ SrvName, SrvCode, Img, Errors }) => {
  return (
    <div className="card PrescItem" id="{response.data.res.info.checkCode}">
      <div className="card-body">
        <div className="row">
          <div className="col-auto">
            <img src={Img} height="30" />
          </div>
          <div className="col">
            {SrvCode} | {SrvName}
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
              //   onclick="DeleteCheckService()"
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
