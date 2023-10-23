import { Modal } from "react-bootstrap";
import PinInput from "react-pin-input";

const PrescPinInput = ({ onSubmit, show, onHide, getPinInputValue }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">
            تایید کد ارسال شده
          </p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div dir="ltr" className="">
            <PinInput
              length={6}
              initialValue=""
              secret
              secretDelay={800}
              type="numeric"
              inputMode="numeric"
              focus="true"
              // onChange={(value, index) => {}}
              onComplete={(value, index) => getPinInputValue(value)}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              inputFocusStyle={{ borderColor: "blue" }}
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
          {/* <div className="submit-section d-flex justify-center align-items-center">
            <button
              type="submit"
              className="btn btn-sm btn-primary rounded btn-save font-13 "
            >
              ثبت
            </button>
          </div> */}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PrescPinInput;
