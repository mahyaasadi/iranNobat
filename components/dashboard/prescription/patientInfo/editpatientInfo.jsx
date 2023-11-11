import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const EditPatientInfoModal = ({
  showModal,
  handleClose,
  handleChangePatientInfo,
  data,
  isLoading,
}) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [value, setValue] = useState("");

  const handleTabChange = (tab) => setSelectedTab(tab);
  const handleInputChange = (event) => setValue(event.target.value);

  const handleSubmit = () => {
    handleChangePatientInfo(selectedTab, value);
    handleClose();
  };

  useEffect(() => handleTabChange("Name"), []);

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">
            تغییر اطلاعات بیمار
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
          <li className="nav-item font-12">
            <a
              className="nav-link active"
              href="#solid-rounded-tab1"
              onClick={() => handleTabChange("Name")}
              data-bs-toggle="tab"
            >
              نام بیمار
            </a>
          </li>
          <li className="nav-item font-12">
            <a
              className="nav-link"
              href="#solid-rounded-tab2"
              onClick={() => handleTabChange("Age")}
              data-bs-toggle="tab"
            >
              سن بیمار
            </a>
          </li>
          <li className="nav-item font-12">
            <a
              className="nav-link"
              href="#solid-rounded-tab3"
              onClick={() => handleTabChange("Gender")}
              data-bs-toggle="tab"
            >
              جنسیت
            </a>
          </li>
          <li className="nav-item font-12">
            <a
              className="nav-link"
              href="#solid-rounded-tab4"
              onClick={() => handleTabChange("Tel")}
              data-bs-toggle="tab"
            >
              تلفن همراه
            </a>
          </li>
          <li className="nav-item font-12">
            <a
              className="nav-link"
              href="#solid-rounded-tab5"
              onClick={() => handleTabChange("NationalID")}
              data-bs-toggle="tab"
            >
              کد ملی
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane show active" id="solid-rounded-tab1">
            <Form.Group controlId="patientName">
              <label className="lblAbs font-12">نام</label>
              <Form.Control
                type="text"
                className="rounded"
                onChange={handleInputChange}
                defaultValue={data.Name}
              />
            </Form.Group>
          </div>
          <div className="tab-pane" id="solid-rounded-tab2">
            <Form.Group controlId="patientAge">
              <label className="lblAbs font-12">سن بیمار</label>
              <Form.Control
                type="text"
                className="rounded"
                onChange={handleInputChange}
                defaultValue={data.Age}
              />
            </Form.Group>
          </div>
          <div className="tab-pane" id="solid-rounded-tab3">
            <Form.Group controlId="patientGender">
              <label className="lblAbs font-12">جنسیت</label>
              <Form.Control
                type="text"
                className="rounded"
                onChange={handleInputChange}
                defaultValue={data.Gender}
              />
            </Form.Group>
          </div>
          <div className="tab-pane" id="solid-rounded-tab4">
            <Form.Group controlId="patientPhoneNumber">
              <label className="lblAbs font-12">تلفن همراه</label>
              <Form.Control
                type="tel"
                className="rounded"
                onChange={handleInputChange}
                defaultValue={data.Tel}
              />
            </Form.Group>
          </div>
          <div className="tab-pane" id="solid-rounded-tab5">
            <Form.Group controlId="patientNID">
              <label className="lblAbs font-12">کد ملی</label>
              <Form.Control
                type="text"
                dir="ltr"
                className="rounded"
                onChange={handleInputChange}
                defaultValue={data.NationalID}
              />
            </Form.Group>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-center">
        {isLoading ? (
          <Button variant="primary" disabled className="rounded w-25">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            در حال ثبت
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="rounded w-25"
          >
            ثبت
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditPatientInfoModal;
