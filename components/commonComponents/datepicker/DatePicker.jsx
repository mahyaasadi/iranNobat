import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import DtPicker, { convertToFa } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";

const DatePicker = ({ SetDate }) => {
  const setDateLocal = (value) => {
    let dateFrom =
      value?.from?.year.toString() +
      value?.from?.month.toString() +
      value?.from?.day.toString();
    let dateTo =
      value?.to?.year.toString() +
      value?.to?.month.toString() +
      value?.to?.day.toString();
    SetDate(dateFrom, dateTo);
  };
  return (
    <>
      <div className="datePickerContainer d-flex align-items-center">
        <label className="lblAbs datePickerLbl font-12">
          جستجو طبق بازه تاریخ
        </label>
        <DtPicker
          onChange={setDateLocal}
          type="range"
          local="fa"
          inputClass="datePickerInput rounded font-12"
          headerClass="datePickerHeader"
          calenderModalClass="calenderModalContainer"
          placeholder="&nbsp;"
          inputName="date"
        />

        <i className="calendarIcon text-secondary">
          <FeatherIcon icon="calendar" />
        </i>
      </div>
    </>
  );
};
export default DatePicker;
