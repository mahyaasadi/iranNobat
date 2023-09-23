import { useEffect } from "react";
import AddToListItem from "components/dashboard/Prescription/AddToListItem";

const PrescriptionItems = ({ data, SetPrescriptionItemsData }) => {
  useEffect(() => {
    console.log("data in prescItems", data);
  }, [data]);

  return data.map((srv, index) => {
    return (
      <AddToListItem
        key={index}
        srv={srv}
        SetPrescriptionItemsData={SetPrescriptionItemsData}
        // data={data}
      />
    );
  });
};
export default PrescriptionItems;
