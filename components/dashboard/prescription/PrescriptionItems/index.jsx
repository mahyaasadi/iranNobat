import AddToListItem from "components/dashboard/Prescription/AddToListItem";

const PrescriptionItems = ({ data }) => {
  console.log(data);
  return data.map((srv, index) => {
    // console.log(srv);
    return (
      <AddToListItem
        key={index}
        SrvName={srv.SrvName ? srv.SrvName : srv.srvId["srvName"]}
        SrvCode={srv.SrvCode ? srv.SrvCode : srv.srvId["srvCode"]}
        Img={srv.Img}
        SrvTypeDes={
          srv.SrvTypeDes ? srv.SrvTypeDes : srv.srvId["srvType"]["srvTypeDes"]
        }
        SrvQty={srv.srvQty ? srv.srvQty : "-"}
        TimesADay={srv.TimesADay ? srv.TimesADay : "-"}
        DrugInstruction={srv.drugInstruction ? srv.drugInstruction : "-"}
      />
    );
  });
};
export default PrescriptionItems;
