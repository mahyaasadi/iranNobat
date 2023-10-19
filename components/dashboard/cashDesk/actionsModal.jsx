import { Modal } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";

const CashDeskActions = ({
  show,
  onHide,
  kartsOptionList,
  selectedKart,
  setSelectedKart,
  applyCashDeskActions,
  data,
  debt,
  handleDebtInput,
}) => {
  // console.log({ data });

  let totalQty = 0;
  let totalPrice = 0;
  let totalPatientCost = 0;
  let totalOrgCost = 0;
  let totalDiscount = 0;

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="mb-0 text-secondary font-14 fw-bold">
              وضعیت پرداخت ها
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={applyCashDeskActions}>
            <div className="row">
              <div className="cashDeskPatientInfo text-center rounded text-secondary col-lg-4 font-13">
                نام بیمار : {data?.Patient?.Name}
              </div>
              <div className="cashDeskPatientInfo text-center rounded text-secondary col-lg-4 font-13">
                پزشک ارجاع دهنده : {data?.RefDoc?.FullName}
              </div>
              <div className="cashDeskPatientInfo text-center rounded text-secondary col-lg-4 font-13">
                تاریخ نسخه : {data?.Date}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table mt-4 font-13 text-secondary">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">کد خدمت</th>
                    <th scope="col">نام خدمت</th>
                    <th scope="col">تعداد</th>
                    <th scope="col">مبلغ کل</th>
                    <th scope="col">سهم بیمار</th>
                    <th scope="col">سهم سازمان</th>
                    <th scope="col">تخفیف</th>
                  </tr>
                </thead>

                <tbody className="font-13 text-secondary">
                  {data?.Items?.map((x, index) => {
                    let findPrice = data.Calculated.find(
                      (a) => a.SrvCode === x.SrvID
                    );

                    totalQty += parseInt(x.QTY);
                    totalPrice += parseInt(findPrice.RowTotalPrice);
                    totalPatientCost +=
                      parseInt(findPrice.RowTotalPatientCost) -
                      parseInt(findPrice.Discount);
                    totalOrgCost +=
                      parseInt(findPrice.RowTotalPrice) -
                      parseInt(findPrice.RowTotalPatientCost);
                    totalDiscount += parseInt(findPrice.Discount);

                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{x.SrvID}</td>
                        <td>{x.SrvName}</td>
                        <td>{x.QTY}</td>
                        <td>{findPrice.RowTotalPrice.toLocaleString()}</td>
                        <td>
                          {(
                            findPrice.RowTotalPatientCost - findPrice.Discount
                          ).toLocaleString()}
                        </td>
                        <td>
                          {(
                            findPrice.RowTotalPrice -
                            findPrice.RowTotalPatientCost
                          ).toLocaleString()}
                        </td>
                        <td>{findPrice.Discount.toLocaleString()}</td>
                      </tr>
                    );
                  })}

                  <tr className="">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{totalQty.toLocaleString()}</td>
                    <td>{totalPrice.toLocaleString()}</td>
                    <td>{totalPatientCost.toLocaleString()}</td>
                    <td>{totalOrgCost.toLocaleString()}</td>
                    <td>{totalDiscount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className="marginb-1 margint-3" />

            <div className="row margint-3">
              <div className="form-group col-lg-6 col-12">
                <label className="lblAbs font-12">مبلغ پرداخت نقدی</label>
                <input
                  type="text"
                  dir="ltr"
                  className="form-control floating inputPadding rounded text-secondary"
                  name="cashPayment"
                />
              </div>

              <div className="form-group col-lg-6 col-12">
                <label className="lblAbs font-12">مبلغ پرداخت با کارت</label>
                <input
                  type="text"
                  dir="ltr"
                  className="form-control floating inputPadding rounded text-secondary"
                  name="cartPayment"
                  defaultValue={totalPatientCost}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-lg-6 col-12">
                <label className="lblAbs font-12">مبلغ بدهی</label>
                <input
                  type="text"
                  dir="ltr"
                  className="form-control floating inputPadding rounded text-secondary"
                  name="debt"
                  value={debt}
                  onChange={handleDebtInput}
                />
              </div>

              <div className="form-group col-lg-6 col-12">
                <label className="lblAbs font-12">مبلغ عودت</label>
                <input
                  type="text"
                  dir="ltr"
                  className="form-control floating inputPadding rounded text-secondary"
                  name="returnPayment"
                />
              </div>
            </div>

            <div id="kartsDropdown" className="col media-mt-1 marginb-1">
              <label className="lblAbs font-12">انتخاب کارت</label>
              <Dropdown
                value={selectedKart}
                onChange={(e) => setSelectedKart(e.value)}
                options={kartsOptionList}
                optionLabel="label"
                placeholder="انتخاب کنید"
                filter
                showClear
              />
            </div>

            <div className="submit-section">
              <button
                type="submit"
                className="btn btn-primary rounded btn-save font-13"
              >
                ثبت
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CashDeskActions;
