import AddToListItem from "components/dashboard/Prescription/AddToListItem";

const PrescriptionItems = ({ data }) => {
  return data.map((srv, index) => {
    console.log(srv);
    return (
      <AddToListItem
        key={index}
        SrvName={srv.SrvName}
        SrvCode={srv.SrvCode}
        Img={srv.Img}
      />
    );
  });
};
export default PrescriptionItems;
