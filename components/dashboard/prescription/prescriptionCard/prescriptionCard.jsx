import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import PrescriptionType from "components/dashboard/prescription/prescriptionType";
import ServiceType from "components/dashboard/prescription/serviceType";
import TaminSrvSerach from "components/dashboard/prescription/TaminSrvSerach";

const PrescriptionCard = ({
  lists,
  onSelect,
  changePrescId,
  ServiceList,
  SearchTaminSrv,
  TaminSrvSerachList,
  SelectSrvSearch,
  FuAddToListItem,
  registerEpresc,
}) => {
  function QtyChange(ac) {
    let qty = $("#QtyInput").val();
    qty = parseInt(qty);
    if (ac == "+") {
      qty = qty + 1;
    } else {
      if (qty != 1) {
        qty = qty - 1;
      }
    }
    $("#QtyInput").val(qty);
  }

  return (
    <>
      <div>
        <div className="card presCard">
          <div className="card-body">
            <div className="prescript-header">
              <div className="prescript-title">نسخه جدید</div>

              <div className="prescript-btns d-flex gap-2">
                <div
                  className="btn border-radius visitBtn font-13"
                  onClick={() => registerEpresc(1)}
                >
                  فقط ثبت ویزیت
                </div>
                <div className="btn btn-primary border-radius font-13">
                  ثبت نسخه نهایی
                </div>
              </div>
            </div>

            {/*  */}
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-bottom">
                {lists.map((item) => {
                  return (
                    <PrescriptionType
                      key={item.type}
                      name={item.name}
                      img={item.img}
                      active={item.Active}
                      id={item.id}
                      onSelect={onSelect}
                      changePrescId={changePrescId}
                    />
                  );
                })}
              </ul>
              <hr />
              <form className="w-100 pt-2" onSubmit={SearchTaminSrv}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend"></div>

                  <lable className="lblAbs font-12">
                    نام / کد خدمت یا دارو
                  </lable>
                  <input
                    type="text"
                    id="srvSerachInput"
                    name="srvSerachInput"
                    className="form-control rounded-right w-50"
                  />
                  
                  <select
                    className="form-select disNone"
                    id="ServiceSearchSelect"
                    onChange={() =>
                      changePrescId($("#ServiceSearchSelect").val())
                    }
                  >
                    {ServiceList.map((item) => {
                      return (
                        <ServiceType
                          key={item.srvType}
                          srvType={item.srvType}
                          srvTypeDes={item.srvTypeDes}
                          prescTypeId={item.prescTypeId}
                          Active={item.Active}
                          changePrescId={changePrescId}
                        />
                      );
                    })}
                  </select>
                  <button
                    className="btn btn-primary rounded-left w-10"
                    id="basic-addon1"
                  >
                    <i className="fe fe-search"></i>
                  </button>
                </div>
              </form>

              {/* tamin search */}
              <div className="col-12 SearchDiv">
                <TaminSrvSerach
                  data={TaminSrvSerachList}
                  SelectSrvSearch={SelectSrvSearch}
                />
              </div>

              <div className="row ">
                <div className="col-md-3">
                  <label className="lblAbs margin-top-left font-12">
                    تعداد
                  </label>
                  <div className="row mt-2">
                    <div className="col-auto">
                      <button
                        className="btn btn-primary btn-rounded"
                        onClick={() => QtyChange("+")}
                      >
                        <i className="fe fe-plus"></i>
                      </button>
                    </div>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control text-center rounded"
                        id="QtyInput"
                        name="QTY"
                        dir="ltr"
                        value="1"
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-primary btn-rounded"
                        onClick={() => QtyChange("-")}
                      >
                        <i className="fe fe-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <label className="lblAbs margin-top-25 font-12">
                    توضیحات
                  </label>
                  <input
                    type="text"
                    className="mt-2 form-control text-center rounded"
                    id="eprscItemDescription"
                    // placeholder="توضیحات"
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn rounded w-100 mt-2 addToListBtn font-13"
                    onClick={FuAddToListItem}
                  >
                    اضافه به لیست
                  </button>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
export default PrescriptionCard;
