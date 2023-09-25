import { useState, useEffect } from "react";
import DatePicker from "components/commonComponents/datepicker/DatePicker";

const SearchPrescHistory = () => {
  let dateFrom,
    dateTo = null;

  const SetDate = (f, t) => {
    dateFrom = f;
    dateTo = t;
  };

  return (
    <>
      {/* <div className="card"> */}
      <div className="card-header border-bottom-0 margin-top-1 margin-bottom-4">
        <form>
          <div className="row">
            <div className="col-md-12 col-lg-3 mt-3">
              <DatePicker SetDate={SetDate} />
            </div>

            <div className="col-md-12  col-md-9 col-lg-3 mt-3">
              <div className="input-group">
                <label className="lblAbs font-12 ">جستجو طبق کد ملی</label>
                <input
                  type="text"
                  name="nationalCode"
                  required
                  className="form-control rounded"
                />
              </div>
            </div>

            <div className="col-md-12  col-md-9 col-lg-3 mt-3">
              <div className="input-group">
                <label className="lblAbs font-12 ">جستجو طبق نام بیمار</label>
                <input
                  type="text"
                  name="patientName"
                  required
                  className="form-control rounded"
                />
              </div>
            </div>

            <div className="col-md-12 col-md-12 col-lg-3 mt-3">
              <button className="btn btn-primary rounded w-100" id="">
                <i className="fe fe-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* </div> */}
    </>
  );
};

export default SearchPrescHistory;
