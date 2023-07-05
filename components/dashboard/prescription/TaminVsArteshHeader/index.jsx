import { forEach } from "public/assets/plugins/fontawesome/js/v4-shims";
import PrescriptionType from "../PrescriptionType";
import ServiceType from "../serviceType";
import TaminSrvSerach from "../TaminSrvSerach";
import { map } from "jquery";

const Header = ({
  lists,
  ServiceList,
  onSelect,
  changePrescId,
  SearchTaminSrv,
  TaminSrvSerachList,
  SelectSrvSearch,
  FuAddToListItem,
}) => {
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      SearchTaminSrv(event.target.value);
    }
    // if (event.target.value.length > 3){
    //   SearchTaminSrv(event.target.value)
    // }
  };

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
      <ul class="nav nav-tabs nav-tabs-bottom">
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

      <div className="row">
        <div class="input-group mb-3 rounded">
          <input
            type="text"
            class="form-control w-50 roundedRight"
            id="SrvSearchInput"
            placeholder="کد یا نام خدمت"
            aria-label="کد یا نام خدمت"
            aria-describedby="basic-addon2"
            onKeyUp={handleKeyUp}
          />
          <select
            class="form-select disNone w-20"
            id="ServiceSearchSelect"
            onChange={() => changePrescId($("#ServiceSearchSelect").val())}
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
          <button class="btn btn-primary roundedLeft w-100px">
            <i class="fe fe-search"></i>
          </button>
        </div>
        <div className="col-12 SearchDiv">
          <TaminSrvSerach
            data={TaminSrvSerachList}
            SelectSrvSearch={SelectSrvSearch}
          />
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane show" id="bottom-tab1">
          Tab content 1
        </div>
      </div>
      <div class="row ">
        <div class="col-md-3">
          <label for="">تعداد</label>
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
          <label for="">توضیحات</label>
          <input
            type="text"
            class="mt-2 form-control text-center rounded"
            id="SalamatDescription"
            placeholder="توضیحات"
          />
        </div>
        <div class="col-md-2 mt-2">
          <br />
          <button
            class="btn btn-success rounded w-100 mt-2"
            onClick={FuAddToListItem}
          >
            اضافه به لیست
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
