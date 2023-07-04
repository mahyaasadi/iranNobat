import Image from "next/image";

const PatientInfo = ({ data, getAppointment }) => {
  return (
    <div className="font-13 mt-3" id="patientInfoSection">
      <input
        type="text"
        className="form-control border-radius font-13"
        placeholder="شماره موبایل بیمار"
        id="PatientMobile"
      />
      {/* <Image
        class="rounded-circle d-block m-auto"
        src={data.Avatar}
        width="150"
        height="100"
      /> */}
      <p className="mt-3">{data.Name}</p>
      <p className="mt-3">سن بیمار : {data.Age}</p>
      <p className="mt-3">تاریخ اعتبار تا {data.accountValidto}</p>
      <p>بیمه : {data.InsuranceName}</p>
      <p>نوع بیمه : {data.InsuranceTypeName}</p>

      <button
        className="btn btn-primary w-100 rounded font-13"
        onClick={getAppointment}
      >
        دریافت نوبت
      </button>
    </div>
  );
};

export default PatientInfo;
