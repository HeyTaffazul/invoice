import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import logo from '../assets/logo.png'; // Adjust the path as necessary


const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("₹");
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billToAddress1, setBillToAddress1] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [billFromAddress1, setBillFromAddress1] = useState("");
  const [billFromAddress2, setBillFromAddress2] = useState("");
  const [billTostateut1, setBillFromstateut1] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFrom1, setBillFrom1] = useState("");
  const [billFrompan, setBillFrompan] = useState("");
  const [billFromgst, setBillFromgst] = useState("");
  const [billFrompsupply, setBillFrompsupply] = useState("");
  const [billFromDelivery, setBillFromDelivery] = useState("");
  const [billFromStateut, setBillFromStateut] = useState("");
  const [billFromorderno, setBillfromorderno] = useState("");
  const [billFromorderdate, setBillfromorderdate] = useState("");
  const [billTostateut, setBillFromstateut] = useState("");
  
  
  const [notes, setNotes] = useState(
    "Thank you for doing business with us. Have a great day!"
  );
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");

  const [items, setItems] = useState([
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  const handleCalculateTotal = useCallback(() => {
    let newSubTotal = items
      .reduce((acc, item) => {
        return acc + parseFloat(item.price) * parseInt(item.quantity);
      }, 0)
      .toFixed(2);

    let newtaxAmount = (newSubTotal * (taxRate / 100)).toFixed(2);
    let newdiscountAmount = (newSubTotal * (discountRate / 100)).toFixed(2);
    let newTotal = (
      newSubTotal -
      newdiscountAmount +
      parseFloat(newtaxAmount)
    ).toFixed(2);

    setSubTotal(newSubTotal);
    setTaxAmount(newtaxAmount);
    setDiscountAmount(newdiscountAmount);
    setTotal(newTotal);
  }, [items, taxRate, discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;

    console.log(id, name, value);

    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={handleChange(setDateOfIssue)}
                    style={{ maxWidth: "150px" }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={handleChange(setInvoiceNumber)}
                  min="1"
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Seller Details:</Form.Label>
                <Form.Control
                  placeholder="Name"
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={handleChange(setBillFrom)}
                  autoComplete="name"
                  required
                />
                
                <Form.Control
                  placeholder="Address"
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillFromAddress)}
                  required
                />
                <Form.Control
                  placeholder="PAN No"
                  value={billFrompan}
                  type="text"
                  name="billFrompan"
                  className="my-2"
                  onChange={handleChange(setBillFrompan)}
                  autoComplete="pan"
                  required
                />
                <Form.Control
                  placeholder="GST Registration No."
                  value={billFromgst}
                  type="text"
                  name="billFromgst"
                  className="my-2"
                  onChange={handleChange(setBillFromgst)}
                  autoComplete="gst"
                  required
                />
              </Col>
              

              <Col>
                <Form.Label className="fw-bold">Billing Details::</Form.Label>
                <Form.Control
                  placeholder="Name"
                  rows={3}
                  value={billFrom1}
                  type="text"
                  name="billFrom1"
                  className="my-2"
                  onChange={handleChange(setBillFrom1)}
                  autoComplete="name1"
                  required
                />
                
                <Form.Control
                  placeholder="Address"
                  value={billFromAddress1}
                  type="text"
                  name="billFromAddress1"
                  className="my-2"
                  autoComplete="address1"
                  onChange={handleChange(setBillFromAddress1)}
                  required
                />
                <Form.Control
                  placeholder="State/UT Code"
                  value={billFromStateut}
                  type="text"
                  name="billFromStateut"
                  className="my-2"
                  onChange={handleChange(setBillFromStateut)}
                  autoComplete="Stateut"
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Shipping Details:</Form.Label>
                <Form.Control
                  placeholder="Name"
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={handleChange(setBillTo)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Billing address"
                  value={billFromAddress2}
                  type="text"
                  name="billFromAddress2"
                  className="my-2"
                  autoComplete="address2"
                  onChange={handleChange(setBillFromAddress2)}
                  required
                />
                <Form.Control
                  placeholder="State/UT Code"
                  value={billTostateut1}
                  type="text"
                  name="billTostateut"
                  className="my-2"
                  autoComplete="Stateut"
                  onChange={handleChange(setBillFromstateut1)}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
            <Form.Label className="fw-bold">Place of Supply</Form.Label>
                <Form.Control
                  placeholder="Place of Supply"
                  rows={3}
                  value={billFrompsupply}
                  type="text"
                  name="billFromsupply"
                  className="my-2"
                  onChange={handleChange(setBillFrompsupply)}
                  autoComplete="supply"
                  required
                />
                </Col>
              <Col> 
            <Form.Label className="fw-bold">Place of Delivery</Form.Label>
                <Form.Control
                  placeholder="Place of Delivery"
                  rows={3}
                  value={billFromDelivery}
                  type="text"
                  name="billFromDelivery"
                  className="my-2"
                  onChange={handleChange(setBillFromDelivery)}
                  autoComplete="Delivery"
                  required
                />
                </Col>
                
                <Form.Label className="fw-bold">Order Details:</Form.Label>
                <Col>
                <Form.Control
                  placeholder="Order No."
                  rows={3}
                  value={billFromorderno}
                  type="text"
                  name="billFromorderno"
                  className="my-2"
                  onChange={handleChange(setBillfromorderno)}
                  autoComplete="orderno"
                  required
                />
                </Col>
                 <Col>
                 <Form.Control
                  placeholder="Order Date"
                  value={billFromorderdate}
                  type="text"
                  name="billFromorderdate"
                  className="my-2"
                  autoComplete="orderdate"
                  onChange={handleChange(setBillfromorderdate)}
                  required
                />
                </Col>
                </Row>
            <Row className="mb-5">
              <Col md={6}>
              
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax Rate:</span>
                  <span>
                    <span className="small ">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{ fontSize: "1.125rem" }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thank you for doing business with us. Have a great day!"
              name="notes"
              value={notes}
              onChange={handleChange(setNotes)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                dateOfIssue,
                invoiceNumber,
                billTo,
                billToAddress,
                billToAddress1,
                billFrom,
                billFrom1,
                billFromAddress,
                billFromAddress1,
                billFromAddress2,
                billFrompan,
                billFromgst,
                billFrompsupply,
                billFromDelivery,
                billFromStateut,
                billFromorderno,
                billFromorderdate,
                notes,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              total={total}
            />

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="₹">INR (Indian Rupee)</option>
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Singapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={handleChange(setTaxRate)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={handleChange(setDiscountRate)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <hr className="mt-4 mb-3" />
            <Button
              variant="primary"
              type="submit"
              className="d-block w-100 btn-secondary"
            >
              Get Invoice
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
