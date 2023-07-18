// import { forEach } from "public/assets/plugins/fontawesome/js/v4-shims";
// import PrescriptionType from "../PrescriptionType";
// import ServiceType from "../serviceType";
// import TaminSrvSearch from "../TaminSrvSearch";
// import { map } from "jquery";

// const Header = ({
//   lists,
//   ServiceList,
//   onSelect,
//   changePrescId,
//   SearchTaminSrv,
//   TaminSrvSearchList,
//   SelectSrvSearch,
//   FuAddToListItem,
// }) => {
//   const handleKeyUp = (event) => {
//     if (event.key === "Enter") {
//       SearchTaminSrv(event.target.value);
//     }
//     // if (event.target.value.length > 3){
//     //   SearchTaminSrv(event.target.value)
//     // }
//   };

//   function QtyChange(ac) {
//     let qty = $("#QtyInput").val();
//     qty = parseInt(qty);
//     if (ac == "+") {
//       qty = qty + 1;
//     } else {
//       if (qty != 1) {
//         qty = qty - 1;
//       }
//     }
//     $("#QtyInput").val(qty);
//   }

//   return (
//     <>
//       <ul className="nav nav-tabs nav-tabs-bottom">
//         {lists.map((item) => {
//           return (
//             <PrescriptionType
//               key={item.type}
//               name={item.name}
//               img={item.img}
//               active={item.Active}
//               id={item.id}
//               onSelect={onSelect}
//               changePrescId={changePrescId}
//             />
//           );
//         })}
//       </ul>

//       <hr />

//       <div className="row">
//         <div className="input-group mb-3 rounded">
//           <input
//             type="text"
//             className="form-control w-50 roundedRight"
//             id="SrvSearchInput"
//             placeholder="کد یا نام خدمت"
//             aria-label="کد یا نام خدمت"
//             aria-describedby="basic-addon2"
//             onKeyUp={handleKeyUp}
//           />
//           <select
//             className="form-select disNone w-20"
//             id="ServiceSearchSelect"
//             onChange={() => changePrescId($("#ServiceSearchSelect").val())}
//           >
//             {ServiceList.map((item) => {
//               return (
//                 <ServiceType
//                   key={item.srvType}
//                   srvType={item.srvType}
//                   srvTypeDes={item.srvTypeDes}
//                   prescTypeId={item.prescTypeId}
//                   Active={item.Active}
//                   changePrescId={changePrescId}
//                 />
//               );
//             })}
//           </select>
//           <button className="btn btn-primary roundedLeft w-100px">
//             <i className="fe fe-search"></i>
//           </button>
//         </div>
//         <div className="col-12 SearchDiv">
//           <TaminSrvSearch
//             data={TaminSrvSearchList}
//             SelectSrvSearch={SelectSrvSearch}
//           />
//         </div>
//       </div>
//       <div className="tab-content">
//         <div className="tab-pane show" id="bottom-tab1">
//           Tab content 1
//         </div>
//       </div>
//       <div className="row ">
//         <div className="col-md-3">
//           <label for="">تعداد</label>
//           <div className="row mt-2">
//             <div className="col-auto">
//               <button
//                 className="btn btn-primary btn-rounded"
//                 onClick={() => QtyChange("+")}
//               >
//                 <i className="fe fe-plus"></i>
//               </button>
//             </div>
//             <div className="col p-0">
//               <input
//                 type="text"
//                 className="form-control text-center rounded"
//                 id="QtyInput"
//                 name="QTY"
//                 dir="ltr"
//                 value="1"
//               />
//             </div>
//             <div className="col-auto">
//               <button
//                 className="btn btn-primary btn-rounded"
//                 onClick={() => QtyChange("-")}
//               >
//                 <i className="fe fe-minus"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-7">
//           <label for="">توضیحات</label>
//           <input
//             type="text"
//             className="mt-2 form-control text-center rounded"
//             id="SalamatDescription"
//             placeholder="توضیحات"
//           />
//         </div>
//         <div className="col-md-2 mt-2">
//           <br />
//           <button
//             className="btn btn-success rounded w-100 mt-2"
//             onClick={FuAddToListItem}
//           >
//             اضافه به لیست
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;
