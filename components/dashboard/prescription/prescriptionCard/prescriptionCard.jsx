import { useState, useEffect, useRef } from "react";
import { axiosClient } from "class/axiosConfig";
import SelectField from "components/commonComponents/selectfield";
import RequiredSelect from "components/commonComponents/selectfield";
import PrescriptionType from "components/dashboard/prescription/prescriptionType";
import ServiceType from "components/dashboard/prescription/serviceType";
import TaminSrvSearch from "components/dashboard/prescription/TaminSrvSearch";
import ExtraSmallLoader from "components/loading/extraSmallLoader";
import selectfieldColourStyles from "class/selectfieldStyle";

const PrescriptionCard = ({
  lists,
  onSelect,
  changePrescId,
  ChangeActiveServiceTypeID,
  ServiceList,
  SearchTaminSrv,
  TaminSrvSearchList,
  SelectSrvSearch,
  FuAddToListItem,
  registerEpresc,
  FUSelectInstructionType,
  FUSelectDrugAmount,
  ActiveSearch,
  FUSelectAmountArray,
  FUSelectInstructionArray,
  handleOnBlur,
  handleOnFocus,
}) => {
  const [drugInstructionList, setDrugInstructionList] = useState([]);
  const [drugAmountList, setDrugAmountList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // search recommendation
  const handleSearchKeyUp = () => {
    setIsLoading(true);
    let inputCount = $("#srvSearchInput").val().length;

    if (inputCount > 2) {
      setTimeout(() => {
        $("#BtnServiceSearch").click();
      }, 100);
      setIsLoading(false);
    } else {
      $("#srvSearchInput").val() == "";
      $(".SearchDiv").hide();
      setIsLoading(false);
    }
  };

  const getDrugInstructionsList = () => {
    let url = "TaminEprsc/DrugInstruction";

    axiosClient
      .post(url)
      .then((response) => {
        let selectInstructionData = [];
        for (let i = 0; i < response.data.res.data.length; i++) {
          const item = response.data.res.data[i];
          let obj = {
            value: item.drugInstId,
            label: item.drugInstConcept,
          };
          selectInstructionData.push(obj);
        }
        setDrugInstructionList(selectInstructionData);
        FUSelectInstructionArray(selectInstructionData);
      })
      .catch((error) => console.log(error));
  };

  const getDrugAmountList = () => {
    let url = "TaminEprsc/DrugAmount";
    axiosClient
      .post(url)
      .then((response) => {
        let selectAmountData = [];
        for (let i = 0; i < response.data.res.data.length; i++) {
          const item = response.data.res.data[i];
          let obj = {
            value: item.drugAmntId,
            label: item.drugAmntConcept,
          };
          selectAmountData.push(obj);
        }
        setDrugAmountList(selectAmountData);
        FUSelectAmountArray(selectAmountData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDrugInstructionsList();
    getDrugAmountList();
  }, []);

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

                <div
                  className="btn btn-primary border-radius font-13"
                  onClick={() => registerEpresc(0)}
                >
                  ثبت نسخه نهایی
                </div>
              </div>
            </div>

            {/*  */}
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-bottom nav-tabs-scroll">
                {lists.map((item, index) => {
                  return (
                    <PrescriptionType
                      key={index}
                      name={item.name}
                      img={item.img}
                      active={item.Active}
                      id={item.id}
                      changePrescId={changePrescId}
                      ChangeActiveServiceTypeID={ChangeActiveServiceTypeID}
                    />
                  );
                })}
              </ul>
              <hr />
              <form className="w-100 pt-2" onSubmit={SearchTaminSrv}>
                <div className="input-group mb-3 inputServiceContainer">
                  <label className="lblAbs font-12">
                    نام / کد خدمت یا دارو
                  </label>
                  <input
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onKeyUp={handleSearchKeyUp}
                    type="text"
                    autoComplete="off"
                    id="srvSearchInput"
                    name="srvSearchInput"
                    className="form-control rounded-right w-50 padding-right-2"
                  />

                  <select
                    className="form-select disNone"
                    id="ServiceSearchSelect"
                    onChange={() =>
                      ChangeActiveServiceTypeID($("#ServiceSearchSelect").val())
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
                        />
                      );
                    })}
                  </select>

                  {/* search buttons */}
                  <button
                    className="btn btn-primary rounded-left w-10 disNone"
                    id="BtnActiveSearch"
                    onClick={ActiveSearch}
                    type="button"
                  >
                    <i className="fe fe-close"></i>
                  </button>
                  <button
                    className="btn btn-primary rounded-left w-10"
                    id="BtnServiceSearch"
                  >
                    {isLoading ? (
                      <ExtraSmallLoader />
                    ) : (
                      <i className="fe fe-search"></i>
                    )}
                  </button>
                </div>

                <div className="col-12 SearchDiv" id="searchDiv">
                  <TaminSrvSearch
                    data={TaminSrvSearchList}
                    SelectSrvSearch={SelectSrvSearch}
                  />
                </div>

                <div className="unsuccessfullSearch">
                  <p>موردی یافت نشد!</p>
                </div>
              </form>

              <div className="d-flex align-items-center gap-2 media-flex-column flex-wrap">
                <div className="col-auto media-w-100">
                  <label className="lblAbs margin-top-left font-12">
                    تعداد
                  </label>
                  <div className="row">
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
                        defaultValue="1"
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

                <div className="col media-w-100" id="drugInstruction">
                  <label className="lblDrugIns font-12">زمان مصرف</label>
                  <SelectField
                    styles={selectfieldColourStyles}
                    className="w-100 font-12 text-center prescForm"
                    id="drugInsSelect"
                    options={drugInstructionList}
                    placeholder={" "}
                    required
                    onChangeValue={(value) =>
                      FUSelectInstructionType(value?.value)
                    }
                  />
                </div>

                <div className="col media-w-100" id="drugAmount">
                  <label className="lblDrugIns font-12">تعداد در وعده</label>
                  <SelectField
                    styles={selectfieldColourStyles}
                    className="w-100 font-12 text-center prescForm"
                    id="drugAmountSelect"
                    options={drugAmountList}
                    placeholder={" "}
                    required
                    onChangeValue={(value) => FUSelectDrugAmount(value?.value)}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 media-flex-column media-gap margin-top-1">
                <div className="col-md-8 media-w-100">
                  <label className="lblAbs font-12">توضیحات</label>
                  <input
                    type="text"
                    className="form-control rounded padding-right-2"
                    id="eprscItemDescription"
                  />
                </div>
                <div className="col-md-4 media-w-100">
                  <button
                    className="btn rounded w-100 addToListBtn font-13"
                    onClick={FuAddToListItem}
                  >
                    اضافه به لیست
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionCard;
