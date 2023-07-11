import AddToListItem from "components/dashboard/Prescription/AddToListItem";

const PrescriptionItems = ({ data }) => {
  console.log(data);
  return data.map((srv, index) => {
    // console.log(srv);

    return (
      <AddToListItem
        key={index}
        SrvName={srv.SrvName ? srv.SrvName : srv.srvId["srvName"]}
        SrvCode={srv.SrvCode ? srv.SrvCode : srv.srvId["SrvCode"]}
        Img={srv.Img}
      />
    );
  });
};
export default PrescriptionItems;
