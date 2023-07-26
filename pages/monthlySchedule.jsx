import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import JDate from "jalali-date";
import moment from "jalali-moment";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Modal, Button } from "react-bootstrap";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import multiColors from "react-multi-date-picker/plugins/colors";

const MonthlySchedule = () => {
  // let jdate = new JDate();
  // const [date, setDate] = useState(moment().locale("fa").format("MMMM YYYY"));
  // // console.log(date);

  // const handleNextMonth = () => {
  //   setDate(moment().locale("fa").add(1, "months").format("MMMM YYYY"));
  //   console.log(date);
  // };

  // const handleLastMonth = () => {
  //   setDate(moment().locale("fa").subtract(1, "months").format("MMMM YYYY"));
  //   console.log(date);
  // };
  // return (
  //   <>
  //     <Head>
  //       <title>برنامه ماهیانه</title>
  //     </Head>
  //     <div className="page-wrapper">
  //       <div className="content container-fluid">
  //         <div className="card">
  //           <div className="card-body cardBodyPadding">
  //             <div className="monthContainer align-items-center gap-4">
  //               <button className="btn" onClick={handleNextMonth}>
  //                 <i className="fa fa-angle-right"></i>
  //               </button>
  //               {date}
  //               <button className="btn" onClick={handleLastMonth}>
  //                 <i className="fa fa-angle-left"></i>
  //               </button>
  //             </div>
  //             <div className="timeTable">
  //               <table>
  //                 <tr className="tableHeader">
  //                   <th className="timeTableHeader">شنبه</th>
  //                   <th className="timeTableHeader">یکشنبه</th>
  //                   <th className="timeTableHeader">دوشنبه</th>
  //                   <th className="timeTableHeader">سه شنبه</th>
  //                   <th className="timeTableHeader">چهارشنبه</th>
  //                   <th className="timeTableHeader">پنجشنبه</th>
  //                   <th className="timeTableHeader">جمعه</th>
  //                 </tr>
  //                 <tr className="tableRow">
  //                   <td className="cells noRightBorder">
  //                     1
  // <div className="scheduleFeatures">
  //   <i className="d-flex   flex-column">
  //     <button className="btn">
  //       <FeatherIcon icon="settings" />
  //     </button>
  //     <button className="btn">
  //       <FeatherIcon icon="copy" />
  //     </button>
  //   </i>
  // </div>
  //                   </td>
  //                   <td className="cells">
  //                     2
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     3
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     4
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     5
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     6
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells noLeftBorder">
  //                     7
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                 </tr>
  //                 <tr className="tableRow">
  //                   <td className="cells noRightBorder">
  //                     8
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     9
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     10
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     11
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     12
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     13
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells noLeftBorder">
  //                     14
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                 </tr>
  //                 <tr className="tableRow">
  //                   <td className="cells noRightBorder">
  //                     15
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     16
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     17
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     18
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     19
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     20
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells noLeftBorder">
  //                     21
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                 </tr>
  //                 <tr className="tableRow">
  //                   <td className="cells noRightBorder">
  //                     22
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     23
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     24
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     25
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     26
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells">
  //                     27
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells noLeftBorder">
  //                     28
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                 </tr>
  //                 <tr className="tableRow">
  //                   <td className="cells noRightBorder noBottomBorder">
  //                     29
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells noBottomBorder">
  //                     30
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                   <td className="cells noBottomBorder">
  //                     31
  //                     <div className="scheduleFeatures">
  //                       <i className="d-flex flex-column">
  //                         <button className="btn">
  //                           <FeatherIcon icon="settings" />
  //                         </button>
  //                         <button className="btn">
  //                           <FeatherIcon icon="copy" />
  //                         </button>
  //                       </i>
  //                     </div>
  //                   </td>
  //                 </tr>
  //               </table>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  const dateObject = new DateObject();
  const toDateObject = (day) => new DateObject(dateObject).setDay(day);

  const colors = {
    green: [2, 10, 17].map(toDateObject),
    blue: [5, 6, 14].map(toDateObject),
    red: [13, 19, 25].map(toDateObject),
    yellow: [15, 22, 28].map(toDateObject),
  };

  const initialProps = {
    value: [...colors.green, ...colors.blue, ...colors.red, ...colors.yellow],
    multiple: true,
  };

  const [props, setProps] = useState(initialProps);
  const isRTL = ["fa", "ar"].includes(props.locale?.name?.split?.("_")?.[1]);

  const [value, setValue] = useState(new Date());
  console.log("value : ", value);
  const handleModal = () => {
    // $("#addUserModal").modal("show");
    // <Link
    //   href="#"
    //   data-bs-toggle="modal"
    //   data-bs-target="#addUserModal"
    //   className="btn btn-primary btn-add font-14 media-font-12"
    // ></Link>;

    $(".scheduleFeatures").toggle();
  };

  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/*  */}
          {/* <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
          </div> */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
              {/* {} */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="card">
            <div className="card-body calendar-body p-0">
              <Calendar
                {...props}
                plugins={[
                  <DatePanel
                    position={isRTL ? "left" : "right"}
                    sort="date"
                    eachDaysInRange={
                      !props.onlyMonthPicker && !props.onlyYearPicker
                    }
                  />,
                ]}
                calendar={persian}
                locale={persian_fa}
                monthYearSeparator="|"
                value={value}
                onChange={setValue}
                // onClick={handleShow}
                // onPropsChange={}
              >
                <div
                  className="btn btn-primary"
                  style={{ margin: "5px" }}
                  onClick={handleShow}
                >
                  نمایش شیفت ها
                </div>
                <div className="scheduleFeatures">
                  <i className="d-flex flex-column">
                    <button className="btn">
                      <FeatherIcon icon="settings" />
                    </button>
                    <button className="btn">
                      <FeatherIcon icon="copy" />
                    </button>
                  </i>
                </div>
              </Calendar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MonthlySchedule;

