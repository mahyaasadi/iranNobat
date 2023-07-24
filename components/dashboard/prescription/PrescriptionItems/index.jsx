import AddToListItem from "components/dashboard/Prescription/AddToListItem";

const PrescriptionItems = ({ data, SetPrescriptionItemsData, DeleteService }) => {
  return data.map((srv, index) => {
    // console.log("srv", srv);
    return (
      <AddToListItem
        key={index}
        data={data}
        SrvName={srv.SrvName}
        SrvCode={srv.SrvCode}
        Img={srv.Img}
        SrvQty={srv.Qty}
        TimesADay={srv.TimesADay}
        DrugInstruction={srv.DrugInstruction}
        SrvTypeDes={srv.PrescType}
        prescId={srv.prescId}
        SetPrescriptionItemsData={SetPrescriptionItemsData}
      />
    );
  });
};
export default PrescriptionItems;
