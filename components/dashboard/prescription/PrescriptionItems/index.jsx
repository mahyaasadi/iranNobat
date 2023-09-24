// import { useEffect } from "react";
// import AddToListItem from "@/components/dashboard/prescription/AddToListItem";

// const PrescriptionItems = ({ data, SetPrescriptionItemsData }) => {
//   useEffect(() => {
//     console.log("data in prescItems", data);
//   }, [data]);

//   return data.map((srv, index) => {
//     return (
//       <AddToListItem
//         key={index}
//         srv={srv}
//         SetPrescriptionItemsData={SetPrescriptionItemsData}
//       // data={data}
//       />
//     );
//   });
// };
// export default PrescriptionItems;

import Image from "next/image";

let count,
  Drug = null;
const AddToListItem = ({
  data,
  // SetPrescriptionItemsData,
  srv
}) => {
  // if (srv.TimesADay) {
  //   Drug = (
  //     <>
  //       <div className="srvTypeInfo">تعداد مصرف در روز : {srv.TimesADay}</div>
  //       <div className="srvTypeInfo">دستور مصرف : {srv.DrugInstruction}</div>
  //     </>
  //   );
  // } else {
  //   <div></div>;
  // }

  // Delete Service from prescItems
  // const DeleteService = (id, prescId) => {
  //   SetPrescriptionItemsData(data.filter((a) => a.SrvCode !== id));

  //   count = $("#srvItemCountId" + prescId).html();
  //   if (count == "") {
  //     count = 0;
  //   }
  //   count = parseInt(count);
  //   count--;
  //   $("#srvItemCountId" + prescId).html(count);

  //   // if (count === 0) {
  //   //   $("#srvItemCountId" + prescId).hide();
  //   // }
  // };

  return data.map((srv, index) => {
    console.log({ srv });
    return (
      <>
        <div dir="rtl">
          <div className="card PrescItem" id="checkCode">
            <div className="card-body">
              <div className="row">
                <div className="col-auto">
                  {srv.Img ? (
                    <Image
                      src={srv.Img}
                      alt="serviceIcon"
                      width="30"
                      height="30"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="row col">
                  <div className="col d-flex gap-2 marginb-1 font-13">
                    <p>{srv.SrvCode}</p>
                    <p>|</p>
                    <p>{srv.SrvName}</p>
                  </div>
                  <hr />
                  <div className="d-flex mt-2 gap-2 flex-wrap">
                    <div className="d-flex gap-2">
                      <div className="srvTypeInfo">نوع نسخه : {srv.PrescType}</div>
                      <div className="srvTypeInfo">تعداد : {srv.Qty}</div>
                    </div>

                    {srv.TimesADay ? (
                      <div className="d-flex gap-2">
                        <div className="srvTypeInfo">تعداد مصرف در روز : {srv.TimesADay}</div>
                        <div className="srvTypeInfo">دستور مصرف : {srv.DrugInstruction}</div>
                      </div>
                    ) : ""}
                  </div>
                </div>

                <div className="col-auto prescMediaBtn">
                  <button
                    type="button"
                    className="btn btn-outline-primary margin-left-4"
                  >
                    <i className="fe fe-star"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => DeleteService(srv.SrvCode, srv.prescId)}
                  >
                    <i className="fe fe-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  )
}

export default AddToListItem;

