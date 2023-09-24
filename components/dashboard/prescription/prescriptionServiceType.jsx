const PrescriptionServiceType = ({
  srvType,
  prescTypeId,
  srvTypeDes,
  Active,
}) => {
  let Hide = "disNone";
  if (Active) {
    Hide = "";
  }

  return (
    <>
      <option
        type="button"
        value={srvType}
        className={"" + Active + "" + Hide + "prescTypeId" + prescTypeId}
        id={"prescService" + srvType}
      >
        {srvTypeDes}
      </option>
    </>
  );
};

export default PrescriptionServiceType;
