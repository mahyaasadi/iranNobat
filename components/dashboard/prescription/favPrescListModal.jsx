import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import { Tooltip } from "primereact/tooltip";
import { Accordion, AccordionTab } from "primereact/accordion";

const FavPrescListModal = ({
  data,
  isLoading,
  show,
  onHide,
  handleEditPrescItem,
  handleAddFavItem,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">نسخه های پرمصرف</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body dir="ltr" className="favModalBody">
        <Accordion dir="rtl" multiple>
          {data?.map((srv, index) => (
            <AccordionTab
              key={index}
              header={
                <div className="d-flex">
                  <div className="d-flex col-9 gap-2 font-13 align-items-center">
                    {srv.Img ? (
                      <Image
                        src={srv.Img}
                        alt="serviceIcon"
                        width="25"
                        height="25"
                      />
                    ) : (
                      ""
                    )}

                    <div className="d-flex gap-2 font-13 align-items-center prescDetails">
                      <p className="mb-0">{srv.SrvCode}</p>
                      <p className="mb-0">|</p>
                      <p>{srv.SrvName}</p>
                    </div>
                  </div>

                  <div className="d-flex col-3 gap-1 justify-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary addBtn"
                      onClick={() => handleEditPrescItem(srv, 1)}
                      data-pr-position="top"
                    >
                      <Tooltip target=".addBtn">اضافه به لیست</Tooltip>
                      <FeatherIcon icon="plus" className="prescItembtns" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger removeBtn"
                      // onClick={() => _DeleteService(srv.SrvCode, srv.prescId)}
                      data-pr-position="top"
                    >
                      <Tooltip target=".removeBtn">حذف</Tooltip>
                      <FeatherIcon icon="trash" className="prescItembtns" />
                    </button>
                  </div>
                </div>
              }
            >
              <div className="row">
                <div className="d-flex mt-2 gap-2 flex-wrap">
                  <div className="d-flex gap-2 ">
                    <div className="srvTypeInfo">
                      نوع نسخه : {srv.PrescType}
                    </div>
                    <div className="srvTypeInfo">تعداد : {srv.Qty}</div>
                  </div>

                  {srv.TimesADay ? (
                    <div className="d-flex gap-2">
                      <div className="srvTypeInfo">
                        تعداد مصرف در روز : {srv.TimesADay}
                      </div>
                      <div className="srvTypeInfo">
                        دستور مصرف : {srv.DrugInstruction}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </AccordionTab>
          ))}
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};

export default FavPrescListModal;
