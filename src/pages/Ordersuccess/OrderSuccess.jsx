import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderSuccess.css";
import { Button, Image } from "react-bootstrap";

import SuccessPic from "../../assets/Orders_Success.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import EstimateTable from "../../components/Estimate/EstimateTable";

function OrderSuccess() {
  const statusTab2 = useSelector((store) => store.cart.statusTab2);
  const dispatch = useDispatch();

  const currentDate = new Date().toLocaleString();

  const downloadPdf = () => {
    const printContent = document.getElementById("print-area").innerHTML;
    const win = window.open("", "", "height=700,width=900");
    win.document.write('<html><head><title>Print</title>');
    win.document.write('<style>body{font-family:sans-serif;}</style>'); // optional styles
    win.document.write('</head><body>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <>
      <Header />
      <div className="order-success">
        <div className="order-success-2">
          <div className="inside-order">
            <Image src={SuccessPic} rounded />
            <h2>Greeting Message</h2>
            <p>
              <i className="bi bi-check-lg"></i>Thanks for your order
            </p>
          </div>
        </div>
        <div>
          <Button variant="primary" onClick={() => downloadPdf()}>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Wrap the whole estimate section inside #print-area */}
      <div id="print-area">
        <div
          className="estimate-container"
          role="region"
          aria-labelledby="estimate-title"
        >
          <div className="header">
            <div>
              <p>
                <strong>Enquiry No :</strong> 1
              </p>
              <p>
                <strong>Mobile :</strong> 9943852902
              </p>
            </div>
            <div className="right">
              <p>
                <strong>Date :</strong> {currentDate}
              </p>
              <p>
                <strong>E-mail :</strong> sivakasionlinecrackers.sales@gmail.com
1              </p>
            </div>
          </div>

          <h3 className="company">Sivakasi Best Crackers</h3>
          <p className="address">Sivakasi</p>

          <EstimateTable />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;
