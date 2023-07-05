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
  registerEpresc
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
                <div className="btn border-radius visitBtn font-13" onClick={()=>registerEpresc(1)}>
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
              <form
                className="w-100 pt-2"
                onSubmit={SearchTaminSrv}
              >
                <div class="input-group mb-3">
                  <div class="input-group-prepend"></div>

                  <lable className="lblAbs font-12">
                    نام / کد خدمت یا دارو
                  </lable>
                  <input
                    type="text"
                    id="srvSerachInput"
                    name="srvSerachInput"
                    class="form-control rounded-right w-50"
                  />
                  <select
                    class="form-select disNone"
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
                    class="btn btn-primary rounded-left w-10"
                    id="basic-addon1"
                  >
                    <i class="fe fe-search"></i>
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
              <div class="row ">
                <div class="col-md-3">
                  <label className="lblAbs margin-top-left font-12">
                    تعداد
                  </label>
                  <div class="row mt-2">
                    <div class="col-auto">
                      <button
                        class="btn btn-primary btn-rounded"
                        onClick={() => QtyChange("+")}
                      >
                        <i class="fe fe-plus"></i>
                      </button>
                    </div>
                    <div class="col p-0">
                      <input
                        type="text"
                        class="form-control text-center rounded"
                        id="QtyInput"
                        name="QTY"
                        dir="ltr"
                        value="1"
                      />
                    </div>
                    <div class="col-auto">
                      <button
                        class="btn btn-primary btn-rounded"
                        onClick={() => QtyChange("-")}
                      >
                        <i class="fe fe-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <label className="lblAbs margin-top-25 font-12">
                    توضیحات
                  </label>
                  <input
                    type="text"
                    class="mt-2 form-control text-center rounded"
                    id="eprscItemDescription"
                    // placeholder="توضیحات"
                  />
                </div>
                <div class="col-md-2">
                  <button
                    class="btn rounded w-100 mt-2 addToListBtn"
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
