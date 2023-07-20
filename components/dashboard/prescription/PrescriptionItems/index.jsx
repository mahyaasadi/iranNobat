import AddToListItem from "components/dashboard/Prescription/AddToListItem";

const PrescriptionItems = ({ data, SetPrescriptionItemsData }) => {
  return data.map((srv, index) => {
    // console.log("srv", srv);
    return (
      <AddToListItem
        key={index}
        SrvName={srv.SrvName ? srv.SrvName : srv["srvId"]["srvName"]}
        SrvCode={srv.SrvCode ? srv.SrvCode : srv["srvId"]["srvCode"]}
        Img={srv.Img}
        SrvQty={srv.Qty ? srv.Qty : srv["srvQty"]}
        TimesADay={srv.TimesADay ? srv.TimesADay : srv["timesAday"]}
        DrugInstruction={
          srv.DrugInstruction ? srv.DrugInstruction : srv["drugInstruction"]
        }
        SrvTypeDes={
          srv.PrescType ? srv.PrescType : srv["srvId"]["srvType"]["srvTypeDes"]
        }
        // DeleteService={DeleteService}
        SetPrescriptionItemsData={SetPrescriptionItemsData}
        data={data}
      />
    );
  });
};
export default PrescriptionItems;
