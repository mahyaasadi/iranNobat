import AddToListItem from "components/dashboard/Prescription/AddToListItem";
const PrescriptionItems = ({data}) => {
    return (
        data.map((srv)=>{
            console.log(srv);
            return <AddToListItem SrvName={srv.SrvName} SrvCode={srv.SrvCode} Img={srv.Img} />
        })
    )
}
export default PrescriptionItems